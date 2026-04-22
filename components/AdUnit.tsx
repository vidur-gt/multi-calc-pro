"use client";

export default function AdUnit({ slot }: { slot: string }) {
  return (
    <div className="my-8 flex justify-center bg-slate-50 border border-dashed border-slate-300 rounded-lg p-4 min-h-[100px] items-center">
      <div className="text-slate-400 text-xs text-center">
        <p className="mb-2">Advertisement</p>
        {/* Actual AdSense Slot */}
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX'}
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <p className="mt-2 text-[10px] italic">(Placeholder for AdSense)</p>
      </div>
    </div>
  );
}
