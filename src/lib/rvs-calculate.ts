// Rent vs. Sell Calculation Engine — Ventura County defaults

export const DEFAULTS = {
  monthlyRent: 3950,       // Thousand Oaks SFR avg
  propertyTaxRate: 0.007,  // 0.7% effective rate
  annualInsurance: 2100,   // midpoint $1,800–$2,400
  mgmtFeeRate: 0.09,       // 9% (MasterKey midpoint 8–10%)
  maintenanceRate: 0.01,   // 1% of home value
  appreciationRate: 0.045, // 4.5% historical
  vacancyRate: 0.05,        // 5%
  agentCommission: 0.055,  // 5.5%
  closingCosts: 0.01,      // 1% seller closing costs
  stagingCosts: 3500,      // flat estimate
  investReturnRate: 0.07,  // 7% annual if cash invested
};

export interface RVSFormData {
  address: string;
  homeValue: number;
  purchasePrice: number;
  purchaseYear: number;
  mortgageBalance: number;
  interestRate: number;
  titleOwnership: "single" | "multiple";
  monthlyRentOverride?: number | null;
  // Rentcast data
  rentcastEstimatedValue?: number | null;
  rentcastEstimatedRent?: number | null;
  beds?: number;
  baths?: number;
  sqft?: number;
  yearBuilt?: number;
  propertyType?: string;
}

export interface CapitalGainsResult {
  gain: number;
  exclusion: number;
  taxableGain: number;
  capitalGainsTax: number;
}

export interface SellScenario {
  agentFee: number;
  closingAndStagingCosts: number;
  mortgagePayoff: number;
  saleNetProceeds: number;
  capitalGains: CapitalGainsResult;
  saleAfterTax: number;
  saleInvested5yr: number;
  saleInvested10yr: number;
}

export interface RentExpenses {
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyMgmtFee: number;
  monthlyMaintenance: number;
  monthlyVacancy: number;
  monthlyMortgage: number;
  totalMonthlyExpenses: number;
}

export interface RentScenario {
  monthlyRent: number;
  expenses: RentExpenses;
  monthlyCashFlow: number;
  rentWealthAt5yr: number;
  rentWealthAt10yr: number;
}

export interface RVSResults {
  sell: SellScenario;
  rent: RentScenario;
  verdict5yr: "sell" | "rent" | "close";
  verdict10yr: "sell" | "rent" | "close";
  diff5yr: number;
  diff10yr: number;
}

function calcCapitalGains(
  homeValue: number,
  purchasePrice: number,
  titleOwnership: "single" | "multiple"
): CapitalGainsResult {
  const gain = homeValue - purchasePrice;
  const exclusion = titleOwnership === "multiple" ? 500_000 : 250_000;
  const taxableGain = Math.max(0, gain - exclusion);
  const capitalGainsTax = taxableGain * 0.15; // 15% long-term rate
  return { gain, taxableGain, capitalGainsTax, exclusion };
}

function calcMonthlyMortgage(balance: number, annualRate: number): number {
  if (balance <= 0 || annualRate <= 0) return 0;
  // Assume ~25 years remaining
  const r = annualRate / 100 / 12;
  const n = 25 * 12;
  return (balance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function rentWealthAtYear(
  n: number,
  monthlyCashFlow: number,
  homeValue: number,
  mortgageBalance: number,
  monthlyMortgage: number
): number {
  const annualPrincipalPaydown = monthlyMortgage * 12 * 0.35;
  const appreciatedValue = homeValue * Math.pow(1 + DEFAULTS.appreciationRate, n);
  const remainingMortgage = Math.max(
    0,
    mortgageBalance - annualPrincipalPaydown * n
  );
  return monthlyCashFlow * 12 * n + appreciatedValue - remainingMortgage;
}

export function calculate(form: RVSFormData): RVSResults {
  const {
    homeValue,
    purchasePrice,
    mortgageBalance,
    interestRate,
    titleOwnership,
    monthlyRentOverride,
  } = form;

  // ── Sell Scenario ──────────────────────────────────────────
  const agentFee = homeValue * DEFAULTS.agentCommission;
  const closingAndStagingCosts =
    homeValue * DEFAULTS.closingCosts + DEFAULTS.stagingCosts;
  const mortgagePayoff = mortgageBalance;
  const saleNetProceeds =
    homeValue - agentFee - closingAndStagingCosts - mortgagePayoff;
  const capitalGains = calcCapitalGains(homeValue, purchasePrice, titleOwnership);
  const saleAfterTax = Math.max(0, saleNetProceeds - capitalGains.capitalGainsTax);
  const saleInvested5yr =
    saleAfterTax * Math.pow(1 + DEFAULTS.investReturnRate, 5);
  const saleInvested10yr =
    saleAfterTax * Math.pow(1 + DEFAULTS.investReturnRate, 10);

  // ── Rent Scenario ──────────────────────────────────────────
  const monthlyRent = monthlyRentOverride ?? DEFAULTS.monthlyRent;
  const monthlyPropertyTax = (homeValue * DEFAULTS.propertyTaxRate) / 12;
  const monthlyInsurance = DEFAULTS.annualInsurance / 12;
  const monthlyMgmtFee = monthlyRent * DEFAULTS.mgmtFeeRate;
  const monthlyMaintenance = (homeValue * DEFAULTS.maintenanceRate) / 12;
  const monthlyVacancy = monthlyRent * DEFAULTS.vacancyRate;
  const monthlyMortgage = calcMonthlyMortgage(mortgageBalance, interestRate);
  const totalMonthlyExpenses =
    monthlyPropertyTax +
    monthlyInsurance +
    monthlyMgmtFee +
    monthlyMaintenance +
    monthlyVacancy +
    monthlyMortgage;
  const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;

  const rentWealthAt5yr = rentWealthAtYear(
    5,
    monthlyCashFlow,
    homeValue,
    mortgageBalance,
    monthlyMortgage
  );
  const rentWealthAt10yr = rentWealthAtYear(
    10,
    monthlyCashFlow,
    homeValue,
    mortgageBalance,
    monthlyMortgage
  );

  // ── Verdict ────────────────────────────────────────────────
  const THRESHOLD = 25_000;
  const diff5yr = saleInvested5yr - rentWealthAt5yr;
  const diff10yr = saleInvested10yr - rentWealthAt10yr;

  function verdict(diff: number): "sell" | "rent" | "close" {
    if (Math.abs(diff) < THRESHOLD) return "close";
    return diff > 0 ? "sell" : "rent";
  }

  return {
    sell: {
      agentFee,
      closingAndStagingCosts,
      mortgagePayoff,
      saleNetProceeds,
      capitalGains,
      saleAfterTax,
      saleInvested5yr,
      saleInvested10yr,
    },
    rent: {
      monthlyRent,
      expenses: {
        monthlyPropertyTax,
        monthlyInsurance,
        monthlyMgmtFee,
        monthlyMaintenance,
        monthlyVacancy,
        monthlyMortgage,
        totalMonthlyExpenses,
      },
      monthlyCashFlow,
      rentWealthAt5yr,
      rentWealthAt10yr,
    },
    verdict5yr: verdict(diff5yr),
    verdict10yr: verdict(diff10yr),
    diff5yr,
    diff10yr,
  };
}
