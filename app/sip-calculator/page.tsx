import SIPCalculator from "@/components/calculators/SIPCalculator";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export const metadata = {
  title: "SIP Calculator - Mutual Fund Investment Planning",
  description: "Calculate your estimated SIP returns for mutual funds in India. Plan your investments and track wealth creation accurately.",
};

export default function SIPCalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-medium">SIP Calculator</span>
      </nav>

      <section>
        <h1 className="mb-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">SIP Calculator</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. Use our SIP calculator to estimate the future value of your monthly investments based on expected market returns.
        </p>
      </section>

      <SIPCalculator />

      <section className="section-panel p-5 sm:p-6">
        <h2 className="mb-5 text-2xl font-bold">Explore Top SIP Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["sip-calculator-1000-per-month", "sip-calculator-5000-per-month", "sip-calculator-10000-per-month", "sip-calculator-10-years", "sip-calculator-india-returns"].map(slug => (
            <Link 
              key={slug} 
              href={`/sip-calculator/${slug}`}
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
