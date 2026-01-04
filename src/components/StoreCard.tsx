"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, CheckCircle } from "lucide-react";
import { OfficialStore } from "@/data/mockData";

interface StoreCardProps {
  store: OfficialStore;
  lang: "en" | "tr";
}

export function StoreCard({ store, lang }: StoreCardProps) {
  return (
    <Link href={`/stores/${store.id}`}>
      <Card className="overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer h-full">
        <div className="relative h-48 w-full">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
          />
          {store.isVerified && (
            <div className="absolute top-3 right-3">
              <Badge variant="verified" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {lang === "en" ? "Verified" : "Onaylanmis"}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {store.name}
          </h3>
          <div className="flex items-center text-muted text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{store.city}</span>
          </div>
          <div className="flex items-center text-sm mb-3">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-foreground font-medium">{store.rating}</span>
            <span className="text-muted ml-1">({store.reviewCount})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {store.brands.slice(0, 3).map((brand) => (
              <Badge key={brand} variant="secondary" className="text-xs">
                {brand}
              </Badge>
            ))}
            {store.brands.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{store.brands.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
