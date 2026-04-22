"use client";

import { useState, useMemo } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { calculateEMI, formatCurrency } from "@/lib/calculators";
import AdUnit from "@/components/AdUnit";
import { Info } from "lucide-react";

export default function EMICalculator() {
  const [p, setP] = useState(500000);
  const [r, setR] = useState(9);
  const [n, setN] = useState(60);

  const emi = useMemo(() => calculateEMI(p, r, n), [p, r, n]);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;

  return (
    <CalculatorLayout 
      title="EMI Calculator" 
      description="Calculate your monthly home or car loan installments instantly."
      id="emi-calc"
    >
      <div>
        <div className="input-group">
          <label className="input-label">Loan Amount (₹)</label>
          <input 
            type="number" 
            className="input-field" 
            value={p} 
            onChange={e => setP(Number(e.target.value))} 
          />
          <input 
            type="range" 
            min="10000" 
            max="10000000" 
            step="10000" 
            className="w-full mt-2 accent-slate-800" 
            value={p} 
            onChange={e => setP(Number(e.target.value))} 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Interest Rate (% p.a)</label>
          <input 
            type="number" 
            className="input-field" 
            value={r} 
            onChange={e => setR(Number(e.target.value))} 
          />
          <input 
            type="range" 
            min="1" 
            max="25" 
            step="0.1" 
            className="w-full mt-2 accent-slate-800" 
            value={r} 
            onChange={e => setR(Number(e.target.value))} 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Tenure (Months)</label>
          <input 
            type="number" 
            className="input-field" 
            value={n} 
            onChange={e => setN(Number(e.target.value))} 
          />
          <input 
            type="range" 
            min="1" 
            max="360" 
            step="1" 
            className="w-full mt-2 accent-slate-800" 
            value={n} 
            onChange={e => setN(Number(e.target.value))} 
          />
        </div>

        <AdUnit slot="1234567890" />
      </div>

      <div className="bg-slate-50 p-8 rounded-xl flex flex-col justify-center">
        <div className="text-center mb-8">
          <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Monthly EMI</p>
          <h2 className="text-5xl font-bold">{formatCurrency(emi)}</h2>
        </div>

        <div className="space-y-4">
          <div className="result-item">
            <span className="result-label">Principal Amount</span>
            <span className="result-value">{formatCurrency(p)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Interest Payable</span>
            <span className="result-value">{formatCurrency(totalInterest)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Payment</span>
            <span className="result-value">{formatCurrency(totalPayment)}</span>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white border border-slate-200 rounded-lg flex gap-3 text-xs text-slate-500">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <p>This is an estimate. Actual EMI may vary based on processing fees and bank conditions.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
