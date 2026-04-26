"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Landmark, LineChart, PiggyBank, ReceiptText } from "lucide-react";

const navItems = [
  { href: "/emi-calculator", label: "EMI", icon: Landmark },
  { href: "/sip-calculator", label: "SIP", icon: LineChart },
  { href: "/fd-calculator", label: "FD", icon: PiggyBank },
  { href: "/income-tax-calculator", label: "Tax", icon: ReceiptText },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="site-shell nav-inner">
        <Link href="/" className="brand-lockup" aria-label="S-Money home">
          <span className="brand-mark">
            <Calculator className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-extrabold leading-tight tracking-normal text-slate-900">S-Money</span>
            <span className="brand-tagline">Save smarter, not harder</span>
          </span>
        </Link>
        <div className="nav-links" aria-label="Financial calculators">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="mr-1.5 h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
