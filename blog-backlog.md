# Blog cadence — A1 Property Services

Goal: ship at least one post per month (Matthias publishes about every 3–4 weeks). Do not publish invented statistics, pricing, certifications, or review quotes. Use `[NEEDS OWNER INPUT]` in drafts for anything not already sourced from the live site.

## Monthly pipeline (checklist)

Copy this block into the issue or PR for each post:

```
- [ ] Pick next title from the backlog (or owner-approved variant)
- [ ] Confirm the target query (one primary phrase)
- [ ] Pull only facts already on a1pslandscape.com, or mark [NEEDS OWNER INPUT]
- [ ] Draft in lib/blog-posts-new.ts (slug, title, excerpt, date, category, content[])
- [ ] Internal links: matching landing page, /services/{slug}, one city page, /contact
- [ ] Unique title + meta description (excerpt)
- [ ] Descriptive image alt if a hero/gallery image is added
- [ ] Owner review of flagged placeholders
- [ ] Publish: merge, confirm /blog/{slug} and sitemap.xml
- [ ] Move the title to “Shipped” below and pick next month’s post
```

Where posts live: `lib/blog-posts-new.ts` (prepended in `lib/blog.ts`). The `/blog` index and `sitemap.ts` pick them up automatically.

## Shipped (do not duplicate)

| Slug | Title | Notes |
|---|---|---|
| `paver-driveway-cost-cedar-falls` | Paver Driveway Cost in Cedar Falls: What Iowa Homeowners Should Budget | Closest match to “Paver Driveway Cost in Cedar Falls: What Drives the Price” |
| `retaining-wall-permit-guide-cedar-falls` | (existing permit guide) | Closest match to “Retaining Wall Permits in Black Hawk County” — refresh with owner-confirmed city rules before rewriting |
| `paver-patio-vs-concrete-iowa` | (existing comparison) | Closest match to “Paver Patio vs. Concrete Patio: Which Holds Up in Iowa Winters” |
| `retaining-wall-cost-cedar-falls` | How Much Does a Retaining Wall Cost in Cedar Falls? | Pricing — verify numbers before any update |
| `paver-patio-installation-cedar-falls` | Paver Patio Installation in Cedar Falls | Process / timeline |
| `pond-waterfall-installation-cedar-falls` | Pond and Waterfall Installation in Cedar Falls | |
| `driveway-paver-installation` | (existing driveway install article) | Pair with the new `/paver-driveway-cedar-falls` landing page |

## Next 12 months (draft titles)

Publish in roughly this order. Titles can be tightened after keyword data; do not invent cost figures in the draft.

1. **Water Features for Small Cedar Falls Yards**  
   Target: water feature Cedar Falls / pondless waterfall small yard.  
   `[NEEDS OWNER INPUT: confirm typical small-yard footprints you actually install; no kit prices unless quoted.]`

2. **Retaining Wall Permits in Black Hawk County: What You Need to Know** (refresh)  
   Target: retaining wall permit Cedar Falls / Black Hawk County.  
   `[NEEDS OWNER INPUT: confirm current Cedar Falls, Waterloo, and county height triggers, who pulls the permit, and typical engineering fees. Do not publish a height number that has not been confirmed this year.]`

3. **Paver Patio vs. Concrete Patio: Which Holds Up in Iowa Winters** (refresh)  
   Target: paver patio vs concrete Iowa.  
   Use existing site claims on freeze-thaw and repairability. `[NEEDS OWNER INPUT: any warranty language you want in writing.]`

4. **Paver Driveway vs. Asphalt Driveway in Cedar Falls**  
   Target: paver driveway Cedar Falls.  
   `[NEEDS OWNER INPUT: confirm you want asphalt discussed as a comparison only, not as a service you sell.]`

5. **How Long Does a Segmental Retaining Wall Last in Iowa?**  
   Target: retaining wall lifespan Iowa.  
   `[NEEDS OWNER INPUT: any workmanship warranty term you will put in writing.]`

6. **College Hill and North Cedar Drainage: Why Cedar Falls Yards Pond After Rain**  
   Target: yard drainage Cedar Falls.  
   `[NEEDS OWNER INPUT: neighborhoods you actually work in besides College Hill / North Cedar / South Cedar Falls.]`

7. **What to Expect During Paver Driveway Installation in Cedar Falls**  
   Target: paver driveway installation Cedar Falls.  
   Link to `/paver-driveway-cedar-falls`. No new pricing.

8. **Pondless Waterfall Maintenance Through an Iowa Winter**  
   Target: water feature maintenance Cedar Falls.  
   `[NEEDS OWNER INPUT: what opening/closing visits include and whether you offer a seasonal contract.]`

9. **When a Cedar Falls Retaining Wall Needs Geogrid**  
   Target: retaining wall geogrid / wall over 4 feet.  
   `[NEEDS OWNER INPUT: confirm 4-ft permit/engineering language with current city code.]`

10. **Matching a Paver Driveway to a Patio: One Hardscape System**  
    Target: paver patio Cedar Falls + paver driveway Cedar Falls.  
    Internal links to both landing pages.

11. **Waterloo Clay and Freeze-Thaw: What Changes a Hardscape Bid**  
    Target: landscaping Waterloo IA / retaining wall Waterloo.  
    `[NEEDS OWNER INPUT: any Waterloo-specific permit or ROW notes.]`

12. **How to Compare Landscaping Estimates in the Cedar Valley**  
    Target: landscaping Cedar Falls.  
    Point to `/learn/comparing-landscaping-estimates` if the post would overlap — only publish if it adds new, sourced material.

## Owner input still required before any pricing/stat refresh

- Current installed ranges for walls, patios, and driveways (existing posts contain figures that should be re-confirmed, not copied blindly into new posts).
- Permit height triggers for Cedar Falls, Waterloo, and Black Hawk County.
- Warranty terms (workmanship vs. manufacturer).
- Whether A1 holds ICPI, NCMA, or other installer certifications (do not mention in posts until confirmed).
- Team member names for bylines (optional; default byline is the company).
