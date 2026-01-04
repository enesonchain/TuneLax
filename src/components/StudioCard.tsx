"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { Studio } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";

interface StudioCardProps {
  studio: Studio;
  lang: "en" | "tr";
}

export function StudioCard({ studio, lang }: StudioCardProps) {
  const t = {
    en: {
      hourly: "/ hour",
      daily: "/ day",
      sqm: "sqm",
    },
    tr: {
      hourly: "/ saat",
      daily: "/ gun",
      sqm: "m2",
    },
  };

  return (
    <Link href={`/studios/${studio.id}`}>
      <Card className="overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer h-full">
        <div className="relative h-48 w-full">
          <Image
            src={studio.images[0]}
            alt={studio.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-lg">
            <span className="text-foreground font-bold">
              {formatPrice(studio.hourlyRate)}
            </span>
            <span className="text-muted text-sm">{t[lang].hourly}</span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {studio.name}
          </h3>
          <div className="flex items-center text-muted text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{studio.city}</span>
            <span className="mx-2">•</span>
            <span>
              {studio.roomSize} {t[lang].sqm}
            </span>
          </div>
          <div className="flex items-center text-sm mb-3">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-foreground font-medium">{studio.rating}</span>
            <span className="text-muted ml-1">({studio.reviewCount})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {studio.equipment.slice(0, 2).map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
            {studio.equipment.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{studio.equipment.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
