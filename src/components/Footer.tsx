"use client";

import Link from "next/link";
import { Music, Instagram, Twitter, Youtube, Mail } from "lucide-react";

interface FooterProps {
  lang: "en" | "tr";
}

export function Footer({ lang }: FooterProps) {
  const t = {
    en: {
      about: "About TuneLax",
      aboutText:
        "Turkey's premier music marketplace for official gear, second-hand instruments, and studio rentals.",
      quickLinks: "Quick Links",
      stores: "Official Stores",
      marketplace: "Marketplace",
      studios: "Studios",
      support: "Support",
      helpCenter: "Help Center",
      contact: "Contact Us",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      connect: "Connect",
      cities: "Available in Istanbul & Bursa",
      rights: "All rights reserved.",
    },
    tr: {
      about: "TuneLax Hakkinda",
      aboutText:
        "Turkiye'nin onde gelen muzik pazari. Resmi ekipman, ikinci el enstrumanlar ve studyo kiralamalari.",
      quickLinks: "Hizli Erisim",
      stores: "Resmi Magazalar",
      marketplace: "Ikinci El",
      studios: "Studyolar",
      support: "Destek",
      helpCenter: "Yardim Merkezi",
      contact: "Iletisim",
      terms: "Kullanim Kosullari",
      privacy: "Gizlilik Politikasi",
      connect: "Bizi Takip Edin",
      cities: "Istanbul ve Bursa'da Aktif",
      rights: "Tum haklari saklidir.",
    },
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">TuneLax</span>
            </Link>
            <p className="text-muted text-sm mb-4">{t[lang].aboutText}</p>
            <p className="text-muted-foreground text-xs">{t[lang].cities}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t[lang].quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/stores" className="text-muted hover:text-foreground text-sm transition-colors">
                  {t[lang].stores}
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-muted hover:text-foreground text-sm transition-colors">
                  {t[lang].marketplace}
                </Link>
              </li>
              <li>
                <Link href="/studios" className="text-muted hover:text-foreground text-sm transition-colors">
                  {t[lang].studios}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t[lang].support}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted hover:text-foreground text-sm transition-colors">
                  {t[lang].helpCenter}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted hover:text-foreground text-sm transition-colors">
                  {t[lang].contact}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted hover:text-foreground text-sm transition-colors">
                  {t[lang].terms}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted hover:text-foreground text-sm transition-colors">
                  {t[lang].privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            &copy; 2026 TuneLax. {t[lang].rights}
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
