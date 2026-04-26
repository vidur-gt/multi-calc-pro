"use client";

import { useMemo, useState } from "react";
import { calculateSIP, formatCurrency } from "@/lib/calculators";
import AdUnit from "@/components/AdUnit";
import { TrendingUp } from "lucide-react";
import { CalculatorCard, ResultCard } from "@/components/ui/Cards";

interface Props {
  initialM?: number;
  initialR?: number;
  initialY?: number;
  hideAd?: boolean;
}

export default function SIPCalculator({ initialM = 5000, initialR = 12, initialY = 10, hideAd = false }: Props) {
  const [m, setM] = useState(initialM);
  const [r, setR] = useState(initialR);
  const [y, setY] = useState(initialY);

  const futureValue = useMemo(() => calculateSIP(m, r, y), [m, r, y]);
  const investedAmount = m * 12 * y;
  const estimatedReturns = futureValue - investedAmount;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-6">
        <CalculatorCard>
          <div className="flex flex-col gap-6">
            <div className="input-group m-0">
              <label className="input-label">Monthly Investment</label>
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-slate-500">Rs.</span>
                <input
                  type="number"
                  className="input-field pl-12"
                  value={m}
                  onChange={(e) => setM(Number(e.target.value))}
                />
              </div>
              <input
                type="range"
                min="500"
                max="1000000"
                step="500"
                className="range-input"
                value={m}
                onChange={(e) => setM(Number(e.target.value))}
              />
            </div>

            <div className="input-group m-0">
              <label className="input-label">Expected Return Rate (% p.a)</label>
              <div className="relative mt-2">
                <input
                  type="number"
                  className="input-field pr-8"
                  value={r}
                  onChange={(e) => setR(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium text-slate-500">%</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                className="range-input"
                value={r}
                onChange={(e) => setR(Number(e.target.value))}
              />
            </div>

            <div className="input-group m-0">
              <label className="input-label">Time Period (Years)</label>
              <div className="relative mt-2">
                <input
                  type="number"
                  className="input-field"
                  value={y}
                  onChange={(e) => setY(Number(e.target.value))}
                />
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                className="range-input"
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
              />
            </div>
          </div>
        </CalculatorCard>

        <div className="lg:sticky lg:top-24">
          <ResultCard highlight>
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-bold uppercase text-slate-500">Estimated value</p>
              <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">{formatCurrency(futureValue)}</h2>
            </div>

            <div>
              <div className="result-row">
                <span className="font-medium text-slate-600">Invested Amount</span>
                <span className="font-bold text-slate-900">{formatCurrency(investedAmount)}</span>
              </div>
              <div className="result-row">
                <span className="font-medium text-slate-600">Est. Returns</span>
                <span className="font-bold text-slate-900">{formatCurrency(estimatedReturns)}</span>
              </div>
              <div className="result-row">
                <span className="font-medium text-slate-600">Total Value</span>
                <span className="text-lg font-bold text-slate-900">{formatCurrency(futureValue)}</span>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
              <p>Compounding works best over long periods. Small monthly increases can make a visible difference over time.</p>
            </div>
          </ResultCard>
        </div>
      </div>

      {!hideAd && (
        <div className="w-full">
          <AdUnit slot="0987654321" />
        </div>
      )}
    </div>
  );
}
