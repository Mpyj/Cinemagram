import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "سینماگرام | پیشنهاد فیلم، سریال و انیمه",
  description: "کشف کن، نظر بده، لیست بساز. پیشنهادهای هوشمند بر اساس سلیقه تو.",
  keywords: ["فیلم", "سریال", "انیمه", "سینما", "دانلود فیلم", "تماشای آنلاین"],
  openGraph: {
    title: "سینماگرام",
    description: "دنیای فیلم، سریال و انیمه در یکجا",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}