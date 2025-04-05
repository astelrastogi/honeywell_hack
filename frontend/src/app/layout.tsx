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
          <header className="bg-red-900 text-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-xl font-bold leading-tight">SmartOps</h1>
                  <p className="text-sm text-blue-100">AI-powered insights for operational excellence</p>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-4">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-blue-500 font-semibold border border-white">
                A
              </div>
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
