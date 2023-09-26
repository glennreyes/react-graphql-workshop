import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { ApolloWrapper } from '@/components/apollo-wrapper';
import { ModeToggle } from '@/components/mode-toggle';
import { UserAvatar } from '@/components/user-avatar';
import { Twitter } from 'lucide-react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ApolloWrapper>
            <header className="supports-backdrop-blur:bg-background/75 bg-background/90 sticky top-0 z-50 border-b backdrop-blur">
              <div className="container flex items-center justify-between p-4">
                <Link href="/" className="-m-2 p-2 text-2xl font-bold" title="X">
                  <Twitter className="h-8 w-8" />
                </Link>
                <div className="flex items-center gap-4">
                  <ModeToggle />
                  <UserAvatar />
                </div>
              </div>
            </header>
            <main className="container grid grid-cols-12 py-16">
              <section className="col-span-6 col-start-4">{children}</section>
            </main>
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
