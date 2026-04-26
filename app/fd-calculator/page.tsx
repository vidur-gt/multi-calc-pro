import FDCalculator from "@/components/calculators/FDCalculator";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export const metadata = {
  title: "FD Calculator - Fixed Deposit Maturity Calculator",
  description: "Calculate your Fixed Deposit maturity amount and total interest earned. Plan your safe investments accurately.",
};

export default function FDCalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-medium">FD Calculator</span>
      </nav>

      <section>
        <h1 className="mb-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">FD Calculator</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          Fixed Deposits are a secure way to grow your savings. Use our FD calculator to find out your exact maturity amount and interest earned over your chosen tenure, based on standard quarterly compounding.
        </p>
      </section>

      <FDCalculator />

      <section className="section-panel p-5 sm:p-6">
        <h2 className="mb-5 text-2xl font-bold">Popular FD Calculations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["fd-calculator-1-lakh", "fd-calculator-5-lakh", "fd-calculator-10-lakh", "fixed-deposit-calculator-india", "bank-fd-interest-calculator"].map(slug => (
            <Link 
              key={slug} 
              href={`/fd-calculator/${slug}`}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold capitalize text-slate-700 transition-all hover:border-slate-400 hover:shadow-sm"
            >
              {slug.replace(/-/g, ' ')}
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
