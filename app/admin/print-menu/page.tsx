"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Printer, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  id: number;
  en: { name: string; desc: string };
  am: { name: string; desc: string };
  price: number;
}

interface MenuSection {
  id: string;
  category: string;
  items: MenuItem[];
}

interface Settings {
  hotelName: string;
  hotelSlogan: string;
  logo: string;
}

export default function PrintMenuPage() {
  const [menuData, setMenuData] = useState<MenuSection[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, settingsRes] = await Promise.all([
          fetch("/api/menu"),
          fetch("/api/settings")
        ]);
        
        if (menuRes.ok) setMenuData(await menuRes.json());
        if (settingsRes.ok) {
           const settingsData = await settingsRes.json();
           setSettings(settingsData);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black font-sans">
        <div className="text-sm animate-pulse tracking-widest uppercase font-bold">Optimizing A5 Menu...</div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // Splitting logic for A5 High Density
  // Page 1: Categories 1-5
  const page1Categories = menuData.slice(0, 5);
  // Page 2: Categories 6+
  const page2Categories = menuData.slice(5);

  return (
    <div className="min-h-screen bg-neutral-200 py-10 print:py-0 print:bg-white overflow-x-hidden font-condensed">
      {/* Mini Controls */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-black text-white rounded-full shadow-2xl flex items-center gap-4 print:hidden">
        <Link href="/admin/dashboard" className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors text-[10px] font-bold uppercase tracking-wider">
          <ChevronLeft className="w-3 h-3" />
          Back
        </Link>
        <div className="h-4 w-px bg-white/20" />
        <button
          onClick={handlePrint}
          className="px-4 py-1.5 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
        >
          <Printer className="w-3 h-3" />
          A5 Print
        </button>
      </div>

      <div className="flex flex-col items-center gap-8 print:gap-0">
        
        {/* PAGE 1 (A5) */}
        <div className="print-canvas bg-white shadow-xl relative overflow-hidden" 
          style={{ width: '148mm', minHeight: '210mm', padding: '0.25in' }}>
          
          {/* Header Section */}
          <div className="flex items-center gap-2 mb-3 border-b border-black/10 pb-1">
             <img src={settings?.logo || "/logo.png"} alt="Logo" className="w-6 h-6 object-contain grayscale" />
             <div className="flex flex-col">
                <h1 className="text-[10pt] font-black tracking-tighter text-black uppercase leading-none">
                  {settings?.hotelName || "ABAY HOTEL"}
                </h1>
                <span className="text-[6pt] text-[#D4AF37] font-bold uppercase tracking-widest leading-none">
                  Part I • Digital-Ready Menu
                </span>
             </div>
          </div>

          <div className="columns-3 gap-3 print:columns-3 h-full">
            {page1Categories.map((section) => (
              <div key={section.id} className="break-inside-avoid mb-2.5">
                <h2 className="text-[7.5pt] font-black text-white bg-black px-1.5 py-0.5 mb-1.5 uppercase tracking-tighter w-fit">
                  {section.category}
                </h2>
                <div className="flex flex-col">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-baseline gap-0.5 leading-[1.1] mb-0.5 group">
                      <span className="text-[8.5pt] font-bold text-black flex-shrink-0 max-w-[70%] truncate">
                        {item.en.name}
                      </span>
                      <div className="flex-1 border-b border-dotted border-black/20 mb-[2px]" />
                      <span className="text-[8.5pt] font-black text-black flex-shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-[0.25in] left-[0.25in] text-[6pt] font-bold text-neutral-300 uppercase tracking-widest">
            {settings?.hotelName} © 2026
          </div>
        </div>

        {/* PAGE 2 (A5) */}
        <div className="print-canvas bg-white shadow-xl relative overflow-hidden" 
          style={{ width: '148mm', minHeight: '210mm', padding: '0.25in', pageBreakBefore: 'always' }}>
          
          <div className="mb-3 border-b border-black/10 pb-1 flex justify-between items-center">
             <h2 className="text-[8pt] font-black tracking-tighter text-black uppercase leading-none">Complete Selections</h2>
             <span className="text-[6pt] text-neutral-400 font-bold uppercase tracking-widest">Part II</span>
          </div>

          <div className="columns-3 gap-3 print:columns-3 relative">
            
            {/* Promo Section: Forces into Column 2 conceptually by placement in balanced flex/columns or by splitting */}
            {page2Categories.map((section, idx) => (
              <div key={section.id} className="break-inside-avoid mb-2.5">
                
                {/* Visual Anchor: Promo Block injected specifically at first item of 2nd column (approximate idx) */}
                {idx === Math.ceil(page2Categories.length / 3) && (
                  <div className="break-inside-avoid mb-4 flex flex-col items-center border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-2 rounded-lg shadow-sm">
                    <span className="text-[7pt] font-black text-[#D4AF37] uppercase tracking-tighter mb-2 text-center leading-tight">
                      Scan for Full Menu<br/>with Photos & Live Updates
                    </span>
                    <div className="flex items-center justify-center gap-3">
                       <div className="relative w-12 h-20 shadow-lg border border-black/10 rounded-sm overflow-hidden scale-125 origin-right mr-1">
                          <img 
                            src="/mobile-menu-mockup.png" 
                            className="w-full h-full object-cover" 
                            alt="Mobile Preview"
                          />
                       </div>
                       <div className="bg-white p-1 border border-[#D4AF37]/30 rounded-sm scale-125 origin-left ml-1">
                          <QRCodeSVG 
                            value="https://abayhotel.vercel.app" 
                            size={42}
                            level="M"
                            includeMargin={false}
                          />
                       </div>
                    </div>
                  </div>
                )}

                <h2 className="text-[7.5pt] font-black text-white bg-black px-1.5 py-0.5 mb-1.5 uppercase tracking-tighter w-fit">
                  {section.category}
                </h2>
                <div className="flex flex-col">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-baseline gap-0.5 leading-[1.1] mb-0.5 group">
                      <span className="text-[8.5pt] font-bold text-black flex-shrink-0 max-w-[70%] truncate">
                        {item.en.name}
                      </span>
                      <div className="flex-1 border-b border-dotted border-black/20 mb-[2px]" />
                      <span className="text-[8.5pt] font-black text-black flex-shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-[0.2in] left-[0.25in] text-[6pt] font-bold text-neutral-300 uppercase tracking-widest">
            A5 Version • Page 2
          </div>
          
          {/* Fallback QR in corner if many items push it down, but the large one is central */}
          <div className="absolute bottom-[0.1in] right-[0.25in] text-[5pt] font-black text-neutral-200 uppercase tracking-tighter">
            ABAYHOTEL.VERCEL.APP
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');

        @media print {
          body { font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif !important; background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print-canvas {
            box-shadow: none !important;
            margin: 0 !important;
            border-radius: 0 !important;
            width: 148mm !important;
            min-height: 210mm !important;
            page-break-after: always !important;
            padding: 0.25in !important;
          }
          .fixed { display: none !important; }
        }
        
        body {
          font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        @page {
          size: A5;
          margin: 0;
        }

        .break-inside-avoid {
          break-inside: avoid;
        }

        .font-condensed {
          font-family: 'Roboto Condensed', 'Arial Narrow', sans-serif;
        }
      `}</style>
    </div>
  );
}
