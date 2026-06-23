import { Inter, Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata = {
  title: "HH Lokanath Swami Maharaj — ISKCON Noida Expressway",
  description: "ISKCON Noida Expressway — A spiritual sanctuary founded by HH Lokanath Swami Maharaj, dedicated to Vedic culture, bhakti-yoga, and the teachings of Srila Prabhupada.",
  keywords: ["Lokanath Swami", "ISKCON", "Noida Expressway", "Sector 151", "Bhakti Yoga", "Srila Prabhupada", "Padayatra"],
  authors: [{ name: "ISKCON Noida Expressway" }],
  openGraph: {
    title: "HH Lokanath Swami Maharaj — ISKCON Noida Expressway",
    description: "A spiritual sanctuary founded by HH Lokanath Swami Maharaj, dedicated to Vedic culture, bhakti-yoga, and the teachings of Srila Prabhupada.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="font-sans bg-ivory text-text overflow-x-hidden leading-[1.7]">
        {children}
      </body>
    </html>
  );
}
