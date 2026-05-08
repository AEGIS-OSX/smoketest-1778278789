import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'smoketest-1778278789',
  description: 'AEGIS-generated project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
