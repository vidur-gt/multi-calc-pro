"use client";

import { useState, useMemo } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { calculateSIP, formatCurrency } from "@/lib/calculators";
import AdUnit from "@/components/AdUnit";
import { TrendingUp } from "lucide-react";

export default function SIPCalculator() {
  const [m, setM] = useState(5000);
  const [r, setR] = useState(12);
  const [y, setY] = useState(10);

  const futureValue = useMemo(() => calculateSIP(m, r, y), [m, r, y]);
  const investedAmount = m * 12 * y;
  const estimatedReturns = futureValue - investedAmount;

  return (
    <CalculatorLayout 
      title="SIP Calculator" 
      description="Calculate how much wealth you can build with Systematic Investment Plans."
      id="sip-calc"
    >
      <div>
        <div className="input-group">
          <label className="input-label">Monthly Investment (₹)</label>
          <input 
            type="number" 
            className="input-field" 
            value={m} 
            onChange={e => setM(Number(e.target.value))} 
          />
          <input 
            type="range" 
            min="500" 
            max="1000000" 
            step="500" 
            className="w-full mt-2 accent-slate-800" 
            value={m} 
            onChange={e => setM(Number(e.target.value))} 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Expected Return Rate (% p.a)</label>
          <input 
            type="number" 
            className="input-field" 
            value={r} 
            onChange={e => setR(Number(e.target.value))} 
          />
          <input 
            type="range" 
            min="1" 
            max="30" 
            step="0.5" 
            className="w-full mt-2 accent-slate-800" 
            value={r} 
            onChange={e => setR(Number(e.target.value))} 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Time Period (Years)</label>
          <input 
            type="number" 
            className="input-field" 
            value={y} 
            onChange={e => setY(Number(e.target.value))} 
          />
          <input 
            type="range" 
            min="1" 
            max="40" 
            step="1" 
            className="w-full mt-2 accent-slate-800" 
            value={y} 
            onChange={e => setY(Number(e.target.value))} 
          />
        </div>

        <AdUnit slot="0987654321" />
      </div>

      <div className="bg-slate-50 p-8 rounded-xl flex flex-col justify-center">
        <div className="text-center mb-8">
          <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Estimated Returns</p>
          <h2 className="text-5xl font-bold" style={{ color: '#10b981' }}>{formatCurrency(futureValue)}</h2>
        </div>

        <div className="space-y-4">
          <div className="result-item">
            <span className="result-label">Invested Amount</span>
            <span className="result-value">{formatCurrency(investedAmount)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Est. Returns</span>
            <span className="result-value">{formatCurrency(estimatedReturns)}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Value</span>
            <span className="result-value">{formatCurrency(futureValue)}</span>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white border border-slate-200 rounded-lg flex gap-3 text-xs text-slate-500">
          <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />
          <p>Compounding works best over long periods. Even a small increase in monthly SIP can lead to significant wealth gain.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
