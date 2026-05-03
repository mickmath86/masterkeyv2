# MasterKey v2 — Design System Reference

Use this document when building new landing pages or sections to ensure visual and structural consistency with the existing site.

---

## Color Palette

Defined as CSS custom properties in `public/assets/scss/abstracts/_variable.scss`.

| Token | Value | Usage |
|---|---|---|
| `--Primary` | `#e4e95b` | Brand accent (yellow-green), CTA hover fill, scrollbar thumb, active underlines |
| `--Hover` | `#eaf050` | Lighter primary hover state |
| `--Secondary` | `#eb4d4d` | Error states, "For Sale" tag |
| `--Secondary-2` | `#77f3a7` | Section sub-labels, accent text |
| `--Text-primary` | `#111111` | Headings, strong UI text, dark button backgrounds |
| `--Text-secondary` | `#5c6368` | Body copy, default text |
| `--Text-secondary-2` | `#a4aeb5` | Muted labels, breadcrumb separators |
| `--Text-color-1` | `rgba(255,255,255,0.6)` | Dimmed white text on dark backgrounds |
| `--Text-muted` | `#e9e9d8` | Scrollbar track background |
| `--Text-light` | `#ffffff` | White text |
| `--Bg-light` | `#f8f7f3` | Light cream section backgrounds |
| `--White` | `#ffffff` | Card backgrounds, modals |
| `--Black` | `#000000` | Rarely used raw black |
| `--Line` | `#e4e4e4` | Borders, dividers, input outlines |

### Background Utility Classes
```
.bg-dark-color   → background: var(--Text-primary)  (#111111)
.bg-light-color  → background: var(--Bg-light)       (#f8f7f3)
.bg-white-color  → background: var(--White)           (#ffffff)
```

### Text Color Utility Classes
```
.text_white             → var(--Text-light)
.text_primary-color     → var(--Text-primary)
.text_secondary-color   → var(--Text-secondary)
.text_secondary-color-2 → var(--Text-secondary-2)
.text_muted-color       → var(--Text-muted)
.text_color-1           → var(--Text-color-1)
```

---

## Typography

**Font:** `Manrope` (sans-serif) — applied globally via `$font-main`.  
**Icon Font:** `icomoon` — referenced as `$fontIcon`.

### Type Scale

| Class / Element | Size | Line Height | Weight |
|---|---|---|---|
| `h1` / `.h1` | 96px → 36px (sm) | 104px | 600 |
| `h2` / `.h2` | 52px → 30px (sm) | 62px | 600 |
| `h3` / `.h3` | 44px → 25px (sm) | 52px | 600 |
| `h4` / `.h4` | 30px → 22px (sm) | 40px | 600 |
| `h5` / `.h5` | 24px → 20px (sm) | 30px | 600 |
| `h6` / `.h6` | 20px → 18px (sm) | 28px | 600 |
| `.text-title` | 18px | 24px | — |
| `.text-body-default` / `p` | 16px → 14px (md) | 26px | 400 |
| `.text-body-1` | 20px | 30px | — |
| `.text-body-2` | 18px | 28px | — |
| `.text-body-3` | 34px | 44px | — |
| `.text-button` | 16px | 26px | **700** |
| `.text-button-small` | 14px | 24px | **600** |
| `.text-label` | 14px | 20px | **600** |
| `.text-caption-1` | 14px | 22px | — |
| `.text-caption-2` | 12px | 16px | — |

### Font Weight Utilities
```
.fw-3  → font-weight: 300
.fw-4  → font-weight: 400
.fw-5  → font-weight: 500
.fw-6  → font-weight: 600
.fw-7  → font-weight: 700
```

---

## Layout & Containers

### Primary Container
```html
<div class="tf-container">  <!-- max-width: 1320px, centered, px-15 -->
```
Variants:
- `.w-lg` → max-width: 1440px  
- `.w-xl` → max-width: 1750px  
- `.w-xxl` → max-width: 1870px  
- `.w-1830` → max-width: 1830px  

### Section Spacing
```
.tf-spacing-1  → padding: 100px 0   (80px @ lg, 60px @ md)
.tf-spacing-2  → padding: 99px 0    (80px @ lg, 60px @ md)
.tf-spacing-3  → padding-top: 100px, padding-bottom: 80px
.tf-spacing-4  → padding: 98px 0
.tf-spacing-8  → padding: 60px 0
```
Standard pattern for a full section: wrap content in `.tf-spacing-1` + `.tf-container`.

### Grid System
Responsive CSS Grid via `.tf-grid-layout` with column modifiers:

```html
<!-- 3 columns on large, 2 on medium, 1 on small -->
<div class="tf-grid-layout lg-col-3 md-col-2">
```

Column modifiers: `sm-col-2/3`, `md-col-2/3/4`, `lg-col-2/3/4/5`, `xl-col-2/3/4/5`, `xxl-col-3/4`  
Default gap: `40px 30px` (lg+), `24px 15px` (md), `24px 15px` (default)

Also available: `.tf-grid-layout-md` and `.tf-grid-layout-sm` variants with responsive display.

---

## Breakpoints

Defined in `_mixin.scss`. Use `@include res(size)` for max-width, `@include res(size, min)` for min-width.

| Name | Max-width | Min-width |
|---|---|---|
| `sm` | 575px | 576px |
| `md` | 767px | 768px |
| `lg` | 991px | 992px |
| `llg` | 1024px | 1025px |
| `xl` | 1199px | 1200px |
| `xxl` | 1440px | 1441px |
| `xxxl` | 1599px | 1600px |
| `full` | 1920px | 1921px |

---

## Buttons

All buttons use the `.tf-btn` base class.

### Button Variants

```html
<!-- Dark fill (primary action) -->
<a class="tf-btn btn-bg-1 btn-px-32">
  <span>View Properties</span>
  <span class="bg-effect"></span>
</a>

<!-- Primary accent (yellow-green fill) -->
<a class="tf-btn btn-px-28">
  <span>Search</span>
  <span class="bg-effect"></span>
</a>

<!-- White fill -->
<a class="tf-btn btn-bg-white btn-px-24">
  <span>Learn More</span>
  <span class="bg-effect"></span>
</a>

<!-- Outlined dark border -->
<a class="tf-btn btn-border btn-px-28">
  <span>Contact Us</span>
</a>

<!-- Outlined light border (hover → primary accent) -->
<a class="tf-btn btn-border-2 btn-px-28">
  <span>See More</span>
  <span class="bg-effect"></span>
</a>
```

### Button Sizes
- Base height: `40px` mobile, `50px` desktop (md+)
- Padding variants: `btn-px-12`, `btn-px-24`, `btn-px-28`, `btn-px-32`

### Button Behavior
- Hover: ripple effect expands from `<span class="bg-effect"></span>` — always include it
- On hover: lifts `translateY(-2px)` + shadow `0 8px 30px rgba(0,0,0,0.15)`
- `.btn-bg-1`: dark bg → accent fill on hover (text flips white → dark)

---

## Section Heading Pattern

Use this pattern for all section titles across the site:

```html
<div class="heading-section justify-content-center text-center mb_46">
  <span class="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
    Section Label
  </span>
  <h3 class="split-text effect-blur-fade">Main Section Heading</h3>
</div>
```

- `.sub` = small uppercase label above the heading (14px, 20px line-height, letter-spacing: 1.4px)
- `.heading-section` uses `gap: 12px` grid between label and heading
- `split-text` + `effect-blur-fade` / `effect-rotate` trigger scroll-based reveal animations
- For left-aligned headings (e.g. about sections), remove `justify-content-center text-center`

---

## Card Components

### Property Card (Standard)
```html
<div class="card-house style-default hover-image" data-id="...">
  <div class="img-style mb_20">
    <Image src="..." width={410} height={308} alt="..." />
    <div class="wrap-tag d-flex gap_8 mb_12">
      <div class="tag sale text-button-small fw-6 text_primary-color">For Sale</div>
      <div class="tag categoreis text-button-small fw-6 text_primary-color">House</div>
    </div>
    <Link href="/property-details-1/..." class="overlay-link" />
    <div class="wishlist">
      <div class="hover-tooltip tooltip-left box-icon">
        <span class="icon icon-Heart"></span>
        <span class="tooltip">Add to Wishlist</span>
      </div>
    </div>
  </div>
  <div class="content">
    <h4 class="price mb_12">$1,250,000</h4>
    <Link href="/property-details-1/..." class="title mb_8 h5 link text_primary-color">
      Property Name
    </Link>
    <p>123 Main St, Thousand Oaks, CA</p>
    <ul class="info d-flex">
      <li class="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
        <i class="icon-Bed"></i> 3 Bed
      </li>
      <li class="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
        <i class="icon-Bathtub"></i> 2 Bath
      </li>
      <li class="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
        <i class="icon-Ruler"></i> 1,850 Sqft
      </li>
    </ul>
  </div>
</div>
```

Tag classes for `.tag`:
- `.sale` → for sale listing
- `.rent` → for rent listing
- `.categoreis` → property type label (note: intentional typo in CSS)

### Property Card (Dark / Featured)
Use `class="card-house style-default dark hover-image"` for dark background cards (TopProperties section).

---

## About / Content Section Pattern

Two-column layout with heading on left, numbered list on right:

```html
<div class="section-about-1 tf-spacing-1">
  <div class="tf-container">
    <div class="row">
      <div class="col-lg-5">
        <div class="heading-section mb_20">
          <span class="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
            About Us
          </span>
          <h3 class="split-text effect-blur-fade">Your Section Heading Here</h3>
        </div>
        <p class="text-body-2 split-text split-lines-transform">
          Supporting body copy goes here.
        </p>
        <Link href="/listing-half-map-grid" class="tf-btn btn-bg-1 btn-px-32">
          <span>View Properties</span>
          <span class="bg-effect"></span>
        </Link>
      </div>
      <div class="col-lg-6 offset-lg-1">
        <ul class="list">
          <li class="d-flex gap_20 scrolling-effect effectRight">
            <span class="h4 number">01.</span>
            <div class="content">
              <h5 class="mb_8">Step Title</h5>
              <p>Step description text here.</p>
            </div>
          </li>
          <!-- repeat for 02., 03. -->
        </ul>
      </div>
    </div>
  </div>
</div>
```

---

## Hero / Page Title Section

```html
<div class="page-title style-1 sw-layout">
  <div class="tf-container w-1830">
    <div class="content">
      <h1 class="title split-text effect-blur-fade">
        Your Hero <br /> Headline Here
      </h1>
      <div>
        <p class="h6 text_secondary-color mb_12 split-text split-lines-transform">
          Supporting subheadline.
        </p>
        <Link href="/listing-half-map-grid" class="tf-btn btn-px-32 btn-bg-1">
          <span>View Properties</span>
          <span class="bg-effect"></span>
        </Link>
      </div>
    </div>
  </div>
  <!-- Background image slides rendered in .thumbs -->
  <div class="thumbs effect-content-slide">
    <!-- Swiper with hero images -->
  </div>
  <!-- Search bar -->
  <SidebarFilterDefault />
</div>
```

---

## Search Filter Bar

Use `<SidebarFilterDefault />` on any landing page to embed the search widget.  
It automatically redirects to `/listing-half-map-grid` with query params for:
- `type` (Sale / Rent)
- `city`
- `bedrooms`
- `budget`
- `q` (keyword)

Import: `import SidebarFilterDefault from "@/components/common/SidebarFilterDefault"`

---

## Scroll Animation Classes

Apply to any element for scroll-triggered entrance animations:

```
split-text effect-blur-fade      → fade in with blur (headings, paragraphs)
split-text effect-rotate         → rotate in from below (labels/sub text)
split-text split-lines-transform → staggered line slide-up (body copy)
scrolling-effect effectLeft      → slide in from left
scrolling-effect effectRight     → slide in from right
scrolling-effect effectBottom    → slide in from bottom
```

These are powered by the existing GSAP/ScrollTrigger setup in `ClientScripts.tsx`. No additional setup needed.

---

## Spacing Utilities

### Margin Bottom
```
.mb_4  → 4px    .mb_8  → 8px    .mb_12 → 12px   .mb_16 → 16px
.mb_20 → 20px   .mb_24 → 24px   .mb_28 → 28px   .mb_30 → 30px
.mb_32 → 32px   .mb_36 → 36px   .mb_40 → 40px   .mb_46 → 46px
.mb_48 → 48px
```

### Gap Utilities
```
.gap_4  → 4px   .gap_6  → 6px   .gap_8  → 8px   .gap_10 → 10px
.gap_12 → 12px  .gap_14 → 14px  .gap_15 → 15px  .gap_16 → 16px
.gap_20 → 20px  .gap_30 → 30px
```

### Border Radius
```
.rounded-4   → 4px    .rounded-8  → 8px    .rounded-12 → 12px
.rounded-16  → 16px   .rounded-24 → 24px   .rounded-30 → 30px
.rounded-32  → 32px   .rounded-cycle → 999px (pill)
```

---

## Header

**Primary header:** `<Header />` from `@/components/header/Header`  
Class: `.header.style-default` — white background, bottom border `var(--Line)`, sticky on scroll.

Nav links: `font-size: 16px`, `font-weight: 700`. Hover state: primary accent underline slides in from right.

Header height implied by nav padding: `padding: 32px 0 31px` per item. Logo: `max-width: 222px`.

---

## Footer

**Primary footer:** `<Footer1 />` from `@/components/footer/Footer1`

---

## Icon System

Uses `icomoon` icon font. Common icons referenced in components:

| Class | Usage |
|---|---|
| `icon-Bed` | Bedroom count |
| `icon-Bathtub` | Bathroom count |
| `icon-Ruler` | Square footage |
| `icon-Heart` | Wishlist |
| `icon-CaretLeft` / `icon-CaretRight` | Slider navigation |
| `icon-Faders` | Advanced filter button |
| `icon-SquaresFour` | Grid view toggle |
| `icon-Rows` | List view toggle |
| `icon-MagnifyingGlass` | Search |
| `icon-MapPin` | Location |
| `icon-Phone` / `icon-EnvelopeSimple` | Contact info |

---

## Page Layout Structure

Every page follows this wrapper pattern:

```tsx
// Standard pages
import Layout from "@/components/layouts/Layout-defaul";

export default function Page() {
  return (
    <Layout>
      <HeroComponent />
      <SectionComponent />
      {/* more sections */}
    </Layout>
  );
}

// Listing / map pages use Header directly (no Layout wrapper)
import Header from "@/components/header/Header";

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <PropertiesComponent />
      </Suspense>
    </>
  );
}
```

`Layout-defaul` wraps `<Header />` + `<Footer1 />` around its children.

---

## Available Reusable Components

### Common
| Component | Path | Purpose |
|---|---|---|
| `SidebarFilterDefault` | `common/SidebarFilterDefault` | Homepage search bar → redirects to listings |
| `SidebarFilter3` | `common/SidebarFilter3` | Full filter bar for listing pages |
| `DropdownSelect2` | `common/DropdownSelect2` | Styled dropdown select |
| `Pagination` | `common/Pagination` | Page navigation for listing grids |
| `Banner1` | `common/Banner1` | Full-width parallax CTA banner |
| `Agents` | `common/Agents` | Agent card grid |
| `Testimonial1` | `common/Testimonial1` | Client testimonial slider |
| `Process1` | `common/Process1` | Step-by-step process section |
| `AutoRepeatMarquee` | `common/AutoRepeatMarquee` | Infinite scrolling logo/text strip |
| `FAQs1` | `common/FAQs1` | Accordion FAQ section |
| `Map` / `Map2` / `Map3` | `common/Map*` | Mapbox property map |
| `ModalVideo` | `common/ModalVideo` | Lightbox video popup |
| `Odometer` | `common/Odometer` | Animated number counter |

### Homes / Sections
| Component | Path | Purpose |
|---|---|---|
| `TopProperties` | `homes/TopProperties` | Dark background featured property slider (top priced) |
| `LatestNews` | `homes/LatestNews` | Blog post preview section |
| `Properties` | `homes/homepage-1/Properties` | Featured 6-up property grid from Repliers |
| `Properties2` | `homes/homepage-1/Properties2` | Hover-tab featured property pairs |
| `Hero` | `homes/homepage-1/Hero` | Main hero with slider + search bar |
| `About` | `homes/homepage-1/About` | 2-col about section with numbered list |
| `Location` | `homes/homepage-1/Location` | City/neighborhood cards |
| `Process` | `homes/homepage-1/Process` | How it works steps |
| `Testimonials` | `homes/homepage-1/Testimonials` | Client testimonials |
| `Banner` | `homes/homepage-1/Banner` | Inline CTA banner |

---

## Data & API

### Repliers Property Data
Fetched from the API routes:
- `GET /api/listings` — search listings with filter params
- `GET /api/listing/[mlsNumber]` — single listing by MLS number

Helper: `src/lib/repliers.ts`  
- Type: `RepliersListing` — raw API shape  
- Type: `MappedProperty` — app UI shape  
- Function: `mapListingToProperty(listing)` — converts API → UI  

Hook: `src/hooks/useRepliersListings.ts` — drop-in client-side fetch hook with pagination.

### Filter Options
`src/data/optionfilter.ts` exports:
- `cityOptions` — Ventura County + SoCal cities
- `bedroomOptions`, `bathroomOptions`, `garageOptions`
- `budgetOptions` — price ranges for CA market
- `minSizeOptions`, `maxSizeOptions`
- `amenitiesList`

---

## New Landing Page Checklist

When building a new page:

1. **Wrap with `<Layout>`** (includes Header + Footer) or use `<Header />` alone for map/listing pages
2. **Use `.tf-container`** for all content sections — max 1320px centered
3. **Use `.tf-spacing-1`** (or another spacing class) on each `<section>`
4. **Use the heading pattern**: `.heading-section` with `.sub` label + `h3`
5. **Add scroll animations**: `split-text effect-blur-fade` on headings, `scrolling-effect effectBottom` on cards/CTA
6. **Always include `<span class="bg-effect"></span>`** inside every `.tf-btn`
7. **Property links** always go to `/property-details-1/[mlsNumber]`
8. **Search / browse links** always go to `/listing-half-map-grid`
9. **Pull listings from Repliers** via `/api/listings` — use `mapListingToProperty()` to map data
10. **Images from Repliers** use `unoptimized` prop on Next.js `<Image>` + `cdn.repliers.io` is already allowlisted in `next.config.ts`
