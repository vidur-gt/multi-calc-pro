"use client";

import Link from "next/link";
import { 
  Calculator, 
  TrendingUp, 
  Lock, 
  PieChart, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";

export default function Home() {
  const tools = [
    {
      title: "Income Tax Calculator",
      desc: "Old vs New Regime comparison for FY 2024-25 with tax-saving tips.",
      href: "/income-tax-calculator",
      icon: <PieChart className="w-8 h-8 text-indigo-500" />,
      tag: "Popular"
    },
    {
      title: "SIP Calculator",
      desc: "Estimate the wealth you can create through monthly mutual fund investments.",
      href: "/sip-calculator",
      icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
      tag: "Returns"
    },
    {
      title: "EMI Calculator",
      desc: "Calculate monthly installments for Home Loan, Car Loan or Personal Loan.",
      href: "/emi-calculator",
      icon: <Calculator className="w-8 h-8 text-blue-500" />,
      tag: "Loans"
    },
    {
      title: "FD Calculator",
      desc: "Check your fixed deposit maturity amount with quarterly compounding.",
      href: "/fd-calculator",
      icon: <Lock className="w-8 h-8 text-amber-500" />,
      tag: "Savings"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Smart Financial Tools for <span className="text-slate-500">Smarter Decisions</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          S-Money provides precision-engineered calculators for tax planning, loans, and investment projections. 
          Updated for Budget 2024.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/income-tax-calculator" className="btn-primary px-8 py-4">
            Start Tax Planning
          </Link>
          <a href="#all-tools" className="flex items-center gap-2 font-semibold text-slate-800 hover:underline">
            View All Tools <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="all-tools" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <Link 
            key={tool.title} 
            href={tool.href} 
            className="calc-card group flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                {tool.icon}
                <span className="text-[10px] uppercase font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
                  {tool.tag}
                </span>
              </div>
              <h3 className="text-xl mb-2 group-hover:text-slate-900 transition-colors">{tool.title}</h3>
              <p className="text-slate-500 text-sm">{tool.desc}</p>
            </div>
            <div className="mt-6 flex items-center text-slate-900 font-bold text-sm">
              Launch Tool <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </section>

      {/* Features/Trust Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-12 grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-emerald-600" />
          <h4 className="font-bold mb-2">Privacy First</h4>
          <p className="text-xs text-slate-500">We don't store your financial data. All calculations are performed in your browser.</p>
        </div>
        <div className="text-center">
          <Zap className="w-10 h-10 mx-auto mb-4 text-amber-500" />
          <h4 className="font-bold mb-2">Real-time Logic</h4>
          <p className="text-xs text-slate-500">See updates instantly as you move sliders. Powered by precision math for FY 24-25.</p>
        </div>
        <div className="text-center">
          <Globe className="w-10 h-10 mx-auto mb-4 text-blue-500" />
          <h4 className="font-bold mb-2">SEO Optimized</h4>
          <p className="text-xs text-slate-500">Blazing fast performance and structured data for search engine preference.</p>
        </div>
      </section>
    </div>
  );
}
