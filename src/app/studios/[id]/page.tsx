"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { studios } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";
import {
  MapPin,
  Star,
  ArrowLeft,
  Calendar,
  Clock,
  Maximize,
  Music,
  Phone,
} from "lucide-react";

export default function StudioDetailPage() {
  const params = useParams();
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const studio = studios.find((s) => s.id === params.id);

  const t = {
    en: {
      back: "Back to Studios",
      reviews: "reviews",
      equipment: "Available Equipment",
      hourly: "Hourly Rate",
      daily: "Daily Rate",
      roomSize: "Room Size",
      sqm: "sqm",
      bookNow: "Book Now",
      selectDate: "Select a date",
      contact: "Contact Studio",
      about: "About This Studio",
      availability: "Check Availability",
    },
    tr: {
      back: "Studyolara Don",
      reviews: "degerlendirme",
      equipment: "Mevcut Ekipmanlar",
      hourly: "Saatlik Ucret",
      daily: "Gunluk Ucret",
      roomSize: "Oda Boyutu",
      sqm: "m2",
      bookNow: "Hemen Rezervasyon Yap",
      selectDate: "Tarih secin",
      contact: "Studyoyla Iletisim",
      about: "Bu Studyo Hakkinda",
      availability: "Musaitlik Durumunu Kontrol Et",
    },
  };

  if (!studio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Studio not found</p>
      </div>
    );
  }

  // Generate mock available time slots
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar lang={lang} onLangChange={setLang} />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/studios" className="inline-flex items-center text-muted hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t[lang].back}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Images and Info */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative h-80 md:h-[450px] rounded-xl overflow-hidden mb-4">
                <Image
                  src={studio.images[selectedImage]}
                  alt={studio.name}
                  fill
                  className="object-cover"
                />
              </div>
              {studio.images.length > 1 && (
                <div className="flex gap-2 mb-8">
                  {studio.images.map((image, index) => (
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

              {/* Studio Info */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-4">{studio.name}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-foreground font-semibold">{studio.rating}</span>
                    <span className="text-muted ml-1">({studio.reviewCount} {t[lang].reviews})</span>
                  </div>
                  <div className="flex items-center text-muted">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{studio.city}</span>
                  </div>
                  <div className="flex items-center text-muted">
                    <Maximize className="h-4 w-4 mr-1" />
                    <span>{studio.roomSize} {t[lang].sqm}</span>
                  </div>
                </div>

                <p className="text-muted mb-4">{studio.address}</p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {t[lang].about}
                </h2>
                <p className="text-muted">{studio.description}</p>
              </div>

              {/* Equipment */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {t[lang].equipment}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {studio.equipment.map((item) => (
                    <Badge key={item} variant="secondary" className="py-1 px-3">
                      <Music className="h-3 w-3 mr-2" />
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-surface-light rounded-lg">
                      <p className="text-muted text-sm mb-1">{t[lang].hourly}</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatPrice(studio.hourlyRate)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-surface-light rounded-lg">
                      <p className="text-muted text-sm mb-1">{t[lang].daily}</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatPrice(studio.dailyRate)}
                      </p>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    {t[lang].contact}
                  </Button>
                </CardContent>
              </Card>

              {/* Booking Calendar Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="h-5 w-5 mr-2" />
                    {t[lang].availability}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-foreground"
                    />

                    {selectedDate && (
                      <>
                        <p className="text-sm text-muted">
                          {lang === "en" ? "Available time slots:" : "Musait saatler:"}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {time}
                            </Button>
                          ))}
                        </div>
                        <Button className="w-full" size="lg">
                          {t[lang].bookNow}
                        </Button>
                      </>
                    )}
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
