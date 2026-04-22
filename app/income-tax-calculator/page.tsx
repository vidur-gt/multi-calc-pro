
"use client";
import { useState } from "react";
import { taxNew } from "@/lib/calculators";

export default function Page() {
  const [income, setIncome] = useState(1000000);
  return (
    <div>
      <h1>Income Tax Calculator</h1>
      <input value={income} onChange={e=>setIncome(+e.target.value)} />
      <p>Tax: {Math.round(taxNew(income))}</p>
    </div>
  );
}
