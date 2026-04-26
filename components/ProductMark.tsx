export default function ProductMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="S-Money mark">
      <rect width="64" height="64" rx="14" fill="#243142" />
      <path
        d="M42.5 16.5H27.2c-6.1 0-10.4 3.7-10.4 8.9 0 4.4 3.1 7.1 8.6 8.2l9.6 1.9c3 .6 4.7 1.8 4.7 4.1 0 2.7-2.5 4.7-6.4 4.7H17.8"
        fill="none"
        stroke="#F8FAFC"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42.6 16.5c-3.8 7-9.8 12.3-18.7 16.5"
        fill="none"
        stroke="#9DB0C3"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M21.3 48.4c4.1-6.7 10.2-11.5 18.7-14.6"
        fill="none"
        stroke="#9DB0C3"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M46.8 42.6l3.2 3.2 6-7" fill="none" stroke="#DDE7F0" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
