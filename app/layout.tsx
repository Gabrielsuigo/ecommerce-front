import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apple store",
  description: "Henry",
  icons: "/apple-logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    
    <AuthProvider>
      <html lang="es">
        <body className="flex flex-col min-h-screen bg-white text-black transition-colors duration-300 font-sans">
          <CartProvider>
            <Navbar />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-6">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </body>
      </html>
    </AuthProvider>
  );
}