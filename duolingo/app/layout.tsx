import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css"; // Moved to the top

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Duolingo Clone",
  description: "Learn languages with Duolingo clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
