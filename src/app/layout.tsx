import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: "Emily's Portfolio",
  description: 'A site to house all my development clutter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
