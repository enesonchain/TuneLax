"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { officialStores } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";
import {
  MapPin,
  Phone,
  Globe,
  Instagram,
  Star,
  CheckCircle,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";

export default function StoreDetailPage() {
  const params = useParams();
  const [lang, setLang] = useState<"en" | "tr">("en");

  const store = officialStores.find((s) => s.id === params.id);

  const t = {
    en: {
      back: "Back to Stores",
      verified: "Verified Store",
      reviews: "reviews",
      brands: "Brands We Carry",
      products: "Our Products",
      addToCart: "Add to Cart",
      inStock: "In Stock",
      contact: "Contact Store",
    },
    tr: {
      back: "Magazalara Don",
      verified: "Onaylanmis Magaza",
      reviews: "degerlendirme",
      brands: "Tasidiğimiz Markalar",
      products: "Urunlerimiz",
      addToCart: "Sepete Ekle",
      inStock: "Stokta",
      contact: "Magazayla Iletisim",
    },
  };

  if (!store) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Store not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar lang={lang} onLangChange={setLang} />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/stores" className="inline-flex items-center text-muted hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t[lang].back}
          </Link>

          {/* Store Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
              <Image
                src={store.image}
                alt={store.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-foreground">{store.name}</h1>
                {store.isVerified && (
                  <Badge variant="verified" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {t[lang].verified}
                  </Badge>
                )}
              </div>

              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-foreground font-semibold text-lg">{store.rating}</span>
                <span className="text-muted ml-2">({store.reviewCount} {t[lang].reviews})</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-muted">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>{store.address}, {store.city}</span>
                </div>
                <div className="flex items-center text-muted">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center text-muted">
                  <Globe className="h-5 w-5 mr-3" />
                  <a href={store.website} className="hover:text-primary transition-colors">
                    {store.website}
                  </a>
                </div>
                <div className="flex items-center text-muted">
                  <Instagram className="h-5 w-5 mr-3" />
                  <span>{store.instagram}</span>
                </div>
              </div>

              <Button size="lg" className="w-fit">
                {t[lang].contact}
              </Button>
            </div>
          </div>

          {/* Brands */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t[lang].brands}</h2>
            <div className="flex flex-wrap gap-2">
              {store.brands.map((brand) => (
                <Badge key={brand} variant="secondary" className="text-sm py-1 px-3">
                  {brand}
                </Badge>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">{t[lang].products}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {store.products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {product.name}
                    </h3>
                    <p className="text-muted text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {formatPrice(product.price)}
                        </p>
                        <p className="text-xs text-green-400">
                          {product.stock} {t[lang].inStock}
                        </p>
                      </div>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t[lang].addToCart}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
