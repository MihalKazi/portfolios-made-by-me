// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Set up our primary clean sans-serif font
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Set up our elegant serif font for headings
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dewan Maruf Ahmed | Portfolio",
  description: "Social Science Researcher and Anthropologist specializing in digital rights, climate-vulnerable communities, and gender.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // scroll-smooth makes the anchor links in the navbar glide gracefully
    <html lang="en" className="scroll-smooth">
      <body 
        className={`${inter.variable} ${playfair.variable} bg-[#FDFBF7] text-[#1E3A2F] w-full overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}