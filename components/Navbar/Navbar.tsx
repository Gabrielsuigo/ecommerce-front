"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

import { Product } from "@/app/interfaces";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

import UserWidget from "../UserWidget/UserWidget";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { user } = useAuth();
  const { cart } = useCart();

  // Fetch dinámico con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const search = async () => {
        if (searchTerm.trim().length >= 2) {
          try{
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/products?name=${searchTerm}`
            );
            if (res.ok) {
              const data = await res.json();
              setFilteredProducts(data);
              setShowResults(true);
            } else {
              setFilteredProducts([]);
              setShowResults(false);
            }
          } catch (error) {
            console.error("Error buscando productos:", error);
            setFilteredProducts([]);
            setShowResults(false);
          }
        } else {
          setFilteredProducts([]);
          setShowResults(false);
        }
      };

      search();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = () => {
    setSearchTerm("");
    setFilteredProducts([]);
    setShowResults(false);
  };

  return (
    <>
      <nav className="bg-white dark:bg-black text-black dark:text-white py-4 shadow-md border-b border-neutral-200 dark:border-neutral-800 rounded-none z-50 relative">
        <div className="container flex justify-between items-center mx-auto px-6">
          <Link
            href="/"
            className="flex items-center hover:scale-105 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-10 h-8 fill-black dark:fill-white"
            >
              <path d="M318.7 268.1c-.3-45.5 37.1-67.3 38.7-68.3-21.1-30.9-53.8-35.1-65.4-35.6-27.8-2.8-54.4 16.4-68.5 16.4-14.2 0-36.3-16-59.7-15.6-30.7.4-59 17.8-74.8 45.3-32.1 55.7-8.2 138.3 22.9 183.5 15.2 22.1 33.3 46.9 57.1 46 22.6-.9 31.2-14.7 58.4-14.7s35 14.7 59.1 14.3c24.4-.4 39.9-22.5 54.9-44.9 17.3-25.2 24.4-49.6 24.7-50.9-.5-.2-47.1-18-47.4-71.5zM256.5 91.7c12.3-15 20.6-35.8 18.3-56.7-17.7.7-39.2 11.8-51.8 26.8-11.4 13.2-21.4 34.5-18.7 54.8 19.7 1.5 39.9-10 52.2-24.9z" />
            </svg>
          </Link>

          <SearchBar value={searchTerm} onChange={handleSearchChange} />

          <div className="flex items-center gap-4">
            {user && cart && (
              <Link href="/cart" className="relative group">
                <ShoppingCart className="w-6 h-6 text-black dark:text-white transition" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            <UserWidget /> 
          </div>
        </div>
      </nav>

      {/* Resultados en overlay */}

      {showResults && filteredProducts.length > 0 && (
        <SearchResults products={filteredProducts} onClick={handleProductClick} />
        )}
        </>
        
  );
};

export default Navbar;