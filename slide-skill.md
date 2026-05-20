---
name: ventura-county-market-updates
description: Generate Next.js-based Ventura County real estate market update presentations with live data from Repliers.io MCP. Creates interactive, deployable slide decks with Shadcn UI charts showing market metrics for Thousand Oaks, Camarillo, Ventura, Oxnard, and Westlake Village.
---

# Ventura County Market Updates

Generate deployable Next.js presentations with live real estate market data from Repliers.io MCP, styled with the MasterKey design system.

## Core Principles

1. **Next.js Deployable** — Full Next.js app with App Router, deployable to Vercel/Netlify.
2. **Live Data Integration** — Fetch market data from Repliers.io MCP connector in Perplexity.
3. **MasterKey Design System** — Use colors, typography, and components from design.md.
4. **Interactive Charts** — Shadcn UI line charts with selectable timeframes (5yr, 1yr, 6mo, 3mo, 30d).
5. **Single Family Homes Only** — All data filtered for residential single-family properties.
6. **Market Analysis** — Calculate buyer's/seller's/balanced market from months of supply.

## Design System Integration

**ALWAYS reference design.md for:**

- **Colors**: Use CSS variables (`--Primary`, `--Text-primary`, `--Bg-light`, etc.)
- **Typography**: Manrope font family, type scale classes (`.h1`, `.h2`, `.text-body-2`, etc.)
- **Spacing**: `.tf-spacing-1`, `.mb_32`, `.gap_30` utilities
- **Containers**: `.tf-container` (max-width: 1320px)
- **Buttons**: `.tf-btn`, `.btn-bg-1`, `.btn-border` classes
- **Grid Layouts**: `.tf-grid-layout lg-col-3 md-col-2`
- **Animations**: `.scrolling-effect`, `.effectFade`, `.split-text`

**Brand Identity:**
- MasterKey logo must appear on title slide
- Use brand yellow-green (`--Primary: #e4e95b`) for accents
- Maintain professional, trustworthy aesthetic

---

## Required Slides Structure

Every market update presentation MUST include these slides in order:

### 1. Title Slide
- MasterKey logo (top-left or centered)
- Main heading: "Ventura County Market Update"
- Subtitle: Current month/year (e.g., "May 2026")
- Background: Use design system gradient or branded image

### 2. About Us Slide
- Brief MasterKey introduction
- Value proposition for clients
- Contact information or CTA
- Keep concise (3-4 bullet points max)

### 3-11. Market Data Slides (One per metric)

Each metric gets its own slide with:
- **Slide heading**: Metric name (e.g., "Median Sales Price")
- **Shadcn UI Line Chart**: All 5 cities on one graph with different colored lines
- **Time selector**: Buttons for 5yr, 1yr, 6mo, 3mo, 30d
- **Legend**: City names with color indicators
- **Key insight**: 1-2 sentence summary below chart

**Required metrics (in order):**
1. Median Sales Price
2. Months of Supply
3. Pending Sales
4. Total Closed Sales
5. Active Listings
6. New Listings
7. Average Active Days on MLS
8. Average Price Per Sqft
9. Percent of Original Price

### 12. Market Classification Slide
- Table or card grid showing each city's market type
- Calculate from months of supply:
  - < 4 months = Seller's Market (red/warm color)
  - 4-6 months = Balanced Market (yellow/neutral)
  - > 6 months = Buyer's Market (blue/cool color)
- Formula: `Months Supply = Active Listings / Listings Sold Last Month`

---

## Data Requirements

### Cities Covered
All slides must include data for these 5 Ventura County cities:
1. **Thousand Oaks, CA**
2. **Camarillo, CA**
3. **Ventura, CA**
4. **Oxnard, CA**
5. **Westlake Village, CA**

### Data Source: Repliers.io MCP

Use the Repliers.io MCP connector (already available in Perplexity) to fetch:

**Property Type Filter:** Single Family Residential only

**Required Data Points per City:**
- Median Sales Price (monthly historical)
- Active Listings count
- New Listings count (monthly)
- Pending Sales count
- Total Closed Sales (monthly)
- Average Days on Market
- Average Price Per Sqft
- Percent of Original List Price (sale price / list price)

**Time Ranges:**
- 5 years (60 months of data)
- 1 year (12 months of data)
- 6 months
- 3 months
- 30 days

### Market Classification Formula

```javascript
// Calculate months of supply for each city
const monthsOfSupply = activeListings / closedSalesLastMonth;

// Classify market
let marketType, color;
if (monthsOfSupply < 4) {
  marketType = "Seller's Market";
  color = "#eb4d4d"; // --Secondary (red)
} else if (monthsOfSupply >= 4 && monthsOfSupply <= 6) {
  marketType = "Balanced Market";
  color = "#e4e95b"; // --Primary (yellow)
} else {
  marketType = "Buyer's Market";
  color = "#77f3a7"; // --Secondary-2 (green)
}
```

---

## Phase 1: Project Setup

### Step 1.1: Initialize Next.js Project

Create a new Next.js app in the project directory:

```bash
cd src/app
mkdir market-updates
cd market-updates
```

### Step 1.2: Install Dependencies

```bash
npm install recharts
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
npm install lucide-react
```

### Step 1.3: Project Structure

```
src/app/market-updates/
├── page.tsx                 # Main presentation page
├── components/
│   ├── TitleSlide.tsx
│   ├── AboutSlide.tsx
│   ├── MetricSlide.tsx      # Reusable chart slide
│   ├── MarketClassification.tsx
│   ├── TimeframeSelector.tsx
│   └── CityLineChart.tsx    # Shadcn chart component
├── lib/
│   ├── data-fetcher.ts      # Repliers.io MCP integration
│   ├── market-calculator.ts # Market type calculations
│   └── utils.ts
└── types/
    └── market-data.ts       # TypeScript interfaces
```

---

## Phase 2: Data Fetching

### Step 2.1: Create Data Fetcher

Create `lib/data-fetcher.ts`:

```typescript
// Fetch market data from Repliers.io MCP
export async function fetchCityMarketData(
  city: string,
  timeframe: '5y' | '1y' | '6m' | '3m' | '30d'
) {
  // Use Repliers.io MCP connector to fetch:
  // - Historical median sales prices
  // - Active/new/pending/closed listings
  // - Days on market
  // - Price per sqft
  // - Percent of original price
  
  // Filter: Single Family Residential only
  // Return formatted data for charts
}

export const CITIES = [
  'Thousand Oaks',
  'Camarillo',
  'Ventura',
  'Oxnard',
  'Westlake Village'
];
```

### Step 2.2: Create Market Calculator

Create `lib/market-calculator.ts`:

```typescript
export function calculateMarketType(
  activeListings: number,
  closedSalesLastMonth: number
): {
  type: 'seller' | 'balanced' | 'buyer';
  monthsOfSupply: number;
  color: string;
} {
  const monthsOfSupply = activeListings / closedSalesLastMonth;
  
  if (monthsOfSupply < 4) {
    return {
      type: 'seller',
      monthsOfSupply,
      color: 'var(--Secondary)' // #eb4d4d
    };
  } else if (monthsOfSupply <= 6) {
    return {
      type: 'balanced',
      monthsOfSupply,
      color: 'var(--Primary)' // #e4e95b
    };
  } else {
    return {
      type: 'buyer',
      monthsOfSupply,
      color: 'var(--Secondary-2)' // #77f3a7
    };
  }
}
```

---

## Phase 3: Build Components

### Step 3.1: Title Slide

Create `components/TitleSlide.tsx`:

```tsx
export default function TitleSlide() {
  return (
    <section className="bg-dark-color text_white tf-spacing-1" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="tf-container text-center">
        <div className="mb_48">
          <img src="/assets/images/logo/logo.png" alt="MasterKey" style={{ height: 60, margin: '0 auto' }} />
        </div>
        <h1 className="text_white mb_16 scrolling-effect effectFade">
          Ventura County Market Update
        </h1>
        <p className="text-body-1 text_color-1">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </section>
  );
}
```

### Step 3.2: Metric Slide with Chart

Create `components/MetricSlide.tsx`:

```tsx
'use client';

import { useState } from 'react';
import CityLineChart from './CityLineChart';
import TimeframeSelector from './TimeframeSelector';

interface MetricSlideProps {
  title: string;
  data: any; // Chart data for all cities
  insight: string;
}

export default function MetricSlide({ title, data, insight }: MetricSlideProps) {
  const [timeframe, setTimeframe] = useState<'5y' | '1y' | '6m' | '3m' | '30d'>('1y');
  
  return (
    <section className="bg-light-color tf-spacing-1" style={{ minHeight: '100vh' }}>
      <div className="tf-container">
        <h2 className="text_primary-color mb_32 text-center">{title}</h2>
        
        <TimeframeSelector 
          selected={timeframe} 
          onChange={setTimeframe} 
        />
        
        <div className="mb_24">
          <CityLineChart data={data[timeframe]} />
        </div>
        
        <p className="text-body-2 text_secondary-color text-center">
          {insight}
        </p>
      </div>
    </section>
  );
}
```

### Step 3.3: Timeframe Selector

Create `components/TimeframeSelector.tsx`:

```tsx
interface TimeframeSelectorProps {
  selected: string;
  onChange: (timeframe: any) => void;
}

export default function TimeframeSelector({ selected, onChange }: TimeframeSelectorProps) {
  const timeframes = [
    { value: '5y', label: '5 Years' },
    { value: '1y', label: '1 Year' },
    { value: '6m', label: '6 Months' },
    { value: '3m', label: '3 Months' },
    { value: '30d', label: '30 Days' },
  ];
  
  return (
    <div className="d-flex gap_12 justify-content-center mb_32">
      {timeframes.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`tf-btn ${selected === value ? 'btn-bg-1' : 'btn-border'}`}
        >
          <span>{label}</span>
          {selected === value && <span className="bg-effect"></span>}
        </button>
      ))}
    </div>
  );
}
```

### Step 3.4: City Line Chart (Shadcn UI)

Create `components/CityLineChart.tsx`:

```tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CITY_COLORS = {
  'Thousand Oaks': '#e4e95b', // --Primary
  'Camarillo': '#eb4d4d',     // --Secondary
  'Ventura': '#77f3a7',       // --Secondary-2
  'Oxnard': '#5c6368',        // --Text-secondary
  'Westlake Village': '#111111' // --Text-primary
};

interface CityLineChartProps {
  data: any[];
}

export default function CityLineChart({ data }: CityLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--Line)" />
        <XAxis dataKey="month" stroke="var(--Text-secondary)" />
        <YAxis stroke="var(--Text-secondary)" />
        <Tooltip 
          contentStyle={{ 
            background: 'var(--White)', 
            border: '1px solid var(--Line)',
            borderRadius: 8
          }} 
        />
        <Legend />
        {Object.entries(CITY_COLORS).map(([city, color]) => (
          <Line
            key={city}
            type="monotone"
            dataKey={city}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### Step 3.5: Market Classification Slide

Create `components/MarketClassification.tsx`:

```tsx
import { calculateMarketType } from '../lib/market-calculator';

export default function MarketClassification({ data }: any) {
  return (
    <section className="bg-white-color tf-spacing-1" style={{ minHeight: '100vh' }}>
      <div className="tf-container">
        <h2 className="text_primary-color mb_48 text-center">Current Market Classification</h2>
        
        <div className="tf-grid-layout lg-col-3 md-col-2">
          {data.cities.map((cityData: any) => {
            const market = calculateMarketType(
              cityData.activeListings,
              cityData.closedSalesLastMonth
            );
            
            return (
              <div 
                key={cityData.name}
                className="scrolling-effect effectFade"
                style={{
                  padding: 24,
                  borderRadius: 12,
                  border: `2px solid ${market.color}`,
                  background: 'var(--Bg-light)'
                }}
              >
                <h4 className="text_primary-color mb_16">{cityData.name}</h4>
                <div 
                  className="text-body-1 fw-6 mb_8"
                  style={{ color: market.color }}
                >
                  {market.type === 'seller' && "Seller's Market"}
                  {market.type === 'balanced' && "Balanced Market"}
                  {market.type === 'buyer' && "Buyer's Market"}
                </div>
                <p className="text-caption-1 text_secondary-color">
                  {market.monthsOfSupply.toFixed(1)} months of supply
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

## Phase 4: Main Page Assembly

Create `page.tsx`:

```tsx
import TitleSlide from './components/TitleSlide';
import AboutSlide from './components/AboutSlide';
import MetricSlide from './components/MetricSlide';
import MarketClassification from './components/MarketClassification';

export default async function MarketUpdatesPage() {
  // Fetch all market data
  const marketData = await fetchAllMarketData();
  
  return (
    <main>
      <TitleSlide />
      <AboutSlide />
      
      {/* Metric Slides */}
      <MetricSlide 
        title="Median Sales Price" 
        data={marketData.medianPrice}
        insight="Thousand Oaks leads with highest median price, showing 5% YoY growth."
      />
      
      <MetricSlide 
        title="Months of Supply" 
        data={marketData.monthsSupply}
        insight="Current inventory levels indicate a seller's market across most cities."
      />
      
      <MetricSlide 
        title="Pending Sales" 
        data={marketData.pendingSales}
        insight="Strong buyer demand continues with pending sales up 12% from last quarter."
      />
      
      <MetricSlide 
        title="Total Closed Sales" 
        data={marketData.closedSales}
        insight="Transaction volume remains steady despite seasonal variations."
      />
      
      <MetricSlide 
        title="Active Listings" 
        data={marketData.activeListings}
        insight="Inventory constraints persist with active listings below historical averages."
      />
      
      <MetricSlide 
        title="New Listings" 
        data={marketData.newListings}
        insight="New listings entering the market at a moderate pace."
      />
      
      <MetricSlide 
        title="Average Days on Market" 
        data={marketData.daysOnMarket}
        insight="Properties selling quickly, averaging under 30 days on market."
      />
      
      <MetricSlide 
        title="Average Price Per Sqft" 
        data={marketData.pricePerSqft}
        insight="Price per square foot continues upward trend across all cities."
      />
      
      <MetricSlide 
        title="Percent of Original Price" 
        data={marketData.percentOriginal}
        insight="Homes selling at or above asking price in competitive markets."
      />
      
      <MarketClassification data={marketData.classification} />
    </main>
  );
}
```

---

## Phase 5: Styling

Add to `globals.css` or create `market-updates.css`:

```css
/* Import design system variables */
@import '../../../public/assets/scss/abstracts/_variable.scss';

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Section transitions */
section {
  scroll-snap-align: start;
}

/* Chart responsive adjustments */
@media (max-width: 768px) {
  .recharts-wrapper {
    font-size: 12px;
  }
}
```

---

## Phase 6: Deployment

### Deploy to Vercel

```bash
# From project root
vercel deploy

# Or for production
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## Usage Instructions

When user requests a market update presentation:

1. **Confirm cities**: "I'll create a market update for Thousand Oaks, Camarillo, Ventura, Oxnard, and Westlake Village. Is this correct?"

2. **Fetch data**: Use Repliers.io MCP to get latest market data for all 5 cities

3. **Generate components**: Create all slide components with real data

4. **Calculate insights**: Generate 1-2 sentence insights for each metric slide

5. **Build presentation**: Assemble all slides in correct order

6. **Deploy**: Offer to deploy to Vercel or Netlify

7. **Provide URL**: Share live presentation link

---

## Key Reminders

- ✅ Use design.md for all styling (colors, typography, spacing)
- ✅ Single Family Residential properties only
- ✅ All 5 cities on every chart
- ✅ Timeframe selector on every metric slide
- ✅ Calculate market type from months of supply formula
- ✅ MasterKey logo on title slide
- ✅ Responsive design (mobile-friendly)
- ✅ Deployable Next.js app
- ✅ Interactive Shadcn UI charts
