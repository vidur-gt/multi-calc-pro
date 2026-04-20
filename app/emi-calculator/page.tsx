
"use client";
import { useState } from "react";
import { emi } from "@/lib/calculators";

export default function Page() {
  const [p, setP] = useState(500000);
  const [r, setR] = useState(10);
  const [n, setN] = useState(60);
  const val = emi(p, r, n);

  return (
    <div>
      <h1>EMI Calculator</h1>
      <input value={p} onChange={e=>setP(+e.target.value)} />
      <input value={r} onChange={e=>setR(+e.target.value)} />
      <input value={n} onChange={e=>setN(+e.target.value)} />
      <p>EMI: {Math.round(val)}</p>
    </div>
  );
}
