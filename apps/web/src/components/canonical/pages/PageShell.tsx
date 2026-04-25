"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "../Logo";

export function PageShell({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  const router = useRouter();
  const sub = dark ? "text-[#9AA0B1]" : "text-[#5B6173]";
  const border = dark ? "border-white/10" : "border-[#E5E7EC]";
  return (
    <div className={`min-h-screen ${dark ? "bg-[#0B0D14] text-white" : "bg-[#FBFBF8] text-[#0B0D14]"} font-display`}>
      <div className={`flex items-center justify-between px-10 py-5 border-b ${border}`}>
        <div className="flex items-center gap-10">
          <Link href="/"><Logo dark={dark} /></Link>
          <nav className={`flex items-center gap-6 text-[13px] ${sub}`}>
            <Link href="/" className="hover:opacity-80">제품</Link>
            <Link href="/gallery" className="hover:opacity-80">차트 갤러리</Link>
            <Link href="/templates" className="hover:opacity-80">템플릿</Link>
            <Link href="/use-cases" className="hover:opacity-80">활용 사례</Link>
            <Link href="/pricing" className="hover:opacity-80">요금</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button className={`px-3.5 py-2 text-[13px] ${sub} hover:opacity-80`}>로그인</button>
          <button
            onClick={() => router.push("/workspace")}
            className={`px-4 py-2 rounded-full text-[13px] flex items-center gap-1.5 ${dark ? "bg-white text-[#0B0D14]" : "bg-[#0B0D14] text-white"}`}
          >
            무료로 시작하기 <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

export function PageHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="max-w-[1320px] mx-auto px-10 pt-16 pb-10">
      <div className="text-[11px] tracking-[0.14em] text-[#5B6EFF]">{eyebrow}</div>
      <h1 className="mt-4 font-display" style={{ fontSize: 56, lineHeight: 1.06, letterSpacing: "-0.04em", fontWeight: 600 }}>
        {title}
      </h1>
      <p className="mt-5 text-[16px] leading-[1.65] text-[#5B6173] max-w-[640px]">{desc}</p>
    </div>
  );
}


