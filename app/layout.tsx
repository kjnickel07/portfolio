import type { Metadata, Viewport } from "next";
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

// Separate from `metadata` — Next silently ignores `themeColor` if it's
// nested under the `metadata` export instead of its own `viewport` export.
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
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
