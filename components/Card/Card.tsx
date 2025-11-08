"use client";

import { Product } from "@/app/interfaces";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import AddToCartToast from "@/components/UI/AddToCartToast";
import { useState } from "react";

interface CardProps extends Product {}

const Card = ({ name, image, price, id, ...rest }: CardProps) => {
  const { cart, addToCart } = useCart();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState<{
    name: string;
    image: string;
  } | null>(null);

  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleCartClick = () => {
    const product = { id, image, name, price, quantity: 1, ...rest };

    // 1️⃣ Animación tipo Mercado Libre
    const cartIcon = document.getElementById("navbar-cart-icon");
    const productImg = document.querySelector(`img[data-id='${id}']`);

    if (cartIcon && productImg) {
      const imgClone = productImg.cloneNode(true) as HTMLElement;
      const imgRect = productImg.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      imgClone.style.position = "fixed";
      imgClone.style.zIndex = "9999";
      imgClone.style.top = `${imgRect.top}px`;
      imgClone.style.left = `${imgRect.left}px`;
      imgClone.style.width = `${imgRect.width}px`;
      imgClone.style.height = `${imgRect.height}px`;
      imgClone.style.borderRadius = "16px";
      imgClone.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
      document.body.appendChild(imgClone);

      // movimiento hacia el carrito
      requestAnimationFrame(() => {
        imgClone.style.top = `${cartRect.top + cartRect.height / 2 - 20}px`;
        imgClone.style.left = `${cartRect.left + cartRect.width / 2 - 20}px`;
        imgClone.style.width = "40px";
        imgClone.style.height = "40px";
        imgClone.style.opacity = "0.4";
      });

      // remover el clon
      setTimeout(() => imgClone.remove(), 900);

      // ✨ rebote del carrito
      setTimeout(() => {
        cartIcon.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.3)" },
            { transform: "scale(1)" },
          ],
          { duration: 400, easing: "ease-out" }
        );
      }, 700);
    }

    // 2️⃣ Lógica normal de agregar al carrito
    if (cartItem) return router.push("/cart");
    addToCart(product);

    // 3️⃣ Mostrar toast lateral ✅
    setAddedProduct({ name, image });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <article className="group relative w-[380px] bg-gradient-to-b from-[#f7f7f8] to-[#ebebeb] dark:from-[#1c1c1c] dark:to-[#121212] border border-neutral-300 dark:border-neutral-800 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-1 p-6 overflow-hidden">
      {/* Nombre */}
      <h3 className="text-xl font-semibold mb-3 tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition">
        {name}
      </h3>

      {/* Línea divisora */}
      <div className="w-full h-[1px] bg-gray-300/60 dark:bg-gray-700/60 mb-5"></div>

      {/* Imagen con zoom y sombra dinámica */}
      <div className="relative overflow-hidden rounded-[1.5rem] mb-5">
        <img
          data-id={id}
          alt={name}
          src={image}
          className="w-full h-56 object-cover rounded-lg mb-4 pointer-events-none"
        />
        {/* efecto de brillo suave al hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
      </div>

      {/* Precio */}
      <p className="text-lg font-medium mb-6 text-gray-900 dark:text-gray-200">
        <span className="text-gray-600 dark:text-gray-400 text-sm mr-1">
          Precio:
        </span>
        u$s {price}
      </p>

      {/* Botones */}
      <div className="flex justify-between items-center">
        <Link href={`/products/${id}`}>
          <button className="px-4 py-2 border border-gray-800 dark:border-gray-100 rounded-xl text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
            Ver más
          </button>
        </Link>

        <div className="relative">
          <button
            onClick={() => {
              // Agregar al carrito o ir al carrito
              handleCartClick();

              // Animación visual
              const cart = document.getElementById("cart-icon");
              if (cart) {
                cart.classList.remove("animate-bump");
                void cart.offsetWidth;
                cart.classList.add("animate-bump");
              }

              // Efecto visual de “pop” (círculo brillante)
              const ripple = document.createElement("span");
              ripple.className = "cart-ripple";
              if (cart?.parentElement) {
                cart.parentElement.appendChild(ripple);
              }
              setTimeout(() => ripple.remove(), 600);
            }}
            className="relative p-2 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            aria-label="Agregar al carrito"
          >
            <ShoppingCart className="w-7 h-7" />
          </button>

          {quantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
              {quantity}
            </span>
          )}
        </div>
      </div>
      <AddToCartToast show={showToast} product={addedProduct} />
    </article>
  );
};

export default Card;