"use client";

import { Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
  id: string;
}

export default function CalculatorLayout({ title, description, children, id }: Props) {
  const downloadPDF = async () => {
    const element = document.getElementById(id);
    if (!element) return;
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${title.toLowerCase().replace(/\s+/g, "-")}-report.pdf`);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-3xl font-extrabold text-slate-950 sm:text-4xl">{title}</h1>
        <p className="max-w-3xl leading-7 text-slate-600">{description}</p>
      </div>

      <div id={id} className="calc-card grid gap-6 bg-white md:grid-cols-2 lg:gap-8">
        {children}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button onClick={downloadPDF} className="btn-primary">
          <Download className="w-4 h-4" />
          Download PDF Report
        </button>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }} 
          className="btn-secondary" 
        >
          <Share2 className="w-4 h-4" />
          Share Tool
        </button>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 max-w-none rounded-[10px] border border-slate-200 bg-white p-5 text-slate-600 shadow-sm sm:p-6">
        <hr className="my-8 border-slate-200" />
        <h2 className="mb-4 text-2xl font-bold text-slate-900">How to Use the {title}</h2>
        <p className="mb-4">
          This professional {title} is designed to provide accurate results based on official formulas. 
          Simply input your details in the left panel, and the results will update in real-time.
        </p>
        <h3 className="mb-2 text-xl font-bold text-slate-900">Why S-Money?</h3>
        <p>
          S-Money provides precision-engineered financial tools with a focus on ease of use and data privacy. 
          Our calculators are updated with the latest FY 2024-25 tax slabs and financial standards.
        </p>
      </div>
    </div>
  );
}
