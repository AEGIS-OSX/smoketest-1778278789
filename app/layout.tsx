import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PawWalk — Early access for Brooklyn dog owners",
  description: "Join PawWalk’s early access waitlist for vetted dog walkers and flexible scheduling in Brooklyn. Limited spots for first 100 signups.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PawWalk — Early access for Brooklyn dog owners",
    description: "Join PawWalk’s early access waitlist for vetted dog walkers and flexible scheduling in Brooklyn. Limited spots for first 100 signups.",
    images: [
      {
        url: "/og-image.png",
        alt: "Editorial hero: brass leash clasp on matte charcoal with cream accents.",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
