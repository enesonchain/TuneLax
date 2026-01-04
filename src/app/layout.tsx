import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TuneLax - Music Marketplace",
  description: "Turkey's premier music marketplace for official gear, second-hand instruments, and studio rentals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
