# LuxeSpace — Premium Smart Gadgets & Designer Furniture Marketplace

LuxeSpace is a premium, visual-first e-commerce and catalog web application built using **Next.js (App Router)**, **Vanilla CSS** (focusing on HSL color systems, dark mode vibes, and glassmorphism), and **Firebase Authentication**.

The application showcases a collection of high-end design items and smart devices, allowing users to browse, search, filter, and dynamically view item specifications. Authenticated users gain access to protected routes to publish and manage items.

**Live Demo URL**: [https://luxespace-75a4c.web.app](https://luxespace-75a4c.web.app)

---

## 🌟 Key Features

### 1. Interactive Landing Page (`/`)
- **Responsive Sticky Navbar**: Interactive navigation with links, logo, and active responsive states. When logged in, it displays a custom user profile dropdown to access dashboard operations (Add Item, Manage Items) and Sign Out.
- **Hero Banner**: Eye-catching gradients, modern typography, and a prominent call-to-action (CTA).
- **Features / Value Grid**: 4 key feature highlights (Secure Checkout, Premium Curation, Global Shipping, 24/7 Support).
- **Trending Products**: Selected interactive items directing users to details.
- **Interactive Stats Banner**: Visual counts of users and products.
- **Testimonials Showcase**: Premium user quotes and ratings.

### 2. Search & Filter Directory (`/items`)
- **Real-time Search**: Search by name or description.
- **Dual-field Filtering**:
  - **Category Filter**: Filter items by categories (All, Smart Wearables, Sound & Audio, Minimalist Furniture, Ambient Lighting).
  - **Price Range Filter**: Interactive slider to narrow down by price.
- **Responsive Grid**: Displays products in uniform cards with rich hover effects and a CTA button.

### 3. Dynamic Details Route (`/items/[id]`)
- Fully dynamic Next.js route retrieving item details by ID.
- Displays high-resolution imagery, pricing, and category.
- Detailed specifications table.
- **Related Products Section**: Shows matching items in the same category.
- Inline "Back to Items" navigation.

### 4. Interactive About Page (`/about`)
- Overview of LuxeSpace's vision, philosophy, and interactive timeline.

### 5. Firebase Authentication
- Fully integrated Email & Password registration and sign-in.
- **Google Sign-In**: Interactive popup authentication.
- Global Context (`AuthContext`) handling session states and route guards.
- Redirection logic to `/` upon successful authentication.

### 6. Protected Add Product Route (`/items/add`)
- Only accessible when logged in (redirects anonymous users to `/login`).
- Includes a validated, structured form to input: Title, Short Description, Full Description, Price, Category, and Image URL.
- Local Storage persistence to store and append user-defined items.

### 7. Protected Manage Products Route (`/items/manage`)
- Accessible only to authenticated users.
- Renders all products in a table structure.
- Action actions to:
  - **View Details**: Redirects to product route.
  - **Delete Item**: Removes item from storage instantly.

---

## 🛣️ Route Summary

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page with 7 core marketing sections. |
| `/about` | Public | Brand story, philosophy, and features. |
| `/items` | Public | Filterable and searchable product directory. |
| `/items/[id]` | Public | Dynamic product specifications and related items. |
| `/login` | Public | Sign in using Email/Password or Google. |
| `/register` | Public | Register new account. |
| `/items/add` | **Protected** | Form to create and persist new products. |
| `/items/manage` | **Protected** | Dashboard table to view or delete items. |

---

## 🛠️ Setup & Installation

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/moinul5/LuxeSpace-.git
cd LuxeSpace-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root folder and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```
