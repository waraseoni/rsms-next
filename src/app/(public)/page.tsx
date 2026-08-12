"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Phone, MessageCircle, Search, QrCode, LogIn, ArrowRight, Sparkles,
} from "lucide-react";
import { SITE, WHATSAPP_LINK, getSiteInfo } from "./site";

export default function PublicHome() {
  const [siteInfo, setSiteInfo] = useState<any>(null);

  useEffect(() => {
    getSiteInfo().then(data => setSiteInfo(data));
  }, []);

  const displayInfo = siteInfo || SITE;

  return (
    <>
      {/* ═══ HERO ═════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.14),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.10),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:28px_28px]" />

        <div className="relative mx-auto max-w-7xl px-4 w-full py-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-widest mb-5">
              <Sparkles size={13} /> {displayInfo.shop_name || "V-Technologies"}
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight">
              {displayInfo.tagline || "Repair & Service Experts"}
            </h1>

            <p className="mt-5 text-[15px] sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              Track your repair status, send inquiries, or login to manage your account.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href={WHATSAPP_LINK("Hello, mujhe repair service chahiye.", displayInfo.whatsapp?.replace(/\D/g, ""))} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1fb959] text-[#04170c] text-[15px] font-black shadow-lg shadow-[#25D366]/25 transition-all active:scale-95">
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a href={`tel:${displayInfo.phone?.replace(/\D/g, "")}`}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/[0.06] border border-white/12 hover:bg-white/[0.1] text-white text-[15px] font-bold transition-all active:scale-95">
                <Phone size={18} className="text-emerald-400" /> {displayInfo.phone || SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUICK ACTIONS ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <p className="text-[11px] font-black uppercase tracking-widest text-cyan-400 mb-2">Quick Actions</p>
            <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight">
              What would you like to do?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/job-status"
              className="group rounded-3xl p-6 bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-blue-500/40 transition-all hover:-translate-y-1 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <Search size={28} className="text-blue-400" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Track Repair</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">Check your job status with Job ID or Repair Code</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-blue-400 mt-4 group-hover:gap-2.5 transition-all">
                Track Now <ArrowRight size={14} />
              </span>
            </Link>

            <Link href="/contact"
              className="group rounded-3xl p-6 bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all hover:-translate-y-1 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <MessageCircle size={28} className="text-emerald-400" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Contact Us</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">Have a question? Send us an inquiry</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-400 mt-4 group-hover:gap-2.5 transition-all">
                Contact Us <ArrowRight size={14} />
              </span>
            </Link>

            <Link href="/login"
              className="group rounded-3xl p-6 bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-purple-500/40 transition-all hover:-translate-y-1 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                <LogIn size={28} className="text-purple-400" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">Login</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">Staff and client portal access</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-purple-400 mt-4 group-hover:gap-2.5 transition-all">
                Sign In <ArrowRight size={14} />
              </span>
            </Link>

            <button onClick={() => document.getElementById('qr-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="group rounded-3xl p-6 bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 transition-all hover:-translate-y-1 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all">
                <QrCode size={28} className="text-cyan-400" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">QR Code</h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">Scan to visit on mobile</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-cyan-400 mt-4 group-hover:gap-2.5 transition-all">
                Show QR <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT INFO ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#0a0a18]/60 border-y border-white/[0.05]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <p className="text-[11px] font-black uppercase tracking-widest text-cyan-400 mb-2">Contact Us</p>
            <h2 className="font-display text-2xl sm:text-4xl font-black tracking-tight">
              Get in Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Phone size={24} className="text-blue-400" />
              </div>
              <h4 className="text-[15px] font-bold mb-2">Phone</h4>
              <p className="text-[13px] text-slate-400">{displayInfo.phone || SITE.phone}</p>
            </div>

            <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <MessageCircle size={24} className="text-emerald-400" />
              </div>
              <h4 className="text-[15px] font-bold mb-2">WhatsApp</h4>
              <p className="text-[13px] text-slate-400">{displayInfo.whatsapp || SITE.whatsapp.replace("https://wa.me/", "")}</p>
            </div>

            <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <QrCode size={24} className="text-cyan-400" />
              </div>
              <h4 className="text-[15px] font-bold mb-2">Email</h4>
              <p className="text-[13px] text-slate-400">{displayInfo.email || SITE.email}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06]">
            <h4 className="text-[15px] font-bold mb-3 text-center">Address</h4>
            <p className="text-[13px] text-slate-400 text-center">{displayInfo.address || SITE.address}</p>
          </div>
        </div>
      </section>

      {/* ═══ FLOATING WhatsApp ════════════════════════════════════════════ */}
      <a href={WHATSAPP_LINK("Hello, mujhe repair service chahiye.", displayInfo.whatsapp?.replace(/\D/g, ""))} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        className="fixed bottom-5 right-4 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl shadow-black/40 active:scale-90 transition-transform">
        <MessageCircle size={26} className="text-[#04170c]" />
      </a>
    </>
  );
}
