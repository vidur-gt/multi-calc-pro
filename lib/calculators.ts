
export function emi(p, r, n) {
  const rate = r / 1200;
  return (p * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
}

export function sip(m, r, y) {
  const rate = r / 1200;
  const n = y * 12;
  return m * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate);
}

export function fd(p, r, y) {
  return p * Math.pow(1 + r / 100, y);
}

export function tax(income) {
  return income * 0.1;
}
