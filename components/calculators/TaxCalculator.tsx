"use client";

import { useMemo, useState } from "react";
import {
  calculateTaxNewRegime,
  calculateTaxOldRegime,
  getTaxSuggestions,
  formatCurrency,
} from "@/lib/calculators";
import AdUnit from "@/components/AdUnit";
import { Info, Lightbulb } from "lucide-react";
import { CalculatorCard, ResultCard } from "@/components/ui/Cards";

interface Props {
  initialIncome?: number;
  hideAd?: boolean;
}

export default function TaxCalculator({ initialIncome = 1200000, hideAd = false }: Props) {
  const [income, setIncome] = useState(initialIncome);
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
    <div className="flex flex-col gap-8">
      <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-6">
        <CalculatorCard>
          <div className="flex flex-col gap-6">
            <div className="input-group m-0">
              <label className="input-label">Gross Annual Income</label>
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-slate-500">Rs.</span>
                <input
                  type="number"
                  className="input-field pl-12"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="rounded-[10px] border border-slate-200 bg-slate-50 p-5">
              <p className="mb-4 text-sm font-bold text-slate-800">Investment deductions (old regime)</p>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase text-slate-500">Section 80C (Max 1.5L)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-slate-400">Rs.</span>
                    <input
                      type="number"
                      max="150000"
                      className="input-field py-2 pl-11"
                      value={deductions80C}
                      onChange={(e) => setDeductions80C(Math.min(150000, Number(e.target.value)))}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase text-slate-500">Section 80D (Health Ins.)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-slate-400">Rs.</span>
                    <input
                      type="number"
                      className="input-field py-2 pl-11"
                      value={deductions80D}
                      onChange={(e) => setDeductions80D(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase text-slate-500">HRA / Home Loan Interest</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-slate-400">Rs.</span>
                    <input
                      type="number"
                      className="input-field py-2 pl-11"
                      value={hra}
                      onChange={(e) => setHra(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CalculatorCard>

        <div className="flex flex-col gap-5 lg:sticky lg:top-24">
          <ResultCard>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className={`rounded-[10px] border p-4 ${!isOldBetter ? "border-slate-400 bg-white shadow-sm" : "border-slate-200 bg-slate-50"}`}>
                <p className="mb-1 text-xs font-bold uppercase text-slate-500">New Regime</p>
                <p className="text-2xl font-extrabold text-slate-950">{formatCurrency(newRegime.effectiveTax)}</p>
                {!isOldBetter && (
                  <span className="mt-3 inline-block rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700">
                    Saves {formatCurrency(savings)}
                  </span>
                )}
              </div>

              <div className={`rounded-[10px] border p-4 ${isOldBetter ? "border-slate-400 bg-white shadow-sm" : "border-slate-200 bg-slate-50"}`}>
                <p className="mb-1 text-xs font-bold uppercase text-slate-500">Old Regime</p>
                <p className="text-2xl font-extrabold text-slate-950">{formatCurrency(oldRegime.effectiveTax)}</p>
                {isOldBetter && (
                  <span className="mt-3 inline-block rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700">
                    Saves {formatCurrency(savings)}
                  </span>
                )}
              </div>
            </div>
          </ResultCard>

          <div className="rounded-[10px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Info className="h-4 w-4 text-slate-500" />
              Comparison breakdown
            </h3>

            <div className="text-sm">
              <div className="border-b border-slate-200 py-4 first:pt-0">
                <span className="mb-3 block font-medium text-slate-600">Standard Deduction</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <span className="block text-xs font-bold uppercase text-slate-500">New</span>
                    <span className="mt-1 block font-bold text-slate-900">{formatCurrency(75000)}</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <span className="block text-xs font-bold uppercase text-slate-500">Old</span>
                    <span className="mt-1 block font-bold text-slate-900">{formatCurrency(50000)}</span>
                  </div>
                </div>
              </div>
              <div className="border-b border-slate-200 py-4">
                <span className="mb-3 block font-medium text-slate-600">Taxable Income</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <span className="block text-xs font-bold uppercase text-slate-500">New</span>
                    <span className="mt-1 block font-bold text-slate-900">{formatCurrency(newRegime.taxableIncome)}</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <span className="block text-xs font-bold uppercase text-slate-500">Old</span>
                    <span className="mt-1 block font-bold text-slate-900">{formatCurrency(oldRegime.taxableIncome)}</span>
                  </div>
                </div>
              </div>
              <div className="result-row">
                <span className="text-slate-600">Effective Tax</span>
                <span className="text-right text-lg font-extrabold text-slate-950">
                  {formatCurrency(isOldBetter ? oldRegime.effectiveTax : newRegime.effectiveTax)}
                </span>
              </div>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="rounded-[10px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                <Lightbulb className="h-5 w-5 text-slate-500" />
                Tax saving insights
              </h4>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                {suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {!hideAd && (
        <div className="w-full">
          <AdUnit slot="9988776655" />
        </div>
      )}
    </div>
  );
}
