
"use client";
import { useState } from "react";
import { sip } from "@/lib/calculators";

export default function Page() {
  const [m, setM] = useState(5000);
  const [r, setR] = useState(12);
  const [y, setY] = useState(10);
  const val = sip(m, r, y);

  return (
    <div>
      <h1>SIP Calculator</h1>
      <input value={m} onChange={e=>setM(+e.target.value)} />
      <input value={r} onChange={e=>setR(+e.target.value)} />
      <input value={y} onChange={e=>setY(+e.target.value)} />
      <p>Value: {Math.round(val)}</p>
    </div>
  );
}
