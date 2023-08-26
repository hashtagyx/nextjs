import Link from 'next/link'
import NavBar from '@/components/NavBar';
import { exo2, orbitron } from './fonts'
import './globals.css';

export const metadata = {
  title: {
    default: 'Indie Gamer',
    template: '%s | Indie Gamer',
  },
  description: 'Only the best indie games, reviewed for you.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="bg-orange-50 flex flex-col min-h-screen px-4 py-2">
        <header>
            <NavBar />
        </header>
        <main className="py-3 grow">
          {children}
        </main>
        <footer className="border-t py-3 text-center text-xs text-slate-500">
            Game data and images courtesy
            of <a className="text-orange-800 hover:underline" href="https://rawg.io" target="_blank">RAWG</a>
        </footer>
      </body>
    </html>
  );
}
