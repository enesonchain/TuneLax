"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreCard } from "@/components/StoreCard";
import { ListingCard } from "@/components/ListingCard";
import { StudioCard } from "@/components/StudioCard";
import { Button } from "@/components/ui/button";
import { officialStores, marketplaceListings, studios } from "@/data/mockData";
import { Music, ArrowRight, Store, ShoppingBag, Headphones, ChevronDown } from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show navbar after scrolling past 50% of the hero
      setShowNavbar(scrollY > windowHeight * 0.5);

      // Calculate scroll progress for the hero section (0-1)
      const progress = Math.min(scrollY / (windowHeight * 0.8), 1);
      setScrollProgress(progress);
    };

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe all reveal elements
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

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
      {/* Navbar - appears on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          showNavbar ? "navbar-visible" : "navbar-hidden"
        }`}
      >
        <Navbar lang={lang} onLangChange={setLang} />
      </div>

      {/* Minimal Hero - Logo Only */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)"
          }}
        />

        {/* Centered Logo */}
        <div
          className="relative z-10 flex flex-col items-center animate-subtle-float"
          style={{
            opacity: 1 - scrollProgress * 1.5,
            transform: `scale(${1 - scrollProgress * 0.1}) translateY(${scrollProgress * -50}px)`,
          }}
        >
          <div className="animate-logo-breathe">
            <Music className="h-24 w-24 md:h-32 md:w-32 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            TuneLax
          </h1>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 1 - scrollProgress * 3 }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground animate-scroll-hint" />
        </div>
      </section>

      {/* Content Section - Revealed on Scroll */}
      <div ref={contentRef}>
        {/* Welcome Section */}
        <section className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="reveal-on-scroll">
              <p className="text-3xl md:text-4xl gradient-text font-semibold mb-6">
                {t[lang].heroSubtitle}
              </p>
              <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
                {t[lang].heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-border bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal-on-scroll">
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
            <div className="flex items-center justify-between mb-10 reveal-on-scroll">
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
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/stores" className="flex items-center">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {officialStores.map((store, index) => (
                <div key={store.id} className="reveal-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                  <StoreCard store={store} lang={lang} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden reveal-on-scroll">
              <Button variant="ghost" asChild>
                <Link href="/stores" className="flex items-center justify-center">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Listings Section */}
        <section className="py-20 bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10 reveal-on-scroll">
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
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/marketplace" className="flex items-center">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceListings.slice(0, 6).map((listing, index) => (
                <div key={listing.id} className="reveal-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                  <ListingCard listing={listing} lang={lang} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden reveal-on-scroll">
              <Button variant="ghost" asChild>
                <Link href="/marketplace" className="flex items-center justify-center">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Studios Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10 reveal-on-scroll">
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
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/studios" className="flex items-center">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studios.map((studio, index) => (
                <div key={studio.id} className="reveal-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                  <StudioCard studio={studio} lang={lang} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden reveal-on-scroll">
              <Button variant="ghost" asChild>
                <Link href="/studios" className="flex items-center justify-center">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/20 via-surface to-cyan-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-on-scroll">
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
    </div>
  );
}
