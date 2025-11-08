"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface AddToCartToastProps {
  show: boolean;
  product: {
    name: string;
    image: string;
  } | null;
}

export default function AddToCartToast({ show, product }: AddToCartToastProps) {
  return (
    <AnimatePresence>
      {show && product && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-24 right-6 z-[9999] w-[320px] bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-2xl p-5 flex items-center gap-4"
        >
          <CheckCircle className="text-green-500 w-8 h-8 flex-shrink-0" />
          <div className="flex flex-col">
            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
              ¡Agregaste al carrito!
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {product.name}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}