import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import { spawn } from "child_process";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  // CORS — allow the frontend to call our API from any origin
  app.use(cors());

  // Add middleware to parse JSON request bodies
  app.use(express.json({ limit: "10mb" }));

  // API route to proxy Google Static Maps
  // This bypasses CORS issues, allowing our browser client to get a data URL for jsPDF/SVG exports!
  app.post("/api/proxy/map", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url || !url.startsWith("https://maps.googleapis.com/maps/api/staticmap")) {
        return res.status(400).json({ error: "Invalid map URL" });
      }

      console.log("Fetching static map from Google...");
      const response = await fetch(url);
      if (!response.ok) {
        const text = await response.text();
        console.error("Google Maps API Error:", text);
        return res.status(response.status).json({ error: "Failed to fetch map from Google API" });
      }

      // Convert image response to Base64 to safely pass it back to frontend
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mimeType = response.headers.get("content-type") || "image/png";
      const base64 = buffer.toString("base64");
      
      const dataUrl = `data:${mimeType};base64,${base64}`;
      res.json({ dataUrl });

    } catch (err) {
      console.error("Map proxy error:", err);
      res.status(500).json({ error: "Failed to proxy map image" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // POST /api/generate — trigger Python poster generation (SVG/DXF/DWG)
  app.post("/api/generate", async (req, res) => {
    try {
      const { city, lat, lng, style, format } = req.body;

      // ── Validate required fields ───────────────────────────
      if (!city || typeof city !== "string" || city.trim().length === 0) {
        return res.status(400).json({ error: "Missing or invalid 'city' (required string)" });
      }
      if (lat == null || typeof lat !== "number" || lat < -90 || lat > 90) {
        return res.status(400).json({ error: "Missing or invalid 'lat' (required number, -90..90)" });
      }
      if (lng == null || typeof lng !== "number" || lng < -180 || lng > 180) {
        return res.status(400).json({ error: "Missing or invalid 'lng' (required number, -180..180)" });
      }

      const validFormats = ["svg", "dxf", "dwg"];
      const fmt = (format || "svg").toLowerCase();
      if (!validFormats.includes(fmt)) {
        return res.status(400).json({
          error: `Invalid 'format'. Must be one of: ${validFormats.join(", ")}`,
        });
      }

      const validStyles = ["BLUEPRINT", "CHARCOAL", "URBAN_GRAIN", "NOLLI", "TERRA", "SEPIA"];
      const stl = (style || "BLUEPRINT").toUpperCase();
      if (!validStyles.includes(stl)) {
        return res.status(400).json({
          error: `Invalid 'style'. Must be one of: ${validStyles.join(", ")}`,
        });
      }

      // ── Check Python script exists ──────────────────────────
      const scriptPath = path.join(process.cwd(), "python", "run_generate.py");
      if (!fs.existsSync(scriptPath)) {
        return res.status(500).json({
          error: "Poster generation unavailable: Python script not found at " + scriptPath,
        });
      }

      // ── Spawn Python subprocess ─────────────────────────────
      console.log(`Generating poster: city="${city}" style=${stl} format=${fmt}`);

      const pythonArgs = [
        scriptPath,
        "--city", city,
        "--lat", String(lat),
        "--lng", String(lng),
        "--style", stl,
        "--format", fmt,
      ];

      // Try both "python3" and "python" for cross-platform support
      const pythonCmd = await resolvePythonCmd();

      const child = spawn(pythonCmd, pythonArgs, {
        cwd: process.cwd(),
        stdio: ["ignore", "pipe", "pipe"],
      });

      let stdout = "";
      let stderr = "";

      child.stdout.on("data", (chunk: Buffer) => { stdout += chunk.toString(); });
      child.stderr.on("data", (chunk: Buffer) => { stderr += chunk.toString(); });

      const exitCode = await new Promise<number>((resolve) => {
        child.on("close", resolve);
        child.on("error", (err) => {
          console.error("Failed to spawn Python process:", err);
          resolve(-1);
        });
      });

      // ── Handle errors ──────────────────────────────────────
      if (exitCode !== 0) {
        const errMsg = stderr.trim() || `Python exited with code ${exitCode}`;
        console.error("Poster generation failed:", errMsg);
        return res.status(500).json({
          error: "Poster generation failed",
          detail: errMsg,
        });
      }

      // ── Read the generated file ────────────────────────────
      const outputPath = stdout.trim();
      if (!outputPath || !fs.existsSync(outputPath)) {
        return res.status(500).json({
          error: "Poster generation completed but output file not found",
          detail: outputPath || "(no path returned)",
        });
      }

      const fileBuffer = fs.readFileSync(outputPath);
      const fileName = path.basename(outputPath);
      const base64 = fileBuffer.toString("base64");

      // Map format to MIME type for data URL
      const mimeMap: Record<string, string> = {
        svg: "image/svg+xml",
        dxf: "application/dxf",
        dwg: "application/acad",
      };
      const mimeType = mimeMap[fmt] || "application/octet-stream";
      const dataUrl = `data:${mimeType};base64,${base64}`;

      console.log(`Poster generated: ${outputPath} (${(fileBuffer.length / 1024).toFixed(0)} KB)`);

      res.json({
        success: true,
        dataUrl,
        fileName,
        format: fmt,
        filePath: outputPath,
      });

    } catch (err) {
      console.error("/api/generate error:", err);
      res.status(500).json({ error: "Internal server error during poster generation" });
    }
  });

  /**
   * Resolve which Python command is available (python3 or python).
   * Falls back gracefully if neither is found.
   */
  async function resolvePythonCmd(): Promise<string> {
    for (const cmd of ["python3", "python"]) {
      try {
        const result = await new Promise<boolean>((resolve) => {
          const proc = spawn(cmd, ["--version"], { stdio: ["ignore", "pipe", "pipe"] });
          proc.on("close", (code) => resolve(code === 0));
          proc.on("error", () => resolve(false));
          // Timeout after 2 seconds
          setTimeout(() => resolve(false), 2000);
        });
        if (result) return cmd;
      } catch {
        // continue to next candidate
      }
    }
    throw new Error("Python is not available. Install Python 3 and ensure it is on your PATH.");
  }

  // ── Orders API — receive custom order submissions ─────────────
  const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");
  app.post("/api/orders", async (req, res) => {
    try {
      const { name, email, city, style, format, size, message } = req.body;

      // Basic validation
      if (!name || typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({ error: "Missing name" });
      }
      if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "Missing or invalid email" });
      }
      if (!city || typeof city !== "string" || city.trim().length === 0) {
        return res.status(400).json({ error: "Missing city/coordinates" });
      }

      const order = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        name: name.trim(),
        email: email.trim(),
        city: city.trim(),
        style: style || "Not specified",
        format: format || "Not specified",
        size: size || "Not specified",
        message: message || "",
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      // Ensure data directory exists
      fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true });

      // Read existing orders, append, write back
      let orders: any[] = [];
      try {
        const existing = fs.readFileSync(ORDERS_FILE, "utf-8");
        orders = JSON.parse(existing);
      } catch {
        // File doesn't exist yet — start fresh
      }
      orders.push(order);
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

      console.log(`New order received: ${order.id} — ${name} (${city})`);

      res.json({ success: true, orderId: order.id });
    } catch (err) {
      console.error("/api/orders error:", err);
      res.status(500).json({ error: "Failed to save order" });
    }
  });

  // GET /api/orders — list orders (simple admin view)
  app.get("/api/orders", (_req, res) => {
    try {
      if (!fs.existsSync(ORDERS_FILE)) {
        return res.json({ orders: [] });
      }
      const data = fs.readFileSync(ORDERS_FILE, "utf-8");
      const orders = JSON.parse(data);
      res.json({ orders });
    } catch (err) {
      console.error("Failed to read orders:", err);
      res.status(500).json({ error: "Failed to read orders" });
    }
  });

  // ── Static / Public assets ─────────────────────────────────────
  // Serve the commercial landing page from public/
  const publicPath = path.join(process.cwd(), "public");
  app.use(express.static(publicPath));

  // ── Routes ──────────────────────────────────────────────────────
  // Landing page at root
  const landingPage = path.join(publicPath, "index.html");
  app.get("/", (_req, res) => {
    res.sendFile(landingPage);
  });

  // Vite middleware for development (serves the React designer app)
  if (process.env.NODE_ENV !== "production") {
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true, hmr: { port: 24679 } }, // Use different HMR port to avoid conflicts
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.warn("Vite dev server could not start:", (err as Error).message);
      console.log("Falling back to static file serving from public/ only.");
      // Fallback: serve the React dist if it exists
      const distPath = path.join(process.cwd(), "dist");
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
      }
    }
  } else {
    // Production static file serving from dist/
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Catch-all for the React SPA routes
    app.get("/design*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
