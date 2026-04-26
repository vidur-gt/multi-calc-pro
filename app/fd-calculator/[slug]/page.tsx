import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FD_SEO_DATA } from "@/lib/seo-data";
import FDCalculator from "@/components/calculators/FDCalculator";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FD_SEO_DATA.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = FD_SEO_DATA.find((p) => p.slug === slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/fd-calculator/${page.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = FD_SEO_DATA.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900"><Home className="w-4 h-4" /></Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/fd-calculator" className="hover:text-slate-900">FD Calculator</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-medium">{page.h1}</span>
      </nav>

      <section>
        <h1 className="mb-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">{page.h1}</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          {page.intro}
        </p>
      </section>

      <FDCalculator 
        initialP={page.initialValues?.p} 
        initialR={page.initialValues?.r} 
        initialY={page.initialValues?.y} 
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="section-panel p-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-4">Maturity Details for {page.h1}</h2>
          <div className="leading-7 text-slate-600">
            <p>{page.howItWorks}</p>
            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-bold mb-2">{page.example.label}</h3>
              <p className="text-slate-700 italic">{page.example.calculation}</p>
            </div>
          </div>
        </section>

        <section className="section-panel p-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-4">Fixed Deposit FAQs</h2>
          <div className="space-y-6">
            {page.faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-200 pb-4 last:border-b-0">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="section-panel p-5 sm:p-6">
        <h2 className="text-2xl font-bold mb-8">Related Savings Tools</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/sip-calculator" className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold capitalize text-slate-700 transition-all hover:border-slate-400 hover:shadow-sm">
            <div>
              <h3 className="font-bold text-lg mb-1">SIP Calculator</h3>
              <p className="text-slate-500 text-xs font-normal">Long term wealth creation</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>
          <Link href="/income-tax-calculator" className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold capitalize text-slate-700 transition-all hover:border-slate-400 hover:shadow-sm">
            <div>
              <h3 className="font-bold text-lg mb-1">Tax Calculator</h3>
              <p className="text-slate-500 text-xs font-normal">Plan your taxes for FY 24-25</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
