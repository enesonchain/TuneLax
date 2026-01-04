"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreCard } from "@/components/StoreCard";
import { ListingCard } from "@/components/ListingCard";
import { StudioCard } from "@/components/StudioCard";
import { Button } from "@/components/ui/button";
import { officialStores, marketplaceListings, studios } from "@/data/mockData";
import { Music, ArrowRight, Store, ShoppingBag, Headphones } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"en" | "tr">("en");

  const t = {
    en: {
      heroSubtitle: "Your Music, Your Marketplace",
      heroDescription:
        "Buy official gear, trade second-hand instruments, and find the perfect studio. All in one place.",
      exploreStores: "Explore Stores",
      browseMarketplace: "Browse Marketplace",
      featuredStores: "Featured Official Stores",
      latestListings: "Latest Marketplace Listings",
      popularStudios: "Popular Studios",
      viewAll: "View All",
      statsStores: "Official Stores",
      statsListings: "Active Listings",
      statsStudios: "Studios",
      statsCities: "Cities",
    },
    tr: {
      heroSubtitle: "Muzigin, Pazarin",
      heroDescription:
        "Resmi ekipman satin al, ikinci el enstruman takasi yap ve mukemmel studyoyu bul. Hepsi tek yerde.",
      exploreStores: "Magazalari Kesfet",
      browseMarketplace: "Ikinci El'e Goz At",
      featuredStores: "One Cikan Resmi Magazalar",
      latestListings: "En Son Ikinci El Ilanlar",
      popularStudios: "Populer Studyolar",
      viewAll: "Tumunu Gor",
      statsStores: "Resmi Magaza",
      statsListings: "Aktif Ilan",
      statsStudios: "Studyo",
      statsCities: "Sehir",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar lang={lang} onLangChange={setLang} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 text-center px-4 pt-20">
          <div className="flex justify-center mb-8">
            <div className="animate-pulse-glow rounded-full p-6 bg-surface">
              <Music className="h-20 w-20 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 animate-fade-in">
            TuneLax
          </h1>

          <p className="text-2xl md:text-3xl gradient-text font-semibold mb-6 animate-fade-in stagger-1">
            {t[lang].heroSubtitle}
          </p>

          <p className="text-lg text-muted max-w-2xl mx-auto mb-10 animate-fade-in stagger-2">
            {t[lang].heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-3">
            <Button size="lg" asChild>
              <Link href="/stores">
                <Store className="mr-2 h-5 w-5" />
                {t[lang].exploreStores}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/marketplace">
                <ShoppingBag className="mr-2 h-5 w-5" />
                {t[lang].browseMarketplace}
              </Link>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-muted rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-muted">{t[lang].statsStores}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">1,200+</p>
              <p className="text-muted">{t[lang].statsListings}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">30+</p>
              <p className="text-muted">{t[lang].statsStudios}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">2</p>
              <p className="text-muted">{t[lang].statsCities}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {t[lang].featuredStores}
              </h2>
              <p className="text-muted">
                {lang === "en"
                  ? "Verified music gear stores in Istanbul & Bursa"
                  : "Istanbul ve Bursa'da onaylanmis muzik ekipman magazalari"}
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/stores" className="flex items-center">
                {t[lang].viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {officialStores.map((store) => (
              <StoreCard key={store.id} store={store} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Listings Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {t[lang].latestListings}
              </h2>
              <p className="text-muted">
                {lang === "en"
                  ? "Find great deals on second-hand gear"
                  : "Ikinci el ekipmanlarda harika firsatlar bulun"}
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/marketplace" className="flex items-center">
                {t[lang].viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceListings.slice(0, 6).map((listing) => (
              <ListingCard key={listing.id} listing={listing} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Studios Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {t[lang].popularStudios}
              </h2>
              <p className="text-muted">
                {lang === "en"
                  ? "Book recording and rehearsal spaces"
                  : "Kayit ve prova alanlari kiralayin"}
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/studios" className="flex items-center">
                {t[lang].viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 via-surface to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Headphones className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {lang === "en"
              ? "Ready to start your music journey?"
              : "Muzik yolculugunuza baslamaya hazir misiniz?"}
          </h2>
          <p className="text-lg text-muted mb-8">
            {lang === "en"
              ? "Join thousands of musicians buying, selling, and creating music."
              : "Binlerce muzisyenle birlikte alin, satin ve muzik yaratin."}
          </p>
          <Button size="lg">
            {lang === "en" ? "Get Started Free" : "Ucretsiz Baslayin"}
          </Button>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
