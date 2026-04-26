"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Landmark,
  LineChart,
  Lock,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import ProductMark from "@/components/ProductMark";

export default function Home() {
  const tools = [
    {
      title: "Income Tax Calculator",
      desc: "Compare old and new regimes with deductions, taxable income, and savings clearly separated.",
      href: "/income-tax-calculator",
      icon: ReceiptText,
      tag: "Tax planning",
    },
    {
      title: "SIP Calculator",
      desc: "Project monthly investments across time, expected returns, total contribution, and wealth created.",
      href: "/sip-calculator",
      icon: LineChart,
      tag: "Investments",
    },
    {
      title: "EMI Calculator",
      desc: "Estimate monthly payment, total interest, and total repayment before taking a loan.",
      href: "/emi-calculator",
      icon: Landmark,
      tag: "Loans",
    },
    {
      title: "FD Calculator",
      desc: "Calculate maturity value and interest earned with standard quarterly compounding.",
      href: "/fd-calculator",
      icon: PiggyBank,
      tag: "Savings",
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      <section className="grid items-center gap-8 py-4 lg:grid-cols-[1.08fr_0.92fr] lg:py-8">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600">
            <ShieldCheck className="h-4 w-4 text-slate-500" />
            Save smarter, not harder
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            Financial planning tools that feel clear, calm, and reliable.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            S-Money brings tax, loan, savings, and investment calculators into one focused workspace with instant results and practical breakdowns.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/income-tax-calculator" className="btn-primary px-5">
              Open tax calculator
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#all-tools" className="btn-secondary px-5">
              Browse tools
            </a>
          </div>
        </div>

        <div className="section-panel p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <p className="text-sm font-bold text-slate-500">Workspace snapshot</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Plan before you commit</h2>
            </div>
            <div className="brand-mark">
              <ProductMark className="h-7 w-7" />
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["Tax comparison", "Old vs New regime", "/income-tax-calculator"],
              ["Loan estimate", "EMI and interest split", "/emi-calculator"],
              ["Investment growth", "SIP future value", "/sip-calculator"],
              ["Deposit maturity", "FD interest earned", "/fd-calculator"],
            ].map(([label, value, href]) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-slate-400 hover:shadow-sm"
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-600">{label}</span>
                  <span className="mt-1 block text-sm font-bold text-slate-900">{value}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-slate-700" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="all-tools" className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.title}
              href={tool.href}
              className="calc-card group min-h-[220px] flex flex-col justify-between"
            >
              <div>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="brand-mark">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-950">{tool.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{tool.desc}</p>
              </div>
              <div className="mt-6 flex items-center text-sm font-bold text-slate-900">
                Launch tool
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </section>

      <section className="section-panel grid gap-6 p-5 sm:p-6 md:grid-cols-3">
        {[
          ["No data storage", "Inputs stay in the browser while you calculate."],
          ["Readable outputs", "Every calculator separates principal, interest, tax, and savings."],
          ["Mobile ready", "Controls and results are designed for narrow screens too."],
        ].map(([title, body]) => (
          <div key={title} className="flex gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
            <div>
              <h4 className="font-bold text-slate-900">{title}</h4>
              <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
