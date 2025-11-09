"use client";

import AuthProtected from "@/components/AuthProtected/AuthProtected";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

const page = () => {
  const { user: authUser, orders } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const user = authUser?.user;

  // Pedidos totales
  const totalOrders = orders.length;

  // Último pedido
  const lastOrder = orders[orders.length - 1];

  // Monto total gastado
  const totalAmount = orders.reduce((acc, order) => {
    const orderTotal =
      order.products?.reduce(
        (sum, prod) => sum + prod.price * prod.quantity,
        0
      ) || 0;
    return acc + orderTotal;
  }, 0);

  // Total del carrito
  const cartTotal = cart?.length
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  // Cantidad del carrito
  const cartQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);

  // ✅ SweetAlert2 - Bienvenida al usuario
  useEffect(() => {
    if (user?.name) {
      Swal.fire({
        title: `¡Bienvenido${user?.name ? `, ${user.name}` : ""}!`,
        text: "Revisá tus pedidos y actividad reciente.",
        icon: "info",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [user?.name]);

  return (
    <AuthProtected>
      <div className="flex items-center justify-center min-h-screen bg-transparent text-black dark:text-white px-4">
        <div className="w-full max-w-5xl space-y-10 p-10 rounded-3xl border border-neutral-300 dark:border-neutral-700 shadow-xl bg-white/70 dark:bg-black/40 backdrop-blur-sm">
          {/* HEADER */}
          <header className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight">
                Bienvenido{user?.name ? `, ${user.name}` : ""}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-base">
                Información general de tu cuenta y actividad reciente
              </p>
            </div>

            {/* 🚀 Botones rápidos */}
            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/cart")}
                variant="outlined"
                startIcon={<ShoppingCartRoundedIcon />}
                sx={{
                  borderRadius: "12px",
                  borderColor: "#000",
                  color: "#000",
                  "&:hover": { backgroundColor: "#000", color: "#fff" },
                }}
              >
                Ver carrito
              </Button>

              <Button
                onClick={() => router.push("/orders")}
                variant="contained"
                startIcon={<ReceiptLongRoundedIcon />}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "12px",
                  "&:hover": { backgroundColor: "#111" },
                }}
              >
                Ver pedidos
              </Button>
              <Button
                onClick={() => router.push("/products")}
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  borderColor: "#000",
                  color: "#000",
                  "&:hover": { backgroundColor: "#000", color: "#fff" },
                }}
              >
                Seguir comprando
              </Button>
            </div>
          </header>

          {/* GRID PRINCIPAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="space-y-6">
              {/* Resumen */}
              <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-300 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase mb-1">
                      Pedidos
                    </p>
                    <p className="text-2xl font-bold">{totalOrders}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase mb-1">
                      Último pedido
                    </p>
                    <p className="text-lg">ID: {lastOrder?.id || "—"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase mb-1">
                      Total gastado
                    </p>
                    <p className="text-xl font-semibold">
                      ${totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase mb-1">
                      Carrito
                    </p>
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-sm">Productos</span>
                      <span className="bg-gray-600 text-white text-sm px-2 py-1 rounded-md font-medium">
                        {cartQuantity}
                      </span>
                    </div>
                    <div className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-3 py-1 rounded-xl inline-flex items-center shadow-md">
                      <span className="text-xl font-semibold">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 🕓 Actividad reciente */}
              <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-300 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4">
                  Actividad reciente
                </h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    🕒 Último inicio de sesión:{" "}
                    <span className="font-medium">
                      {user?.lastLogin
                        ? new Date(user.lastLogin).toLocaleString("es-AR")
                        : "—"}
                    </span>
                  </li>
                  <li>
                    🛍️ Última compra:{" "}
                    <span className="font-medium">
                      {lastOrder?.createdAt
                        ? new Date(lastOrder.createdAt).toLocaleString("es-AR")
                        : "—"}
                    </span>
                  </li>
                  <li>
                    💸 Monto del último pedido:{" "}
                    <span className="font-medium">
                      {lastOrder?.total
                        ? `$${lastOrder.total.toFixed(2)}`
                        : "—"}
                    </span>
                  </li>
                  <li>
                    🛒 Productos en carrito:{" "}
                    <span className="font-medium">{cartQuantity}</span>
                  </li>
                </ul>
              </div>

              {/* Perfil */}
              <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-300 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4">
                  Datos del Usuario
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm uppercase text-gray-500 mb-1">
                      Nombre
                    </p>
                    <p>{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase text-gray-500 mb-1">
                      Email
                    </p>
                    <p>{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase text-gray-500 mb-1">
                      Teléfono
                    </p>
                    <p>{user?.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase text-gray-500 mb-1">
                      Dirección
                    </p>
                    <p>{user?.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 🧾 Historial de pedidos */}
            <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-300 dark:border-gray-700 shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🧾 <span>Historial de Pedidos</span>
              </h2>

              {orders.length > 0 ? (
                <div className="max-h-[450px] overflow-y-auto pr-2 custom-scroll">
                  {orders.map((order, i) => (
                    <div
                      key={i}
                      className="bg-gray-50/70 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-3 shadow-sm hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800 dark:text-gray-100">
                          Pedido #{order.id}
                        </span>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            order.status === "approved"
                              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                              : "bg-gray-400/30 text-gray-700 dark:text-gray-400"
                          }`}
                        >
                          {order.status || "Pendiente"}
                        </span>
                      </div>

                      {order.createdAt && (
                        <p className="text-xs text-gray-500 mb-1">
                          📅 {new Date(order.createdAt).toLocaleString("es-AR")}
                        </p>
                      )}

                      {order.total && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">
                          💰 Total:{" "}
                          {order.total.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </p>
                      )}

                      {order.products && order.products.length > 0 && (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 mt-2">
                          {order.products.map((prod, j) => (
                            <div
                              key={j}
                              className="flex justify-between py-1 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <span>
                                {prod.name} × {prod.quantity}
                              </span>
                              <span>
                                ${(prod.price * prod.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  No hay pedidos registrados todavía.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthProtected>
  );
};

export default page;
