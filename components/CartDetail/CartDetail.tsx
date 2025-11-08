"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { postOrders } from "@/service/orders";
import { useState } from "react";
import Swal from "sweetalert2";

const CartDetail = () => {
  const { user, orders, setOrders } = useAuth();
  const { cart, emptyCart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [loading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    setIsLoading(true);
    const res = await postOrders(user?.user.id || 0, user?.token || "", cart);

    if (res.status === "approved") {
      const newOrder = {
        id: parseInt(res.id),
        products: cart,
        total: total,
        status: res.status || "approved",
        createdAt: new Date().toISOString(),
      };
      setOrders([...orders, newOrder]);

      const fullOrderData = {
        user: {
          id: user?.user,
          name: user?.user.name,
          email: user?.user.email,
        },
        products: cart,
        total: total,
        orderId: parseInt(res.id),
        date: new Date().toISOString(),
      };

      localStorage.setItem(
        `compra-${user?.user.id}-${res.id}`,
        JSON.stringify(fullOrderData)
      );

      const prevOrders = JSON.parse(
        localStorage.getItem(`orders-${user?.user.id}`) || "[]"
      );
      localStorage.setItem(
        `orders-${user?.user.id}`,
        JSON.stringify([...prevOrders, newOrder])
      );

      Swal.fire({
        title: "Pedido realizado ✅",
        text: `ID de orden: ${res.id}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      emptyCart();
    } else {
      Swal.fire({
        title: "Error",
        text: "Error al procesar la orden",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

    setIsLoading(false);
  };

  const handleRemove = (id: number, name: string) => {
    Swal.fire({
      title: `¿Eliminar ${name}?`,
      text: "No podrás deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        Swal.fire({
          title: "Eliminado",
          text: `${name} fue eliminado del carrito`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-20 px-8 py-10 bg-white dark:bg-black/40 backdrop-blur-md text-black dark:text-white rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 7l1.5-3h9L18 7M3 7h18l-1.5 14h-15L3 7zM9 10v5m6-5v5"
            />
          </svg>
          <span className="uppercase font-semibold tracking-wide">
            Tu Carrito
          </span>
        </h2>
        <div className="w-24 h-[2px] bg-gray-300 dark:bg-gray-600 mx-auto mt-3"></div>

        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">
          Verificá tus productos antes de realizar la compra
        </p>
      </div>

      {cart?.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10 italic">
          Tu carrito está vacío
        </div>
      ) : (
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/40 backdrop-blur-sm transition-all hover:shadow-md hover:scale-[1.01]"
            >
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl border border-gray-300 dark:border-gray-700"
                />
                <div>
                  <p className="text-base font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cantidad: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-lg font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item.id, item.name)}
                  className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  ✖ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TOTAL */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-2xl font-semibold mb-6">
          Total:{" "}
          <span className="font-bold text-black dark:text-white">
            ${total.toFixed(2)}
          </span>
        </p>

        <button
          onClick={handleBuy}
          disabled={loading || cart.length === 0}
          className={`w-full sm:w-auto px-8 py-3 rounded-2xl font-semibold text-lg tracking-wide transition-all flex items-center justify-center gap-2 ${
            loading || cart.length === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white dark:bg-white dark:text-black hover:scale-[1.03] hover:opacity-90"
          }`}
        >
          {loading ? "Procesando..." : "Finalizar compra"}
        </button>
      </div>
    </div>
  );
};

export default CartDetail;
