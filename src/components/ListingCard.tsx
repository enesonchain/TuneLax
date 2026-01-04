"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Eye, Clock } from "lucide-react";
import { MarketplaceListing, conditions } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";

interface ListingCardProps {
  listing: MarketplaceListing;
  lang: "en" | "tr";
}

export function ListingCard({ listing, lang }: ListingCardProps) {
  const condition = conditions.find((c) => c.value === listing.condition);
  const conditionLabel = lang === "en" ? condition?.label : condition?.labelTr;

  const conditionVariant = {
    new: "success",
    "like-new": "success",
    good: "warning",
    fair: "outline",
  }[listing.condition] as "success" | "warning" | "outline";

  return (
    <Link href={`/marketplace/${listing.id}`}>
      <Card className="overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer h-full">
        <div className="relative h-48 w-full">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={conditionVariant}>{conditionLabel}</Badge>
          </div>
          <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-foreground font-bold">
              {formatPrice(listing.price)}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {listing.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted mb-2">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{listing.city}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>{listing.views}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {listing.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{listing.userName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
