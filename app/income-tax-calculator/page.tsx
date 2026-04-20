
"use client";
import { useState } from "react";
import { tax } from "@/lib/calculators";

export default function Page() {
  const [income, setIncome] = useState(1000000);
  const val = tax(income);

  return (
    <div>
      <h1>Income Tax Calculator</h1>
      <input value={income} onChange={e=>setIncome(+e.target.value)} />
      <p>Tax: {Math.round(val)}</p>
    </div>
  );
}
