"use client";

import { useState, useMemo } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { 
  calculateTaxNewRegime, 
  calculateTaxOldRegime, 
  getTaxSuggestions, 
  formatCurrency 
} from "@/lib/calculators";
import AdUnit from "@/components/AdUnit";
import { Lightbulb, Info } from "lucide-react";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000);
  const [deductions80C, setDeductions80C] = useState(150000);
  const [deductions80D, setDeductions80D] = useState(25000);
  const [hra, setHra] = useState(0);

  const totalDeductions = deductions80C + deductions80D + hra;

  const newRegime = useMemo(() => calculateTaxNewRegime(income), [income]);
  const oldRegime = useMemo(() => calculateTaxOldRegime(income, totalDeductions), [income, totalDeductions]);

  const isOldBetter = oldRegime.effectiveTax < newRegime.effectiveTax;
  const savings = Math.abs(oldRegime.effectiveTax - newRegime.effectiveTax);
  
  const suggestions = getTaxSuggestions(income, deductions80C, isOldBetter);

  return (
    <CalculatorLayout 
      title="Income Tax Calculator" 
      description="Compare Old vs New Tax Regime for FY 2024-25 (AY 2025-26)."
      id="tax-calc"
    >
      <div className="space-y-6">
        <div className="input-group">
          <label className="input-label">Gross Annual Income (₹)</label>
          <input 
            type="number" 
            className="input-field" 
            value={income} 
            onChange={e => setIncome(Number(e.target.value))} 
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-sm font-semibold mb-3 text-slate-700">Investment Deductions (Old Regime Only)</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block">Section 80C (Max 1.5L)</label>
              <input 
                type="number" 
                max="150000"
                className="input-field py-1 text-sm" 
                value={deductions80C} 
                onChange={e => setDeductions80C(Math.min(150000, Number(e.target.value)))} 
              />
            </div>
            
            <div>
              <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block">Section 80D (Health Ins.)</label>
              <input 
                type="number" 
                className="input-field py-1 text-sm" 
                value={deductions80D} 
                onChange={e => setDeductions80D(Number(e.target.value))} 
              />
            </div>

            <div>
              <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block">HRA / Home Loan Interest</label>
              <input 
                type="number" 
                className="input-field py-1 text-sm" 
                value={hra} 
                onChange={e => setHra(Number(e.target.value))} 
              />
            </div>
          </div>
        </div>

        <AdUnit slot="9988776655" />
      </div>

      <div className="flex flex-col gap-6">
        {/* Regime Comparison Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border-2 transition-all ${!isOldBetter ? 'border-primary bg-white shadow-md' : 'border-slate-100 bg-slate-50'}`}>
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">New Regime</p>
            <p className="text-xl font-bold">{formatCurrency(newRegime.effectiveTax)}</p>
            {!isOldBetter && <span className="bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-full font-bold">SAVING ₹{formatCurrency(savings)}</span>}
          </div>

          <div className={`p-4 rounded-xl border-2 transition-all ${isOldBetter ? 'border-primary bg-white shadow-md' : 'border-slate-100 bg-slate-50'}`}>
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Old Regime</p>
            <p className="text-xl font-bold">{formatCurrency(oldRegime.effectiveTax)}</p>
            {isOldBetter && <span className="bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-full font-bold">SAVING ₹{formatCurrency(savings)}</span>}
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="bg-slate-900 text-white p-6 rounded-xl">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-400" />
            Comparison Breakdown
          </h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Standard Deduction</span>
              <span>New: {formatCurrency(75000)} | Old: {formatCurrency(50000)}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Taxable Income</span>
              <span>New: {formatCurrency(newRegime.taxableIncome)} | Old: {formatCurrency(oldRegime.taxableIncome)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Effective Tax (incl. Cess)</span>
              <span className="font-bold text-sm text-yellow-400">{formatCurrency(isOldBetter ? oldRegime.effectiveTax : newRegime.effectiveTax)}</span>
            </div>
          </div>
        </div>

        {/* Suggestive Guardrails */}
        {suggestions.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Tax Saving Insights
            </h4>
            <ul className="text-xs text-amber-700 space-y-2 list-disc pl-4">
              {suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
