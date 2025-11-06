"use client";

import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const UserWidget = () => {
  const { user, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setOpenMenu(false);
    router.push("/");
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-4" ref={menuRef}>
      {!user?.login ? (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="w-32 text-center px-4 py-2 rounded-xl font-semibold text-sm bg-black text-white border border-black hover:bg-transparent hover:text-black dark:hover:text-white transition-all duration-300"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="w-32 text-center px-4 py-2 rounded-xl font-semibold text-sm border border-black text-black dark:text-white hover:bg-black hover:text-white transition-all duration-300"
          >
            Registrarse
          </Link>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/60 dark:bg-black/40 border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm transition"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.user.name
              )}&background=000000&color=ffffff`}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold text-sm text-black dark:text-white">
              {user.user.name.split(" ")[0]}
            </span>
          </button>

          <AnimatePresence>
            {openMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.user.email}
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setOpenMenu(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  📊 Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                >
                  🚪 Cerrar sesión
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default UserWidget;
