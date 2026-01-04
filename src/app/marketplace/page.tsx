"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ListingCard } from "@/components/ListingCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { marketplaceListings, categories, conditions } from "@/data/mockData";
import { Search, Plus, MapPin, SlidersHorizontal } from "lucide-react";

export default function MarketplacePage() {
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");

  const t = {
    en: {
      title: "Marketplace",
      subtitle: "Buy and sell second-hand music gear",
      search: "Search listings...",
      allCities: "All Cities",
      allCategories: "All Categories",
      allConditions: "All Conditions",
      results: "listings found",
      sellItem: "Sell an Item",
      sortBy: "Sort by",
      newest: "Newest",
      priceLow: "Price: Low to High",
      priceHigh: "Price: High to Low",
    },
    tr: {
      title: "Ikinci El",
      subtitle: "Ikinci el muzik ekipmanlarini alin ve satin",
      search: "Ilan ara...",
      allCities: "Tum Sehirler",
      allCategories: "Tum Kategoriler",
      allConditions: "Tum Durumlar",
      results: "ilan bulundu",
      sellItem: "Ilan Ver",
      sortBy: "Siralama",
      newest: "En Yeni",
      priceLow: "Fiyat: Dusukten Yuksege",
      priceHigh: "Fiyat: Yuksekten Dusuge",
    },
  };

  // Filter and sort listings
  let filteredListings = marketplaceListings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || listing.city === selectedCity;
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    const matchesCondition = !selectedCondition || listing.condition === selectedCondition;
    return matchesSearch && matchesCity && matchesCategory && matchesCondition && listing.status === "active";
  });

  // Sort
  filteredListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
              {t[lang].sellItem}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t[lang].search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
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

              {/* Sort */}
              <div className="flex items-center gap-2 ml-auto">
                <SlidersHorizontal className="h-4 w-4 text-muted" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                >
                  <option value="newest">{t[lang].newest}</option>
                  <option value="priceLow">{t[lang].priceLow}</option>
                  <option value="priceHigh">{t[lang].priceHigh}</option>
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                {t[lang].allCategories}
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Condition Filter */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCondition === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCondition(null)}
              >
                {t[lang].allConditions}
              </Badge>
              {conditions.map((condition) => (
                <Badge
                  key={condition.value}
                  variant={selectedCondition === condition.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCondition(condition.value === selectedCondition ? null : condition.value)}
                >
                  {lang === "en" ? condition.label : condition.labelTr}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-muted mb-8">
            {filteredListings.length} {t[lang].results}
          </p>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} lang={lang} />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted text-lg">
                {lang === "en" ? "No listings found" : "Ilan bulunamadi"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
