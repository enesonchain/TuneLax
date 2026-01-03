# TuneLax - Project Specification

## Overview

**Project Name:** TuneLax  
**Description:** A music marketplace platform for buying official gear, trading second-hand instruments, and finding studio rentals.  
**Target Audience:** Hobbyist musicians, professionals, and studio owners  
**Initial Region:** Turkey (Istanbul & Bursa only)  
**Languages:** Turkish & English (with toggle)

---

## Core Features (All MVP)

### 1. Official Store Listings
- Official music gear stores can self-register (no admin approval required)
- Store owners receive a **verified badge** upon registration
- Store profile includes:
  - Store name
  - Address
  - Phone number
  - Website URL
  - Instagram handle
  - Brands they carry
  - Product catalog
- Users can browse and purchase products directly on TuneLax
- Purchases handled through TuneLax (mock payment system)

### 2. Second-Hand Marketplace
- Peer-to-peer buying and selling of music gear
- **Categories:** All music equipment (guitars, drums, keyboards, DJ gear, recording equipment, accessories, etc.)
- Listing includes:
  - Title
  - Description
  - Photos (multiple)
  - Price (fixed, in ₺)
  - Condition
  - Location (Istanbul or Bursa)
- **Pricing System:**
  - Seller sets a fixed price
  - Buyers can submit bids if they want a different price
  - Seller can accept bid or send counter-offer
  - Negotiation continues until agreement or rejection
- **In-app messaging** between buyer and seller
- Payments handled through TuneLax (mock system)
- **0.5% transaction fee** on successful sales

### 3. Studio Rentals
- Studio owners can list their spaces for rent
- Listing includes:
  - Studio name
  - Location (address, city)
  - Photos (multiple)
  - Hourly rate (₺)
  - Daily rate (₺)
  - Available equipment
  - Room size
- **Built-in booking system** with calendar availability
- Users book directly through the platform
- **Payment:** Users pay the studio directly (not through TuneLax)
- No deposit required
- No cancellation policy for MVP

---

## User System

### Account Type
- **Single unified account type** - one account can:
  - Browse and buy from official stores
  - Buy and sell on second-hand marketplace
  - Book studios
  - List a studio for rent
  - Register as an official store

### Authentication
- Email/password signup
- Google OAuth login
- No phone verification for MVP

### User Profile
- Name
- City (Istanbul or Bursa)
- Ratings and reviews (from transactions)
- Listing history (items sold/bought)
- Favorites/wishlist

### Verified Badge System
- Only for official store owners and sellers
- Displayed on their profile and listings
- Granted by admin through admin panel

---

## Search & Discovery

### Global Search
- Single search bar searches across all three sections (stores, marketplace, studios)
- Keyword-based search

### Filters

**Marketplace Filters:**
- Category (guitars, drums, keyboards, etc.)
- Price range
- Condition (new, like new, good, fair)
- City (Istanbul / Bursa)

**Studio Filters:**
- Price range (hourly/daily)
- City (Istanbul / Bursa)
- Available equipment
- Room size

**Official Store Filters:**
- City (Istanbul / Bursa)
- Brand
- Product category

### Sorting Options
- Price: Low to High
- Price: High to Low
- Newest first
- Most popular
- Highest rated

---

## Homepage & Navigation

### Homepage Design
- **Hero Section:** Minimal design with TuneLax logo centered, nothing else
- **On Scroll:** Content sections reveal:
  - Featured official stores
  - Latest marketplace listings
  - Popular studios
- Clean, modern, minimal aesthetic

### Navigation
- Main sections: Official Stores, Marketplace, Studios
- User menu: Profile, My Listings, Messages, Favorites, Settings
- Language toggle (TR/EN)

---

## Transactions & Payments

### Payment System
- **Mock implementation** for MVP (no real payment APIs)
- Simulated checkout flow
- Currency: **Turkish Lira (₺) only**

### Marketplace Transactions
- TuneLax handles the payment flow (mock)
- **0.5% transaction fee** deducted from seller
- Escrow-style flow (mock): payment held until delivery confirmed

### Official Store Purchases
- Checkout through TuneLax (mock)
- Order confirmation and tracking (simulated)

### Studio Bookings
- Users pay studios directly (outside platform)
- TuneLax only facilitates the booking
- No deposits, no cancellation policy

---

## Messaging System

### In-App Messaging
- Direct messages between buyers and sellers
- Conversation threads per listing
- Real-time updates (or polling for MVP)
- Message notifications

### Message Features
- Text messages
- Attach images (optional for MVP)
- Bid/counter-offer integration in conversation

---

## Notifications

### In-App Notifications
- New message received
- Bid received on your listing
- Bid accepted/countered
- Booking confirmed (for studios)
- Order status updates

---

## Admin Panel

### Dashboard
- Overview statistics (users, listings, transactions, bookings)

### User Management
- View all registered users
- View user profiles and activity
- Suspend/ban users if needed

### Listing Management
- View all marketplace listings
- View all studio listings
- View all official stores
- Remove inappropriate listings

### Transaction Management
- View all transactions
- Transaction history and details
- Fee tracking

### Verified Badge Management
- Grant verified badges to official stores/sellers
- Revoke badges if necessary

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Internationalization:** next-intl (Turkish/English)

### Backend
- **API:** Next.js API Routes (App Router)
- **ORM:** Prisma
- **Database:** PostgreSQL

### Authentication
- **Library:** NextAuth.js
- **Providers:** Credentials (email/password) + Google OAuth

### Real-time Features
- **Messaging:** Pusher (or mock with polling for MVP)

### File Storage
- **Images:** Cloudinary (or local/mock for MVP)

### Hosting
- **Platform:** Vercel

---

## Design System

### Theme
- **Mode:** Dark mode (default and only mode)
- **Style:** Modern, minimal, clean

### Color Palette (Suggested)
- **Background:** Deep dark (#0a0a0a or similar)
- **Surface:** Slightly lighter dark (#1a1a1a)
- **Primary:** Accent color (purple, blue, or green - TBD)
- **Text:** White/light gray
- **Muted:** Gray tones for secondary text

### Typography
- Clean sans-serif font (Inter, Geist, or similar)
- Clear hierarchy for headings and body text

### Components
- Rounded corners (modern feel)
- Subtle shadows and borders
- Smooth hover/focus states
- Consistent spacing

---

## Database Schema (High-Level)

### Users
- id, email, password (hashed), name, city, avatar, role, isVerified, createdAt

### OfficialStores
- id, userId, name, address, phone, website, instagram, city, isVerified, createdAt

### StoreProducts
- id, storeId, name, description, price, category, brand, images, stock, createdAt

### MarketplaceListings
- id, userId, title, description, price, condition, category, city, images, status, createdAt

### Bids
- id, listingId, bidderId, amount, status (pending/accepted/rejected/countered), counterAmount, createdAt

### Studios
- id, userId, name, address, city, description, hourlyRate, dailyRate, equipment, roomSize, images, createdAt

### StudioBookings
- id, studioId, userId, date, startTime, endTime, status, createdAt

### Messages
- id, senderId, receiverId, listingId (optional), content, createdAt, readAt

### Reviews
- id, reviewerId, revieweeId, listingId/studioId/storeId, rating, comment, createdAt

### Favorites
- id, userId, listingId/studioId/storeId, createdAt

### Notifications
- id, userId, type, message, data (JSON), readAt, createdAt

### Transactions
- id, buyerId, sellerId, listingId/productId, amount, fee, status, createdAt

---

## Pages & Routes

### Public Pages
- `/` - Homepage
- `/stores` - Official stores listing
- `/stores/[id]` - Store detail page
- `/marketplace` - Second-hand marketplace
- `/marketplace/[id]` - Listing detail page
- `/studios` - Studio rentals
- `/studios/[id]` - Studio detail page
- `/search` - Search results

### Auth Pages
- `/login` - Login page
- `/register` - Registration page

### User Pages (Protected)
- `/profile` - User profile
- `/profile/edit` - Edit profile
- `/my-listings` - User's marketplace listings
- `/my-studio` - User's studio (if they have one)
- `/my-store` - User's store (if they have one)
- `/messages` - Messaging inbox
- `/messages/[conversationId]` - Conversation thread
- `/favorites` - Saved items
- `/notifications` - Notification center
- `/settings` - Account settings

### Action Pages (Protected)
- `/marketplace/new` - Create marketplace listing
- `/studios/new` - List a studio
- `/stores/register` - Register as official store
- `/stores/[id]/products/new` - Add product to store

### Admin Pages (Protected, Admin Only)
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/listings` - Listing management
- `/admin/studios` - Studio management
- `/admin/stores` - Store management
- `/admin/transactions` - Transaction history
- `/admin/badges` - Verified badge management

---

## Future Considerations (Post-MVP)

These are noted for future development, not included in MVP:

- Seller analytics dashboard
- Native mobile app (iOS/Android)
- Expand to more cities in Turkey
- Real payment integration (Stripe, iyzico)
- Email notifications
- Advanced recommendation system
- Promoted/featured listings (monetization)
- Mobile push notifications

---

## MVP Scope Summary

### Included in MVP:
✅ Official store registration and product catalog  
✅ Second-hand marketplace with bidding system  
✅ Studio rentals with booking calendar  
✅ Single account system with profiles  
✅ Email/password + Google auth  
✅ Global search with filters and sorting  
✅ In-app messaging  
✅ In-app notifications  
✅ Favorites/wishlist  
✅ Ratings and reviews  
✅ Verified badges for stores  
✅ Admin panel  
✅ Dark mode, modern minimal design  
✅ Turkish + English language support  
✅ Mock payment system  
✅ Istanbul & Bursa only  

### Excluded from MVP:
❌ Real payment processing  
❌ Mobile app  
❌ Email notifications  
❌ Additional cities  
❌ Seller analytics  

---

## Getting Started

1. Initialize Next.js 14 project with App Router
2. Set up Tailwind CSS + shadcn/ui
3. Configure PostgreSQL + Prisma schema
4. Set up NextAuth.js with Google + credentials
5. Implement i18n with next-intl
6. Build core pages and components
7. Implement features incrementally
8. Deploy to Vercel

---

*This specification document is intended for use with Claude Code for development.*
