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
}

export function Navbar({ lang, onLangChange }: NavbarProps) {
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">TuneLax</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/stores"
              className="flex items-center space-x-1 text-muted hover:text-foreground transition-colors"
            >
              <Store className="h-4 w-4" />
              <span>{t[lang].stores}</span>
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center space-x-1 text-muted hover:text-foreground transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{t[lang].marketplace}</span>
            </Link>
            <Link
              href="/studios"
              className="flex items-center space-x-1 text-muted hover:text-foreground transition-colors"
            >
              <Music className="h-4 w-4" />
              <span>{t[lang].studios}</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t[lang].search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-surface border-border"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={() => onLangChange(lang === "en" ? "tr" : "en")}
              className="flex items-center space-x-1 text-muted hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{lang.toUpperCase()}</span>
            </button>

            {/* Icons */}
            <button className="text-muted hover:text-foreground transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-muted hover:text-foreground transition-colors">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="text-muted hover:text-foreground transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
            </button>

            {/* Auth Buttons */}
            <Button variant="ghost" size="sm">
              {t[lang].login}
            </Button>
            <Button size="sm">{t[lang].signup}</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t[lang].search}
                  className="pl-10"
                />
              </div>
              <Link
                href="/stores"
                className="flex items-center space-x-2 text-muted hover:text-foreground py-2"
              >
                <Store className="h-5 w-5" />
                <span>{t[lang].stores}</span>
              </Link>
              <Link
                href="/marketplace"
                className="flex items-center space-x-2 text-muted hover:text-foreground py-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>{t[lang].marketplace}</span>
              </Link>
              <Link
                href="/studios"
                className="flex items-center space-x-2 text-muted hover:text-foreground py-2"
              >
                <Music className="h-5 w-5" />
                <span>{t[lang].studios}</span>
              </Link>
              <div className="flex items-center space-x-2 pt-4 border-t border-border">
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
