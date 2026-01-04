"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { marketplaceListings, conditions } from "@/data/mockData";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  MapPin,
  Eye,
  Calendar,
  User,
  ArrowLeft,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react";

export default function ListingDetailPage() {
  const params = useParams();
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [bidAmount, setBidAmount] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const listing = marketplaceListings.find((l) => l.id === params.id);
  const condition = conditions.find((c) => c.value === listing?.condition);

  const t = {
    en: {
      back: "Back to Marketplace",
      condition: "Condition",
      location: "Location",
      views: "views",
      postedOn: "Posted on",
      seller: "Seller",
      description: "Description",
      makeOffer: "Make an Offer",
      yourBid: "Your bid amount",
      submitBid: "Submit Bid",
      buyNow: "Buy Now",
      message: "Message Seller",
      save: "Save",
      share: "Share",
      similarItems: "Similar Items",
    },
    tr: {
      back: "Ikinci El'e Don",
      condition: "Durum",
      location: "Konum",
      views: "goruntulenme",
      postedOn: "Yayinlanma tarihi",
      seller: "Satici",
      description: "Aciklama",
      makeOffer: "Teklif Ver",
      yourBid: "Teklif tutariniz",
      submitBid: "Teklif Gonder",
      buyNow: "Hemen Al",
      message: "Mesaj Gonder",
      save: "Kaydet",
      share: "Paylas",
      similarItems: "Benzer Ilanlar",
    },
  };

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Listing not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar lang={lang} onLangChange={setLang} />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/marketplace" className="inline-flex items-center text-muted hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t[lang].back}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Images */}
            <div className="lg:col-span-2">
              <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-4">
                <Image
                  src={listing.images[selectedImage]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </div>
              {listing.images.length > 1 && (
                <div className="flex gap-2">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-primary" : "border-border"
                      }`}
                    >
                      <Image src={image} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {t[lang].description}
                </h2>
                <p className="text-muted whitespace-pre-wrap">{listing.description}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Main Info Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={
                      listing.condition === "new" || listing.condition === "like-new" ? "success" :
                      listing.condition === "good" ? "warning" : "outline"
                    }>
                      {lang === "en" ? condition?.label : condition?.labelTr}
                    </Badge>
                    <Badge variant="secondary">{listing.category}</Badge>
                  </div>

                  <h1 className="text-2xl font-bold text-foreground mb-4">
                    {listing.title}
                  </h1>

                  <p className="text-4xl font-bold text-primary mb-6">
                    {formatPrice(listing.price)}
                  </p>

                  <div className="space-y-3 text-sm text-muted mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{listing.city}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>{listing.views} {t[lang].views}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{t[lang].postedOn}: {formatDate(listing.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{t[lang].seller}: {listing.userName}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      {t[lang].buyNow}
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {t[lang].message}
                    </Button>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      {t[lang].save}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      {t[lang].share}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Make Offer Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t[lang].makeOffer}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder={t[lang].yourBid}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <Button variant="secondary" className="w-full">
                      {t[lang].submitBid}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
