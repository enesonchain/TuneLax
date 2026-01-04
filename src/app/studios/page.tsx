"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudioCard } from "@/components/StudioCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { studios } from "@/data/mockData";
import { Search, Plus, MapPin, SlidersHorizontal } from "lucide-react";

export default function StudiosPage() {
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("rating");

  const t = {
    en: {
      title: "Studios",
      subtitle: "Find and book recording & rehearsal spaces",
      search: "Search studios...",
      allCities: "All Cities",
      results: "studios found",
      listStudio: "List Your Studio",
      sortBy: "Sort by",
      rating: "Highest Rated",
      priceLow: "Price: Low to High",
      priceHigh: "Price: High to Low",
    },
    tr: {
      title: "Studyolar",
      subtitle: "Kayit ve prova alanlari bulun ve kiralayin",
      search: "Studyo ara...",
      allCities: "Tum Sehirler",
      results: "studyo bulundu",
      listStudio: "Studyonuzu Listeleyin",
      sortBy: "Siralama",
      rating: "En Yuksek Puanli",
      priceLow: "Fiyat: Dusukten Yuksege",
      priceHigh: "Fiyat: Yuksekten Dusuge",
    },
  };

  // Filter and sort studios
  let filteredStudios = studios.filter((studio) => {
    const matchesSearch = studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.equipment.some((eq) => eq.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCity = !selectedCity || studio.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  // Sort
  filteredStudios = [...filteredStudios].sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.hourlyRate - b.hourlyRate;
      case "priceHigh":
        return b.hourlyRate - a.hourlyRate;
      case "rating":
      default:
        return b.rating - a.rating;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar lang={lang} onLangChange={setLang} />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {t[lang].title}
              </h1>
              <p className="text-lg text-muted">{t[lang].subtitle}</p>
            </div>
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              {t[lang].listStudio}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t[lang].search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground h-12"
                >
                  <option value="rating">{t[lang].rating}</option>
                  <option value="priceLow">{t[lang].priceLow}</option>
                  <option value="priceHigh">{t[lang].priceHigh}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
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
          </div>

          {/* Results count */}
          <p className="text-muted mb-8">
            {filteredStudios.length} {t[lang].results}
          </p>

          {/* Studios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStudios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} lang={lang} />
            ))}
          </div>

          {filteredStudios.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted text-lg">
                {lang === "en" ? "No studios found" : "Studyo bulunamadi"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
