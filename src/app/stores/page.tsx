"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreCard } from "@/components/StoreCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { officialStores } from "@/data/mockData";
import { Search, MapPin } from "lucide-react";

export default function StoresPage() {
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const t = {
    en: {
      title: "Official Stores",
      subtitle: "Browse verified music gear stores in Turkey",
      search: "Search stores...",
      allCities: "All Cities",
      allBrands: "All Brands",
      results: "stores found",
    },
    tr: {
      title: "Resmi Magazalar",
      subtitle: "Turkiye'deki onaylanmis muzik ekipman magazalarini inceleyin",
      search: "Magaza ara...",
      allCities: "Tum Sehirler",
      allBrands: "Tum Markalar",
      results: "magaza bulundu",
    },
  };

  // Get unique brands
  const allBrands = [...new Set(officialStores.flatMap((store) => store.brands))];

  // Filter stores
  const filteredStores = officialStores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.brands.some((brand) => brand.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCity = !selectedCity || store.city === selectedCity;
    const matchesBrand = !selectedBrand || store.brands.includes(selectedBrand);
    return matchesSearch && matchesCity && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar lang={lang} onLangChange={setLang} />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t[lang].title}
            </h1>
            <p className="text-lg text-muted">{t[lang].subtitle}</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t[lang].search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {/* City Filter */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted" />
                <Button
                  variant={selectedCity === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCity(null)}
                >
                  {t[lang].allCities}
                </Button>
                <Button
                  variant={selectedCity === "Istanbul" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCity("Istanbul")}
                >
                  Istanbul
                </Button>
                <Button
                  variant={selectedCity === "Bursa" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCity("Bursa")}
                >
                  Bursa
                </Button>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge
                variant={selectedBrand === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedBrand(null)}
              >
                {t[lang].allBrands}
              </Badge>
              {allBrands.slice(0, 8).map((brand) => (
                <Badge
                  key={brand}
                  variant={selectedBrand === brand ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedBrand(brand === selectedBrand ? null : brand)}
                >
                  {brand}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-muted text-center mb-8">
            {filteredStores.length} {t[lang].results}
          </p>

          {/* Store Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStores.map((store) => (
              <StoreCard key={store.id} store={store} lang={lang} />
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted text-lg">
                {lang === "en" ? "No stores found" : "Magaza bulunamadi"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
