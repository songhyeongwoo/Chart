import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAC",
  description: "한국어로 차트 초안을 만들고 발표용 결과물까지 직접 다듬는 no-code 데이터 시각화 편집기."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
