import EMICalculator from "@/components/calculators/EMICalculator";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export const metadata = {
  title: "EMI Calculator - Calculate Home & Car Loan EMI",
  description: "Calculate your monthly home or car loan installments instantly. Get an accurate EMI estimate with interest and principal breakdown.",
};

export default function EMICalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-medium">EMI Calculator</span>
      </nav>

      <section>
        <h1 className="mb-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">EMI Calculator</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          Calculate your Equated Monthly Installment (EMI) for home loans, car loans, and personal loans. Use our calculator to understand your monthly commitment and total interest outflow before borrowing.
        </p>
      </section>

      <EMICalculator />

      <section className="section-panel p-5 sm:p-6">
        <h2 className="mb-5 text-2xl font-bold">Popular EMI Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["home-loan-emi-calculator-india", "car-loan-emi-calculator-india", "bike-loan-emi-calculator-india", "personal-loan-emi-calculator-india", "emi-calculator-for-10-lakh"].map(slug => (
            <Link 
              key={slug} 
              href={`/emi-calculator/${slug}`}
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
