import TaxCalculator from "@/components/calculators/TaxCalculator";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export const metadata = {
  title: "Income Tax Calculator India FY 2024-25 | Old vs New Regime",
  description: "Calculate and compare your income tax liability under Old and New regimes for FY 2024-25. Get smart tax-saving suggestions tailored to your salary.",
};

export default function IncomeTaxCalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-medium">Income Tax Calculator</span>
      </nav>

      <section>
        <h1 className="mb-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">Income Tax Calculator FY 2024-25</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          Not sure which tax regime to choose? Our tax calculator instantly compares your tax liability under the Old and New regimes, highlights your potential savings, and gives you actionable investment insights.
        </p>
      </section>

      <TaxCalculator />

      <section className="section-panel p-5 sm:p-6">
        <h2 className="mb-5 text-2xl font-bold">Tax Planning Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["income-tax-calculator-fy-2025-26", "tax-calculator-old-vs-new-regime", "tax-saving-calculator-india", "salary-tax-calculator-india", "tax-calculator-for-15-lakh-salary"].map(slug => (
            <Link 
              key={slug} 
              href={`/income-tax-calculator/${slug}`}
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
