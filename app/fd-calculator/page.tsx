
"use client";
import { useState } from "react";
import { fd } from "@/lib/calculators";

export default function Page() {
  const [p, setP] = useState(100000);
  const [r, setR] = useState(7);
  const [y, setY] = useState(5);
  return (
    <div>
      <h1>FD Calculator</h1>
      <input value={p} onChange={e=>setP(+e.target.value)} />
      <input value={r} onChange={e=>setR(+e.target.value)} />
      <input value={y} onChange={e=>setY(+e.target.value)} />
      <p>Value: {Math.round(fd(p,r,y))}</p>
    </div>
  );
}
