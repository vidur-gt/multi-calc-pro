import { z } from 'zod';

// Input Schemas for Guardrailing
export const EMISchema = z.object({
  principal: z.number().min(1000).max(1000000000),
  rate: z.number().min(1).max(30),
  tenure: z.number().min(1).max(600), // in months
});

export const SIPSchema = z.object({
  monthlyInvestment: z.number().min(100).max(10000000),
  expectedReturn: z.number().min(1).max(100),
  years: z.number().min(1).max(50),
});

export const TaxSchema = z.object({
  annualIncome: z.number().min(0).max(1000000000),
  deductions80C: z.number().min(0).max(150000).default(0),
  deductions80D: z.number().min(0).max(100000).default(0),
  otherExemptions: z.number().min(0).max(10000000).default(0),
  isSeniorCitizen: z.boolean().default(false),
});

// Financial Formulas
export function calculateEMI(p: number, r: number, n: number) {
  const monthlyRate = r / 12 / 100;
  const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  return emi;
}

export function calculateSIP(p: number, r: number, nInYears: number) {
  const monthlyRate = r / 12 / 100;
  const months = nInYears * 12;
  const futureValue = p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  return futureValue;
}

export function calculateFD(p: number, r: number, t: number, compoundingFrequency: number = 4) {
  // A = P(1 + r/n)^(nt)
  const ratePerPeriod = r / 100 / compoundingFrequency;
  const totalPeriods = compoundingFrequency * t;
  const amount = p * Math.pow(1 + ratePerPeriod, totalPeriods);
  return amount;
}

// Indian Income Tax Logic FY 2024-25
export interface TaxResult {
  taxableIncome: number;
  totalTax: number;
  standardDeduction: number;
  rebate87A: number;
  cess: number;
  effectiveTax: number;
}

export function calculateTaxNewRegime(income: number): TaxResult {
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, income - standardDeduction);
  let tax = 0;

  // New Slabs FY 2024-25 (Budget July 2024)
  if (taxableIncome <= 300000) tax = 0;
  else if (taxableIncome <= 700000) tax = (taxableIncome - 300000) * 0.05;
  else if (taxableIncome <= 1000000) tax = 20000 + (taxableIncome - 700000) * 0.10;
  else if (taxableIncome <= 1200000) tax = 50000 + (taxableIncome - 1000000) * 0.15;
  else if (taxableIncome <= 1500000) tax = 80000 + (taxableIncome - 1200000) * 0.20;
  else tax = 140000 + (taxableIncome - 1500000) * 0.30;

  // Rebate u/s 87A: Up to 7L taxable income, Nil tax
  let rebate87A = 0;
  if (taxableIncome <= 700000) {
    rebate87A = tax;
    tax = 0;
  }

  const cess = tax * 0.04;
  return {
    taxableIncome,
    totalTax: tax,
    standardDeduction,
    rebate87A,
    cess,
    effectiveTax: tax + cess
  };
}

export function calculateTaxOldRegime(income: number, deductions: number): TaxResult {
  const standardDeduction = 50000;
  const taxableIncome = Math.max(0, income - deductions - standardDeduction);
  let tax = 0;

  // Old Slabs FY 2024-25
  if (taxableIncome <= 250000) tax = 0;
  else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
  else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.20;
  else tax = 112500 + (taxableIncome - 1000000) * 0.30;

  // Rebate u/s 87A: Up to 5L taxable income, Max rebate 12500
  let rebate87A = 0;
  if (taxableIncome <= 500000) {
    rebate87A = tax;
    tax = 0;
  }

  const cess = tax * 0.04;
  return {
    taxableIncome,
    totalTax: tax,
    standardDeduction,
    rebate87A,
    cess,
    effectiveTax: tax + cess
  };
}

// Suggestive Logic
export function getTaxSuggestions(income: number, deductions: number, isOldRegimeBetter: boolean) {
  const suggestions: string[] = [];
  
  if (income > 700000 && !isOldRegimeBetter) {
    suggestions.push("You are currently using the New Regime. If you have high HRA or 80C/80D investments, you might save more in the Old Regime.");
  }
  
  if (deductions < 150000) {
    suggestions.push(`Consider investing up to Rs. ${150000 - deductions} more in 80C (PPF, ELSS, LIC) to maximize tax savings if you opt for the Old Regime.`);
  }

  if (income > 1000000) {
    suggestions.push("Investing in NPS (Section 80CCD) can provide an additional Rs. 50,000 deduction in the Old Regime.");
  }

  return suggestions;
}

// Formatting
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};
