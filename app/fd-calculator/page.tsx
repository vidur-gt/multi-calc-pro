"use client";

import { useState, useMemo } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { calculateFD, formatCurrency } from "@/lib/calculators";
import AdUnit from "@/components/AdUnit";
import { Lock } from "lucide-react";

export default function FDCalculator() {
  const [p, setP] = useState(100000);
  const [r, setR] = useState(7);
  const [y, setY] = useState(5);

  const maturityAmount = useMemo(() => calculateFD(p, r, y), [p, r, y]);
  const interestEarned = maturityAmount - p;

  return (
    <CalculatorLayout 
      title="FD Calculator" 
      description="Calculate maturity amount on your Fixed Deposits with quarterly compounding."
      id="fd-calc"
    >
      <div>
        <div className="input-group">
          <label className="input-label">Investment Amount (₹)</label>
          <input 
            type="number" 
            className="input-field" 
            value={p} 
            onChange={e => setP(Number(e.target.value))} 
          />
          <input 
            type="range" 
            min="1000" 
            max="10000000" 
            step="1000" 
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
            max="15" 
            step="0.1" 
            className="w-full mt-2 accent-slate-800" 
            value={r} 
            onChange={e => setR(Number(e.target.value))} 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Tenure (Years)</label>
          <input 
            type="number" 
            className="input-field" 
            value={y} 
            onChange={e => setY(Number(e.target.value))} 
          />
          <input 
            type="range" 
            min="1" 
            max="25" 
            step="1" 
            className="w-full mt-2 accent-slate-800" 
            value={y} 
            onChange={e => setY(Number(e.target.value))} 
          />
        </div>

        <AdUnit slot="555666777" />
      </div>

      <div className="bg-slate-50 p-8 rounded-xl flex flex-col justify-center">
        <div className="text-center mb-8">
          <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Maturity Amount</p>
          <h2 className="text-5xl font-bold">{formatCurrency(maturityAmount)}</h2>
        </div>

        <div className="space-y-4">
          <div className="result-item">
            <span className="result-label">Invested Amount</span>
            <span className="result-value">{formatCurrency(p)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Interest Earned</span>
            <span className="result-value">{formatCurrency(interestEarned)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Maturity Value</span>
            <span className="result-value">{formatCurrency(maturityAmount)}</span>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white border border-slate-200 rounded-lg flex gap-3 text-xs text-slate-500">
          <Lock className="w-4 h-4 text-amber-500 shrink-0" />
          <p>FD calculations assume quarterly compounding. Interest rates are subject to change by banks.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
