"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Order, UserSession } from "@/app/interfaces";
import Swal from "sweetalert2";

interface AuthContextProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  logout: () => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
  orders: [],
  setOrders: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  // Cargar user y sus órdenes al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const userOrders = localStorage.getItem(`orders-${parsedUser.user.id}`);
        if (userOrders) {
          setOrders(JSON.parse(userOrders));
        }
      } catch {
        setUser(null);
        setOrders([]);
      }
    }
  }, []);

  // Guardar user si cambia
  useEffect(() => {
    if (user) {
      const storedOrders = localStorage.getItem(`orders-${user.user.id}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders([]);
      }
    }
  }, [user]);

  // Guardar órdenes asociadas al usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem(`orders-${user.user.id}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  const logout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará y deberás iniciar nuevamente.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (user) {
          // localStorage.removeItem(`orders-${user.user.id}`);
          localStorage.removeItem("user");
        }
        setUser(null);
        setOrders([]);
        router.push("/login");

        //
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, orders, setOrders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
