// Mock Data for TuneLax

export interface OfficialStore {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  instagram: string;
  city: "Istanbul" | "Bursa";
  isVerified: boolean;
  brands: string[];
  rating: number;
  reviewCount: number;
  image: string;
  products: StoreProduct[];
}

export interface StoreProduct {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  stock: number;
}

export interface MarketplaceListing {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  price: number;
  condition: "new" | "like-new" | "good" | "fair";
  category: string;
  city: "Istanbul" | "Bursa";
  images: string[];
  status: "active" | "sold" | "pending";
  createdAt: string;
  views: number;
}

export interface Studio {
  id: string;
  userId: string;
  name: string;
  address: string;
  city: "Istanbul" | "Bursa";
  description: string;
  hourlyRate: number;
  dailyRate: number;
  equipment: string[];
  roomSize: string;
  images: string[];
  rating: number;
  reviewCount: number;
}

// Mock Official Stores
export const officialStores: OfficialStore[] = [
  {
    id: "store-1",
    name: "Melodi Muzik",
    address: "Istiklal Cad. No:45, Beyoglu",
    phone: "+90 212 555 1234",
    website: "https://melodimuzik.com.tr",
    instagram: "@melodimuzik",
    city: "Istanbul",
    isVerified: true,
    brands: ["Fender", "Gibson", "Marshall", "Roland"],
    rating: 4.8,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    products: [
      {
        id: "prod-1",
        storeId: "store-1",
        name: "Fender Player Stratocaster",
        description: "Classic Fender tone with modern features. Alder body, maple neck.",
        price: 45000,
        category: "Guitars",
        brand: "Fender",
        image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800",
        stock: 5,
      },
      {
        id: "prod-2",
        storeId: "store-1",
        name: "Marshall JCM800 Head",
        description: "The legendary British amp head. 100W of pure rock tone.",
        price: 85000,
        category: "Amplifiers",
        brand: "Marshall",
        image: "https://images.unsplash.com/photo-1535587566541-97121a128dc5?w=800",
        stock: 2,
      },
    ],
  },
  {
    id: "store-2",
    name: "Ritim Dunyasi",
    address: "Kadikoy Moda Cad. No:78",
    phone: "+90 216 555 5678",
    website: "https://ritimdunyasi.com",
    instagram: "@ritimdunyasi",
    city: "Istanbul",
    isVerified: true,
    brands: ["Pearl", "Zildjian", "DW", "Vic Firth"],
    rating: 4.6,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800",
    products: [
      {
        id: "prod-3",
        storeId: "store-2",
        name: "Pearl Export EXX725",
        description: "5-piece drum kit perfect for gigging and recording.",
        price: 32000,
        category: "Drums",
        brand: "Pearl",
        image: "https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=800",
        stock: 3,
      },
    ],
  },
  {
    id: "store-3",
    name: "Nota Muzik Evi",
    address: "Cekirge Mah. Kultur Sok. No:12",
    phone: "+90 224 555 9012",
    website: "https://notamuzikevi.com",
    instagram: "@notamuzikevi",
    city: "Bursa",
    isVerified: true,
    brands: ["Yamaha", "Korg", "Nord", "Moog"],
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
    products: [
      {
        id: "prod-4",
        storeId: "store-3",
        name: "Yamaha MODX8",
        description: "88-key synthesizer with Motion Control and FM-X engine.",
        price: 68000,
        category: "Keyboards",
        brand: "Yamaha",
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800",
        stock: 4,
      },
    ],
  },
  {
    id: "store-4",
    name: "DJ Gear Pro",
    address: "Nisantasi Mah. Valikonaği Cad. No:33",
    phone: "+90 212 555 3456",
    website: "https://djgearpro.com.tr",
    instagram: "@djgearpro",
    city: "Istanbul",
    isVerified: true,
    brands: ["Pioneer DJ", "Native Instruments", "Technics", "Allen & Heath"],
    rating: 4.7,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800",
    products: [
      {
        id: "prod-5",
        storeId: "store-4",
        name: "Pioneer DJ CDJ-3000",
        description: "Professional DJ multi player with 9-inch touch screen.",
        price: 125000,
        category: "DJ Equipment",
        brand: "Pioneer DJ",
        image: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800",
        stock: 6,
      },
    ],
  },
];

// Mock Marketplace Listings
export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "listing-1",
    userId: "user-1",
    userName: "Ahmet K.",
    title: "Gibson Les Paul Standard 2019",
    description: "Selling my beloved Les Paul. Heritage Cherry Sunburst finish, excellent condition. Original case included. Reason for selling: upgrading to Custom Shop.",
    price: 95000,
    condition: "like-new",
    category: "Guitars",
    city: "Istanbul",
    images: [
      "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800",
      "https://images.unsplash.com/photo-1558098329-a11cff621064?w=800",
    ],
    status: "active",
    createdAt: "2025-12-28",
    views: 342,
  },
  {
    id: "listing-2",
    userId: "user-2",
    userName: "Elif D.",
    title: "Roland TD-17KVX Electronic Drum Kit",
    description: "Full mesh head electronic kit. Perfect for apartment practice. All original accessories and module. Light home use only.",
    price: 42000,
    condition: "good",
    category: "Drums",
    city: "Istanbul",
    images: [
      "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800",
    ],
    status: "active",
    createdAt: "2025-12-25",
    views: 189,
  },
  {
    id: "listing-3",
    userId: "user-3",
    userName: "Murat S.",
    title: "Fender Blues Junior IV",
    description: "15W tube combo amp. Warm vintage tones. Has been gigged but well maintained. Minor cosmetic wear on tolex.",
    price: 18500,
    condition: "good",
    category: "Amplifiers",
    city: "Bursa",
    images: [
      "https://images.unsplash.com/photo-1535587566541-97121a128dc5?w=800",
    ],
    status: "active",
    createdAt: "2025-12-30",
    views: 87,
  },
  {
    id: "listing-4",
    userId: "user-4",
    userName: "Zeynep A.",
    title: "Shure SM7B Microphone",
    description: "Industry standard dynamic mic for vocals and podcasting. Includes Cloudlifter CL-1. Perfect working condition.",
    price: 14000,
    condition: "like-new",
    category: "Recording",
    city: "Istanbul",
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800",
    ],
    status: "active",
    createdAt: "2026-01-02",
    views: 256,
  },
  {
    id: "listing-5",
    userId: "user-5",
    userName: "Can T.",
    title: "Native Instruments Maschine MK3",
    description: "Barely used production controller. Comes with Komplete Select software. Original box and all accessories.",
    price: 22000,
    condition: "like-new",
    category: "DJ Equipment",
    city: "Istanbul",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    ],
    status: "active",
    createdAt: "2026-01-01",
    views: 145,
  },
  {
    id: "listing-6",
    userId: "user-6",
    userName: "Deniz B.",
    title: "Korg Minilogue XD",
    description: "4-voice analog synthesizer with digital multi-engine. Excellent condition, no issues. Decksaver included.",
    price: 16500,
    condition: "good",
    category: "Keyboards",
    city: "Bursa",
    images: [
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800",
    ],
    status: "active",
    createdAt: "2025-12-29",
    views: 112,
  },
];

// Mock Studios
export const studios: Studio[] = [
  {
    id: "studio-1",
    userId: "user-10",
    name: "Soundwave Studios",
    address: "Levent Mah. Nispetiye Cad. No:56",
    city: "Istanbul",
    description: "Professional recording studio with SSL console, vintage outboard gear, and acoustically treated rooms. Perfect for album production, mixing, and mastering.",
    hourlyRate: 1500,
    dailyRate: 10000,
    equipment: ["SSL 4000 Console", "Neumann U87", "Pro Tools HDX", "Vintage compressors"],
    roomSize: "45 sqm",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800",
    ],
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: "studio-2",
    userId: "user-11",
    name: "Beat Factory",
    address: "Kadikoy Caferaga Mah. Moda Cad. No:23",
    city: "Istanbul",
    description: "Modern production studio focused on electronic music and hip-hop. Full Ableton setup, analog synths, and drum machines available.",
    hourlyRate: 800,
    dailyRate: 5500,
    equipment: ["Ableton Push 2", "Moog Sub 37", "TR-808", "Universal Audio interface"],
    roomSize: "25 sqm",
    images: [
      "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800",
    ],
    rating: 4.7,
    reviewCount: 43,
  },
  {
    id: "studio-3",
    userId: "user-12",
    name: "Groove Room",
    address: "Besiktas Sinanpasa Mah. Ortabahce Cad. No:8",
    city: "Istanbul",
    description: "Fully equipped rehearsal space for bands. Backline provided including drums, amps, and PA system. Air conditioned and soundproofed.",
    hourlyRate: 400,
    dailyRate: 2500,
    equipment: ["Pearl drum kit", "Marshall & Fender amps", "Shure mics", "16-channel PA"],
    roomSize: "60 sqm",
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    ],
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "studio-4",
    userId: "user-13",
    name: "Bursa Sound Lab",
    address: "Nilufer Mah. Kultur Sok. No:15",
    city: "Bursa",
    description: "Bursa's premier recording facility. Great for vocalists and singer-songwriters. Comfortable atmosphere with top-notch equipment.",
    hourlyRate: 600,
    dailyRate: 4000,
    equipment: ["Focusrite Red interface", "AKG C414", "Yamaha grand piano", "Logic Pro X"],
    roomSize: "35 sqm",
    images: [
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800",
    ],
    rating: 4.8,
    reviewCount: 52,
  },
];

// Categories for filtering
export const categories = [
  "Guitars",
  "Drums",
  "Keyboards",
  "Amplifiers",
  "DJ Equipment",
  "Recording",
  "Accessories",
  "Wind Instruments",
  "String Instruments",
];

export const conditions = [
  { value: "new", label: "New", labelTr: "Sifir" },
  { value: "like-new", label: "Like New", labelTr: "Sifir Gibi" },
  { value: "good", label: "Good", labelTr: "Iyi" },
  { value: "fair", label: "Fair", labelTr: "Orta" },
];

export const cities = ["Istanbul", "Bursa"] as const;
