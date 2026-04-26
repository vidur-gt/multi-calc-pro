"use client";

import { useMemo, useState } from "react";
import { calculateFD, formatCurrency } from "@/lib/calculators";
import AdUnit from "@/components/AdUnit";
import { Lock } from "lucide-react";
import { CalculatorCard, ResultCard } from "@/components/ui/Cards";

interface Props {
  initialP?: number;
  initialR?: number;
  initialY?: number;
  hideAd?: boolean;
}

export default function FDCalculator({ initialP = 100000, initialR = 7, initialY = 5, hideAd = false }: Props) {
  const [p, setP] = useState(initialP);
  const [r, setR] = useState(initialR);
  const [y, setY] = useState(initialY);

  const maturityAmount = useMemo(() => calculateFD(p, r, y), [p, r, y]);
  const interestEarned = maturityAmount - p;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-6">
        <CalculatorCard>
          <div className="flex flex-col gap-6">
            <div className="input-group m-0">
              <label className="input-label">Investment Amount</label>
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-slate-500">Rs.</span>
                <input
                  type="number"
                  className="input-field pl-12"
                  value={p}
                  onChange={(e) => setP(Number(e.target.value))}
                />
              </div>
              <input
                type="range"
                min="1000"
                max="10000000"
                step="1000"
                className="range-input"
                value={p}
                onChange={(e) => setP(Number(e.target.value))}
              />
            </div>

            <div className="input-group m-0">
              <label className="input-label">Interest Rate (% p.a)</label>
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
                max="15"
                step="0.1"
                className="range-input"
                value={r}
                onChange={(e) => setR(Number(e.target.value))}
              />
            </div>

            <div className="input-group m-0">
              <label className="input-label">Tenure (Years)</label>
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
                max="25"
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
              <p className="mb-2 text-sm font-bold uppercase text-slate-500">Maturity Amount</p>
              <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">{formatCurrency(maturityAmount)}</h2>
            </div>

            <div>
              <div className="result-row">
                <span className="font-medium text-slate-600">Invested Amount</span>
                <span className="font-bold text-slate-900">{formatCurrency(p)}</span>
              </div>
              <div className="result-row">
                <span className="font-medium text-slate-600">Interest Earned</span>
                <span className="font-bold text-slate-900">{formatCurrency(interestEarned)}</span>
              </div>
              <div className="result-row">
                <span className="font-medium text-slate-600">Maturity Value</span>
                <span className="text-lg font-bold text-slate-900">{formatCurrency(maturityAmount)}</span>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
              <p>FD calculations assume quarterly compounding. Rates and payout rules vary by bank.</p>
            </div>
          </ResultCard>
        </div>
      </div>

      {!hideAd && (
        <div className="w-full">
          <AdUnit slot="555666777" />
        </div>
      )}
    </div>
  );
}
