"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Menu,
  X,
  Heart,
  MessageSquare,
  Bell,
  Store,
  ShoppingBag,
  Music,
  Globe,
} from "lucide-react";

interface NavbarProps {
  lang: "en" | "tr";
  onLangChange: (lang: "en" | "tr") => void;
  showLogo?: boolean;
}

export function Navbar({ lang, onLangChange, showLogo = true }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const t = {
    en: {
      stores: "Official Stores",
      marketplace: "Marketplace",
      studios: "Studios",
      search: "Search for gear, studios, stores...",
      login: "Login",
      signup: "Sign Up",
    },
    tr: {
      stores: "Resmi Magazalar",
      marketplace: "Ikinci El",
      studios: "Studyolar",
      search: "Ekipman, studyo, magaza ara...",
      login: "Giris Yap",
      signup: "Kayit Ol",
    },
  };

  return (
    <nav className="bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity duration-300"
            style={{ opacity: showLogo ? 1 : 0, pointerEvents: showLogo ? 'auto' : 'none' }}
          >
            <Music className="h-7 w-7 text-primary" />
            <span className="text-lg font-semibold text-foreground">TuneLax</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/stores"
              className="flex items-center space-x-1.5 text-muted hover:text-foreground transition-colors text-sm"
            >
              <Store className="h-4 w-4" />
              <span>{t[lang].stores}</span>
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center space-x-1.5 text-muted hover:text-foreground transition-colors text-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{t[lang].marketplace}</span>
            </Link>
            <Link
              href="/studios"
              className="flex items-center space-x-1.5 text-muted hover:text-foreground transition-colors text-sm"
            >
              <Music className="h-4 w-4" />
              <span>{t[lang].studios}</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t[lang].search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 h-9 text-sm"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Toggle */}
            <button
              onClick={() => onLangChange(lang === "en" ? "tr" : "en")}
              className="flex items-center space-x-1 text-muted hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-white/5"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{lang.toUpperCase()}</span>
            </button>

            {/* Icons */}
            <button className="text-muted hover:text-foreground transition-colors p-2 rounded-md hover:bg-white/5">
              <Heart className="h-4 w-4" />
            </button>
            <button className="text-muted hover:text-foreground transition-colors p-2 rounded-md hover:bg-white/5">
              <MessageSquare className="h-4 w-4" />
            </button>
            <button className="text-muted hover:text-foreground transition-colors p-2 rounded-md hover:bg-white/5 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full"></span>
            </button>

            {/* Auth Buttons */}
            <Button variant="ghost" size="sm" className="text-sm h-8">
              {t[lang].login}
            </Button>
            <Button size="sm" className="text-sm h-8">{t[lang].signup}</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t[lang].search}
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>
              <Link
                href="/stores"
                className="flex items-center space-x-2 text-muted hover:text-foreground py-2 px-2 rounded-md hover:bg-white/5"
              >
                <Store className="h-5 w-5" />
                <span>{t[lang].stores}</span>
              </Link>
              <Link
                href="/marketplace"
                className="flex items-center space-x-2 text-muted hover:text-foreground py-2 px-2 rounded-md hover:bg-white/5"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>{t[lang].marketplace}</span>
              </Link>
              <Link
                href="/studios"
                className="flex items-center space-x-2 text-muted hover:text-foreground py-2 px-2 rounded-md hover:bg-white/5"
              >
                <Music className="h-5 w-5" />
                <span>{t[lang].studios}</span>
              </Link>
              <div className="flex items-center space-x-2 pt-3 border-t border-white/5">
                <Button variant="ghost" className="flex-1">
                  {t[lang].login}
                </Button>
                <Button className="flex-1">{t[lang].signup}</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
