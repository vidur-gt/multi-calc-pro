import { ReactNode } from "react";

export function CalculatorCard({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full rounded-[10px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {children}
    </div>
  );
}

export function ResultCard({ children, highlight = false }: { children: ReactNode, highlight?: boolean }) {
  return (
    <div className={`flex h-full w-full flex-col justify-center rounded-[10px] p-5 sm:p-6 ${highlight ? 'border border-slate-300 bg-slate-50 shadow-sm' : 'border border-slate-200 bg-white'}`}>
      {children}
    </div>
  );
}
