import type {Metadata} from 'next';
import { Manrope } from 'next/font/google';
import './globals.css'; // Global styles

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Support My Work - Buy Me a Coffee',
  description: 'Support my work by buying me a coffee.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body className="font-manrope antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
