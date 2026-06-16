import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "LuxeSpace — Premium Smart Living & Gadget Marketplace",
  description: "Explore curated high-end smart gadgets and designer furniture. Premium catalog experience.",
  keywords: "smart gadgets, designer furniture, minimalist home, luxury marketplace",
  openGraph: {
    title: "LuxeSpace — Premium Smart Living & Gadget Marketplace",
    description: "Explore curated high-end smart gadgets and designer furniture.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
