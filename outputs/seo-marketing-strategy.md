# Urban Memory — SEO & Marketing Strategy

> Prepared by Studio Homotomo
> Goal: Drive traffic, generate sales, build brand recognition

---

## Part 1: Technical SEO

### On-Page SEO Checklist

The landing page (`public/index.html`) needs the following SEO elements verified/added:

#### Meta Tags
- [x] Title tag: "Urban Memory — Premium City Map Posters by Studio Homotomo" ✓
- [x] Meta description: Includes "premium", "vector city maps", "brushed aluminum", "custom to any city" ✓
- [ ] Open Graph tags (Facebook, LinkedIn, Discord):
  ```html
  <meta property="og:title" content="Urban Memory — Premium City Map Posters by Studio Homotomo">
  <meta property="og:description" content="Custom city maps precision-etched on brushed aluminum. Six artistic styles. Any city worldwide.">
  <meta property="og:image" content="https://studiohomotomo.com/og-image.png">
  <meta property="og:url" content="https://studiohomotomo.com">
  <meta property="og:type" content="website">
  ```
- [ ] Twitter Card tags:
  ```html
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Urban Memory — Premium City Map Posters">
  <meta name="twitter:description" content="Custom city maps on brushed aluminum. Six styles. Any city.">
  <meta name="twitter:image" content="https://studiohomotomo.com/twitter-card.png">
  ```
- [ ] JSON-LD Schema for Product:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Custom City Map Metal Poster",
    "brand": { "@type": "Brand", "name": "Urban Memory by Studio Homotomo" },
    "description": "Premium city map poster precision-etched on brushed aluminum. Custom to any city worldwide.",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "89",
      "highPrice": "249",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  }
  </script>
  ```

#### URL Structure
- [ ] Set up a clean domain: `studiohomotomo.com` or `urbanmemory.studiohomotomo.com`
- [ ] Create a sitemap.xml pointing to all product pages
- [ ] Create a robots.txt allowing all crawlers

#### Performance
- [ ] Enable gzip/Brotli compression on the Express server
- [ ] Add Cache-Control headers for static assets
- [ ] Lazy-load images below the fold
- [ ] Minimize base64 QR embed (91KB) — consider loading it from a file URL instead
- [ ] Add `loading="lazy"` to all images below the hero section
- [ ] Ensure mobile responsiveness (test on 375px width)
- [ ] Add `rel="preconnect"` for Google Fonts (already done)

---

## Part 2: Content Marketing

### Blog Post Ideas

Write and publish on the landing page as a /blog section:

1. **"The Art of the City Map: Six Ways to See Your City"**
   - Deep-dive into each of the 6 visual styles
   - Discuss the cartographic and artistic traditions behind each

2. **"Why Metal? The Case for Brushed Aluminum Wall Art"**
   - Compare metal prints vs. paper, canvas, acrylic
   - Durability, color vibrancy, archival quality

3. **"A Brief History of City Mapping: From Nolli to OpenStreetMap"**
   - Connect the Nolli style to its historical roots
   - Bridge 18th-century Rome to modern open data

4. **"Hong Kong Through Six Lenses: A Cartographic Journey"**
   - Feature the HK Central sample set
   - Walk through each style applied to the same city

5. **"The Perfect Housewarming Gift: Why a Custom City Map Never Misses"**
   - Gift-buying guide
   - Emotional appeal of commemorating a meaningful place

6. **"From OpenStreetMap to Wall Art: How Your Custom Map Is Made"**
   - Behind-the-scenes technical process
   - Builds trust through transparency

### Content Distribution Strategy

| Content Type | Platform | Frequency | Purpose |
|-------------|----------|-----------|---------|
| Blog posts | Website blog | 2x/month | SEO, authority |
| Short posts | Instagram | 3-4x/week | Visual discovery |
| Story posts | Instagram Stories | Daily | Engagement |
| Pins | Pinterest | 5-10x/week | Traffic driver |
| Threads | X/Twitter | 2-3x/week | Community |
| Product pins | Pinterest | Weekly | Direct sales |

---

## Part 3: Social Media Strategy

### Instagram (@studio_homotomo)

#### Content Pillars
1. **Product Showcases** (30%) — High-res photos of metal prints in real settings
2. **Style Spotlights** (25%) — Deep dives into each of the 6 visual styles
3. **City Spotlights** (25%) — Featured cities with map preview
4. **Behind the Scenes** (20%) — Process, data, printing

#### Post Schedule
| Day | Content Type | Hashtag Strategy |
|-----|-------------|-----------------|
| Monday | Style spotlight (one of 6 styles) | #urbanmemory #citymapart #[style] |
| Wednesday | City spotlight (feature a city) | #[city] #citymap #wallart |
| Friday | Product showcase / customer photo | #metalprint #homedecor #urbanart |
| Saturday | Behind the scenes / process | #mapmaking #cartography #opendata |

#### Hashtag Strategy
Use 15-20 hashtags per post, mix of:
- **Broad** (500k+ posts): #homedecor #wallart #citymap
- **Medium** (50-500k): #metalprint #urbanart #mapmaking #cartography
- **Niche** (1-50k): #brushedaluminum #cityskylineart #architecturalprint #custommap
- **Local** (for specific city posts): #hongkongart #newyorkart #parisart

#### Instagram Stories
- Daily: Behind-the-scenes of a map generation
- Weekly: "City of the Week" sticker poll
- Product launches: Swipe-up to purchase

### Pinterest Strategy

Pinterest drives significant traffic to POD shops. Focus on:

#### Board Structure
| Board Name | Content | Target |
|-----------|---------|--------|
| Urban Memory Maps | All product pins | Core audience |
| City Map Wall Art | Curated + own pins | Home decor shoppers |
| Metal Wall Art | Curated + own pins | Premium decor buyers |
| Architecture Lovers | Curated + own pins | Architecture enthusiasts |
| Hong Kong Art | City-specific pins | HK-focused audience |
| Map Art for Home | Curated + own pins | Interior designers |
| Personalized Gifts | Gift-buying season pins | Holiday shoppers |

#### Pin Creation
- Use vertical pins (1000x1500px, 2:3 ratio)
- Text overlay: City name + style name + "Urban Memory"
- Multiple images per pin (show various angles)
- Include "Shop" link in pin description
- Create video pins for process content

#### Pin Descriptions (SEO)
Format: `{City} {Style} Map Poster | {Emotional hook} | Urban Memory by Studio Homotomo`

Example:
> Hong Kong Central Blueprint Map Poster. Your city, rendered as architectural art. Precision-etched on brushed aluminum. Six styles available. Shop Urban Memory by Studio Homotomo.

### X/Twitter Strategy
- Share process snippets and technical details
- Engage with architecture, map, and design communities
- Thread format for in-depth style explanations
- Share customer photos and reviews
- Participate in #MapMonday and #ArchitectureTwitter

---

## Part 4: Paid Advertising

### Budget Recommendation
Start small: $10-15/day per platform, test for 2 weeks, then scale winners.

### Google Ads
- **Campaign type:** Shopping + Search
- **Keywords to target:**
  - "custom city map poster"
  - "city map metal print"
  - "personalized city skyline"
  - "architectural city map"
  - "urban map wall art"
  - "hong kong map poster"
  - "[city name] map art"
- **Negative keywords:** free, printable, digital only, pdf
- **Ad copy:** Highlight customization, metal quality, free shipping
- **Budget:** $10/day initially

### Instagram/Facebook Ads
- **Campaign objective:** Conversions (website purchases)
- **Targeting:**
  - Interests: Interior design, architecture, home decor, maps, travel
  - Demographics: 25-55, homeowners, design-conscious
  - Locations: US, UK, Canada, Australia, Hong Kong, Singapore
- **Ad creative:**
  - Carousel: Show all 6 styles applied to one city
  - Video: 15-second process showreel
  - Single image: Metal print on a living room wall
- **Budget:** $10-15/day

### Pinterest Ads
- **Campaign type:** Conversion (shop now)
- **Targeting:** Home decor, wall art, personalized gifts
- **Budget:** $5-10/day

---

## Part 5: Email Marketing

### Setup
1. Create a Mailchimp or ConvertKit account (free tier)
2. Add email signup form to the landing page
3. Offer lead magnet: "Free Style Guide PDF" or "10% Off First Order"

### Email Sequence
| Email | Timing | Content |
|-------|--------|---------|
| Welcome | Immediate | Brand story, style overview, discount code |
| Style Guide | Day 2 | Deep-dive into all 6 styles with room examples |
| City Stories | Day 5 | Featured city + customer spotlight |
| The Process | Day 7 | How maps are made (builds trust) |
| Follow-up | Day 14 | "Still thinking about your city?" + testimonial |

### Newsletter Frequency
- Bi-weekly: New featured city, style tip, or customer story
- Monthly: Product updates, new styles, blog digest

---

## Part 6: Partnership & PR Strategy

### Influencer Marketing
- Reach out to:
  - Interior design Instagrammers (10k-100k followers)
  - Architecture Twitter accounts
  - Map/geography enthusiasts
  - City-specific accounts (e.g., @hongkong, @london)

- Offer: Free custom map in exchange for photo/shoutout
- Budget: $0-100 per collaboration (product + small fee for bigger accounts)

### PR Opportunities
- **Pitch angles:**
  - "Turn your city into art: HK-based studio creates custom metal maps from open data"
  - "Where art meets cartography: Studio Homotomo's Urban Memory series"
  - "The perfect remote-work housewarming gift"
- **Target publications:**
  - Design Milk, Dezeen, ArchDaily
  - Hong Kong Tatler, TimeOut HK
  - Apartment Therapy, The Spruce
  - Local newspapers in cities where customers order

### Community Building
- Join: r/mapporn, r/architecture, r/Design, r/HongKong
- Participate: Architecture forums, design communities
- Share: Process posts on Hacker News ("Show HN: I built a city map generator")

---

## Part 7: Promotional Calendar

### Launch Week
| Day | Action |
|-----|--------|
| Day 1 | Post all 6 styles on Instagram + Pinterest |
| Day 2 | Share process reel on Instagram |
| Day 3 | City spotlight: Hong Kong on all platforms |
| Day 4 | Behind the scenes: data processing |
| Day 5 | Style deep-dive: BLUEPRINT |
| Day 6 | Customer offer: "Free shipping first 10 orders" |
| Day 7 | Roundup post on all platforms |

### Monthly Recurring
| Week | Theme | Content Focus |
|------|-------|---------------|
| Week 1 | City Spotlight | Feature a new city each month |
| Week 2 | Style Spotlight | Deep-dive into one of 6 styles |
| Week 3 | Customer Feature | User-generated content |
| Week 4 | Process/Behind Scenes | Technical or production content |

### Seasonal Promotions
| Season | Promotion | Platforms |
|--------|-----------|-----------|
| Valentine's Day | "Map of where you met" gift guide | All platforms |
| Mother's Day | "Her hometown" custom map | Instagram, Pinterest |
| Father's Day | "His favorite city" map | Instagram, Pinterest |
| Graduation | "Your college town" map | Pinterest, Facebook |
| Housewarming | "New home, new city" bundle | Instagram, email |
| Holiday Season | 20% off all custom orders (Nov-Dec) | All platforms |

---

## Part 8: Analytics & Optimization

### Metrics to Track
| Metric | Target | Tool |
|--------|--------|------|
| Website visitors | 500+/week by month 2 | Google Analytics |
| Conversion rate | 2-3% | Google Analytics |
| Average order value | $149 | Order management |
| Instagram followers | 500 by month 3 | Instagram Insights |
| Pinterest monthly views | 10k by month 3 | Pinterest Analytics |
| Email subscribers | 100 by month 3 | Mailchimp |

### A/B Testing Priorities
1. Landing page hero image (single style vs. all 6 collage)
2. Call-to-action button text ("Order Now" vs. "Create Your Map")
3. Pricing page layout (table vs. cards vs. list)
4. Email subject lines for launch sequence

### Monthly Review Process
1. Check Google Analytics: traffic sources, top pages, conversion rate
2. Review social media: best-performing posts, follower growth
3. Check platform analytics: Redbubble/Society6/INPRNT best sellers
4. Review order data: most popular cities, styles, sizes
5. Update content calendar based on what's working
6. Adjust ad spend: scale winning campaigns, pause underperformers

---

## Part 9: Immediate Action Items

### Today / This Week
1. [ ] Generate OG image and Twitter card image (1200x630px sample collage)
2. [ ] Add Open Graph and Twitter Card meta tags to index.html
3. [ ] Add JSON-LD schema to index.html
4. [ ] Create Pinterest account for Studio Homotomo
5. [ ] Create Instagram Business account for @studio_homotomo
6. [ ] Create Mailchimp account and embed signup form
7. [ ] Upload first 5 pins to Pinterest

### Next Week
8. [ ] Write and publish first blog post
9. [ ] Begin daily Instagram posting schedule
10. [ ] Set up Google Analytics on landing page
11. [ ] Start $5/day Pinterest ad test
12. [ ] Reach out to 3 interior design influencers

### Month 2
13. [ ] Launch Google Ads campaign ($10/day)
14. [ ] Launch email welcome sequence
15. [ ] Scale Instagram ads if metrics are positive
16. [ ] Pitch 2 design publications for coverage

### Month 3
17. [ ] Review all analytics and adjust strategy
18. [ ] Consider expanding to Amazon Handmade
19. [ ] Launch seasonal promotion
20. [ ] Evaluate first product sale data to refine strategy

---

## Appendix: Tool List

| Tool | Purpose | Cost |
|------|---------|------|
| Canva | Social media graphics | Free / $12.99 Pro |
| CapCut | Video editing (reels) | Free |
| Google Analytics | Website analytics | Free |
| Google Search Console | SEO monitoring | Free |
| Mailchimp | Email marketing | Free (500 contacts) |
| Later or Buffer | Social media scheduling | Free / $15/mo |
| Tailwind | Pinterest scheduling | $9.99/mo |
| Canva | Pin creation | Free |
| Meta Business Suite | Instagram/Facebook ads | Free |
| Google Ads | Search advertising | Pay-per-click |
