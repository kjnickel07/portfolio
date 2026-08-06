import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Header } from "@/components/layout/header";
import { site, hero } from "@/lib/content";
import { BASE_PATH } from "@/lib/base-path";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: hero.thesis,
  metadataBase: new URL("https://kjnickel07.github.io/portfolio"),
  manifest: `${BASE_PATH}/site.webmanifest`,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: hero.thesis,
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
