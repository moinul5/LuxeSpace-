const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    title: "Aether Sound Pro",
    shortDesc: "Audiophile-grade wireless headphones with hybrid active noise cancellation.",
    fullDesc: "Immerse yourself in pure sound with the Aether Sound Pro. Featuring precision-engineered 40mm dynamic drivers, hybrid active noise cancellation, and a sleek, premium carbon fiber and leather frame. Designed for audiophiles who demand exceptional clarity, comfort, and modern aesthetics during long listening sessions.",
    price: 349,
    category: "Audio & Sound",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    specs: [
      { label: "Driver Size", value: "40mm Dynamic" },
      { label: "Battery Life", value: "Up to 45 Hours" },
      { label: "Connectivity", value: "Bluetooth 5.3 & Ultra-wideband" },
      { label: "Noise Cancellation", value: "Hybrid Active (up to 42dB)" },
      { label: "Weight", value: "250g" }
    ],
    createdAt: "2026-06-10T10:00:00Z",
    authorId: "admin"
  },
  {
    id: "prod-2",
    title: "Halo Smart Ring",
    shortDesc: "Ultra-lightweight titanium ring tracking sleep, activity, and heart rate.",
    fullDesc: "The Halo Smart Ring packs advanced biosensors into a sleek, ultra-thin medical-grade titanium band. Track your sleep stages, heart rate variability, body temperature, and daily activities without the bulk of a smartwatch. Seamlessly syncs with your mobile devices to provide actionable wellness insights.",
    price: 269,
    category: "Smart Wearables",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    specs: [
      { label: "Material", value: "Medical-grade Titanium" },
      { label: "Water Resistance", value: "IP68 (up to 50m)" },
      { label: "Sensors", value: "PPG, Infrared, Accelerometer, Temp" },
      { label: "Battery Life", value: "Up to 7 Days" },
      { label: "Thickness", value: "2.5mm" }
    ],
    createdAt: "2026-06-11T12:00:00Z",
    authorId: "admin"
  },
  {
    id: "prod-3",
    title: "Walnut Ascent Desk",
    shortDesc: "Ergonomic motorized standing desk crafted from solid American walnut.",
    fullDesc: "Elevate your work experience with the Walnut Ascent standing desk. Featuring a single-slab solid American walnut top, dual high-torque whisper-quiet electric motors, and a digital memory controller with 4 presets. This desk merges organic natural beauty with state-of-the-art office ergonomics.",
    price: 899,
    category: "Minimalist Workspace",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
    specs: [
      { label: "Wood Source", value: "Certified American Walnut" },
      { label: "Height Range", value: "62cm to 128cm" },
      { label: "Weight Capacity", value: "120kg" },
      { label: "Motor Type", value: "Dual Motor / Whisper-Quiet" },
      { label: "Controls", value: "Digital LED Touch Panel" }
    ],
    createdAt: "2026-06-12T14:30:00Z",
    authorId: "admin"
  },
  {
    id: "prod-4",
    title: "Iris Glow Aura",
    shortDesc: "Ambient smart light sculpture with customizable kinetic gradients.",
    fullDesc: "Transform your living environment with the Iris Glow Aura. This kinetic light sculpture emits soothing, diffuse color gradients inspired by natural phenomena like auroras and sunsets. Control the speed, color patterns, and intensity through your smartphone or touch gestures, creating the perfect relaxation atmosphere.",
    price: 189,
    category: "Ambient Lighting",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    specs: [
      { label: "Brightness", value: "850 Lumens" },
      { label: "Color Spectrum", value: "16.8 Million Colors" },
      { label: "Smart Integrations", value: "HomeKit, Alexa, Google Home" },
      { label: "Power Source", value: "USB-C Powered" },
      { label: "Material", value: "Anodized Aluminum & Acrylic" }
    ],
    createdAt: "2026-06-13T09:15:00Z",
    authorId: "admin"
  },
  {
    id: "prod-5",
    title: "Keystone mechanical keyboard",
    shortDesc: "Hot-swappable custom mechanical keyboard with walnut casing and brass plate.",
    fullDesc: "The Keystone combines the tactile satisfaction of typing on a custom mechanical keyboard with the elegant luxury of a solid walnut hardwood case. Equipped with pre-lubed linear switches, custom doubleshot PBT keycaps, and a dense brass switch plate for an acoustic profile that is deep and satisfying.",
    price: 249,
    category: "Minimalist Workspace",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    specs: [
      { label: "Layout", value: "75% ANSI layout" },
      { label: "Switches", value: "Linear Jade switches (Hot-Swappable)" },
      { label: "Case Material", value: "Solid Black Walnut Wood" },
      { label: "Backlight", value: "RGB South-facing LEDs" },
      { label: "Connectivity", value: "USB-C, Bluetooth 5.1, 2.4Ghz" }
    ],
    createdAt: "2026-06-14T11:00:00Z",
    authorId: "admin"
  },
  {
    id: "prod-6",
    title: "Vivid Sound Capsule",
    shortDesc: "High-fidelity 360-degree wireless speaker with integrated ambient sub-light.",
    fullDesc: "Fill any room with rich, high-fidelity sound using the Vivid Sound Capsule. Its omnidirectional audio layout projects crisp highs and deep bass evenly in all directions. Surrounded by a custom glass tube with a warm, pulsing vacuum-tube style ambient glow, it sounds as good as it looks.",
    price: 429,
    category: "Audio & Sound",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
    specs: [
      { label: "Frequency Range", value: "40Hz - 22kHz" },
      { label: "Speaker Configuration", value: "2x Tweeters, 1x Active Subwoofer" },
      { label: "Amplifier", value: "Class-D 60W RMS" },
      { label: "Connectivity", value: "Wi-Fi (AirPlay 2, Spotify Connect) & Bluetooth" },
      { label: "Dimensions", value: "14cm Diameter, 26cm Height" }
    ],
    createdAt: "2026-06-15T15:20:00Z",
    authorId: "admin"
  }
];

const STORAGE_KEY = "luxespace_products";

const isBrowser = () => typeof window !== "undefined";

export const getProducts = () => {
  if (!isBrowser()) return INITIAL_PRODUCTS;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse products from storage", e);
    return INITIAL_PRODUCTS;
  }
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p.id === id) || null;
};

export const addProduct = (productData) => {
  if (!isBrowser()) return null;
  
  const products = getProducts();
  const newProduct = {
    ...productData,
    id: `prod-${Date.now()}`,
    rating: 5.0, // Default rating for new items
    createdAt: new Date().toISOString()
  };
  
  const updatedProducts = [newProduct, ...products];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  return newProduct;
};

export const deleteProduct = (id) => {
  if (!isBrowser()) return false;
  
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  
  if (filtered.length === products.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

export const getRelatedProducts = (productId, category, limit = 3) => {
  const products = getProducts();
  return products
    .filter(p => p.category === category && p.id !== productId)
    .slice(0, limit);
};
