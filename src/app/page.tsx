"use client";

import { useState, useEffect } from "react";
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  // Check for reduced motion preference and set initial window size
  useEffect(() => {
    // Set actual window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll handler with RAF for smooth performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;

          // Calculate progress (0 to 1) over the first viewport height
          const progress = Math.min(Math.max(scrollY / (windowHeight * 0.7), 0), 1);
          setScrollProgress(prefersReducedMotion ? (progress > 0.5 ? 1 : 0) : progress);

          // Show navbar when logo transition is ~80% complete
          setNavbarVisible(progress > 0.8);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  // Intersection Observer for content reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    const sections = document.querySelectorAll(".reveal-section");
    const cards = document.querySelectorAll(".reveal-card");

    sections.forEach((el) => observer.observe(el));
    cards.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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

  // Easing function for smoother animation
  const easeOutExpo = (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  // Calculate logo transform values
  const easedProgress = easeOutExpo(scrollProgress);

  // Logo scales from 1 to 0.25 (navbar size)
  const logoScale = 1 - easedProgress * 0.75;

  // Calculate exact translation to navbar position
  // Logo starts at center: (50vw - 60px, 50vh - 60px) due to margin offset
  // Target navbar position: approximately (56px, 32px)
  const navbarLogoX = 56; // Navbar logo X position (px from left)
  const navbarLogoY = 32; // Navbar logo Y position (middle of navbar)

  // Calculate how far we need to move from center to navbar
  const startX = windowSize.width / 2 - 60;
  const startY = windowSize.height / 2 - 60;

  const logoTranslateX = easedProgress * (navbarLogoX - startX);
  const logoTranslateY = easedProgress * (navbarLogoY - startY);

  // Logo opacity fades as it reaches navbar
  const heroLogoOpacity = 1 - easedProgress * 0.3;

  // Content starts fading in after 30% scroll
  const contentOpacity = Math.max(0, (scrollProgress - 0.3) / 0.7);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar - appears when logo reaches it */}
      <div
        className={`navbar-container ${navbarVisible ? "navbar-visible" : "navbar-hidden"}`}
      >
        <Navbar lang={lang} onLangChange={setLang} showLogo={navbarVisible} />
      </div>

      {/* Hero Section - Full Screen with Centered Logo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle radial gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, rgba(139, 92, 246, ${0.06 * (1 - easedProgress)}) 0%, transparent 60%)`,
          }}
        />

        {/* Animated Logo */}
        <div
          className="fixed z-50 flex flex-col items-center will-change-transform"
          style={{
            opacity: heroLogoOpacity,
            transform: `translate(${logoTranslateX}px, ${logoTranslateY}px) scale(${logoScale})`,
            top: "50%",
            left: "50%",
            marginTop: "-60px",
            marginLeft: "-60px",
            pointerEvents: scrollProgress > 0.8 ? "none" : "auto",
          }}
        >
          <div className="hero-logo-glow">
            <Music className="h-28 w-28 md:h-32 md:w-32 text-primary" />
          </div>
          <h1
            className="mt-4 text-3xl md:text-4xl font-bold text-foreground tracking-tight whitespace-nowrap"
            style={{
              opacity: 1 - easedProgress * 1.5,
              transform: `scale(${1 - easedProgress * 0.3})`,
            }}
          >
            TuneLax
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 4),
            transform: `translateY(${scrollProgress * 20}px)`,
          }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground/50 animate-scroll-hint" />
        </div>
      </section>

      {/* Main Content */}
      <div
        style={{
          opacity: prefersReducedMotion ? 1 : contentOpacity,
          transform: prefersReducedMotion ? "none" : `translateY(${(1 - contentOpacity) * 40}px)`,
        }}
      >
        {/* Welcome Section */}
        <section className="py-28 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="reveal-section">
              <p className="text-3xl md:text-5xl gradient-text font-semibold mb-6 leading-tight">
                {t[lang].heroSubtitle}
              </p>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
                {t[lang].heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-12 px-8" asChild>
                  <Link href="/stores">
                    <Store className="mr-2 h-5 w-5" />
                    {t[lang].exploreStores}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8" asChild>
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
        <section className="py-20 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal-section">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</p>
                <p className="text-muted text-sm">{t[lang].statsStores}</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">1,200+</p>
                <p className="text-muted text-sm">{t[lang].statsListings}</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">30+</p>
                <p className="text-muted text-sm">{t[lang].statsStudios}</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">2</p>
                <p className="text-muted text-sm">{t[lang].statsCities}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Stores Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12 reveal-section">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {t[lang].featuredStores}
                </h2>
                <p className="text-muted">
                  {lang === "en"
                    ? "Verified music gear stores in Istanbul & Bursa"
                    : "Istanbul ve Bursa'da onaylanmis muzik ekipman magazalari"}
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/stores" className="flex items-center text-muted hover:text-foreground">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {officialStores.map((store, index) => (
                <div
                  key={store.id}
                  className="reveal-card"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <StoreCard store={store} lang={lang} />
                </div>
              ))}
            </div>
            <div className="mt-10 text-center sm:hidden reveal-section">
              <Button variant="ghost" asChild>
                <Link href="/stores" className="flex items-center justify-center text-muted">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Listings Section */}
        <section className="py-24 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12 reveal-section">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {t[lang].latestListings}
                </h2>
                <p className="text-muted">
                  {lang === "en"
                    ? "Find great deals on second-hand gear"
                    : "Ikinci el ekipmanlarda harika firsatlar bulun"}
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/marketplace" className="flex items-center text-muted hover:text-foreground">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceListings.slice(0, 6).map((listing, index) => (
                <div
                  key={listing.id}
                  className="reveal-card"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <ListingCard listing={listing} lang={lang} />
                </div>
              ))}
            </div>
            <div className="mt-10 text-center sm:hidden reveal-section">
              <Button variant="ghost" asChild>
                <Link href="/marketplace" className="flex items-center justify-center text-muted">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Studios Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12 reveal-section">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {t[lang].popularStudios}
                </h2>
                <p className="text-muted">
                  {lang === "en"
                    ? "Book recording and rehearsal spaces"
                    : "Kayit ve prova alanlari kiralayin"}
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/studios" className="flex items-center text-muted hover:text-foreground">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studios.map((studio, index) => (
                <div
                  key={studio.id}
                  className="reveal-card"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <StudioCard studio={studio} lang={lang} />
                </div>
              ))}
            </div>
            <div className="mt-10 text-center sm:hidden reveal-section">
              <Button variant="ghost" asChild>
                <Link href="/studios" className="flex items-center justify-center text-muted">
                  {t[lang].viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-section">
            <Headphones className="h-14 w-14 text-primary mx-auto mb-8 opacity-80" />
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              {lang === "en"
                ? "Ready to start your music journey?"
                : "Muzik yolculugunuza baslamaya hazir misiniz?"}
            </h2>
            <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
              {lang === "en"
                ? "Join thousands of musicians buying, selling, and creating music."
                : "Binlerce muzisyenle birlikte alin, satin ve muzik yaratin."}
            </p>
            <Button size="lg" className="h-12 px-10">
              {lang === "en" ? "Get Started Free" : "Ucretsiz Baslayin"}
            </Button>
          </div>
        </section>

        <Footer lang={lang} />
      </div>
    </div>
  );
}
