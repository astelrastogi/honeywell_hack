import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Machine Monitoring Dashboard",
  description: "Real-time machine diagnostics and AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-blue-400 text-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">⚙️ Machine Monitoring</h1>
                <p className="text-sm text-blue-200">Real-time insights powered by AI</p>
              </div>
              <nav className="hidden md:flex space-x-6 text-sm font-medium">
                <Link href="/" className="hover:text-yellow-300">Dashboard</Link>
                <Link href="/machines" className="hover:text-yellow-300">Machines</Link>
                <Link href="/analytics" className="hover:text-yellow-300">Analytics</Link>
                <Link href="/settings" className="hover:text-yellow-300">Settings</Link>
              </nav>
              <div className="md:hidden">
                {/* Placeholder for mobile menu toggle */}
                <button className="text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t text-sm text-gray-500 py-4">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
              <p className="mb-2 md:mb-0">© {new Date().getFullYear()} Machine Insights Inc.</p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-gray-700">Terms</Link>
                <Link href="/contact" className="hover:text-gray-700">Contact</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
