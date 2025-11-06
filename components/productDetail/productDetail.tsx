"use client";

import { Product } from "@/app/interfaces";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

import { Button } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

// Import SweetAlert2
import Swal from "sweetalert2";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useCart();
  const router = useRouter();
  const { id, name, price, image, description } = product;

  const isOnCart = cart?.some((item) => item.id === id);

  const handleAddToCart = async () => {
    if (user?.login) {
      // Reemplazamos confirm por Swal
      const result = await Swal.fire({
        title: '¿Deseas agregar este producto al carrito?',
        text: name,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        const newItem = { id, name, price, quantity: 1, image };

        if (Array.isArray(cart)) {
          setCart([...cart, newItem]);
        } else {
          setCart([newItem]);
        }

        // Reemplazamos alert por Swal
        Swal.fire({
          title: '¡Producto agregado!',
          text: `${name} se ha añadido a tu carrito`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } else {
      // Usuario no logueado
      Swal.fire({
        title: 'Inicia sesión',
        text: 'Por favor inicia sesión para agregar productos al carrito',
        icon: 'warning',
        confirmButtonText: 'Ir a login',
      }).then(() => {
        router.push("/login");
      });
    }
  };

  return (
    <article className="backdrop-blur-md bg-white/30 dark:bg-black/30 text-black dark:text-white rounded-3xl shadow-xl p-6 mt-12 mb-12 max-w-6xl mx-auto border border-black/20 dark:border-white/20 transition-colors">
      <h1 className="text-4xl font-bold mb-6 tracking-tight">{name}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={image}
          alt={name}
          className="w-full lg:w-1/2 rounded-2xl shadow-md object-cover border border-gray-300 dark:border-gray-700"
        />
        <div className="flex flex-col justify-between lg:w-1/2 min-h-[400px]">
          <div>
            <p className="text-lg font-semibold text-black dark:text-gray-300 mb-2">
              Descripción:
            </p>
            <p className="text-base text-black dark:text-gray-400">
              {description}
            </p>
          </div>

          <div className="mt-auto pt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">
              Precio: <span className="text-black dark:text-white">u$s {price}</span>
            </p>

            <Button
              variant="contained"
              onClick={isOnCart ? () => router.push("/cart") : handleAddToCart}
              startIcon={<ShoppingCartRoundedIcon />}
              sx={{
                backgroundColor: isOnCart ? "#000" : "#fff",
                color: isOnCart ? "#fff" : "#000",
                border: "1px solid #000",
                "&:hover": {
                  backgroundColor: isOnCart ? "#111" : "#f5f5f5",
                },
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "12px",
                px: 2,
                py: 1.5,
              }}
            >
              {isOnCart ? "Ir al carrito" : "Añadir al carrito"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetail;