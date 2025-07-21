import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yawny',
  description: '파자마 이커머스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`antialiased `}>{children}</body>
    </html>
  );
}
