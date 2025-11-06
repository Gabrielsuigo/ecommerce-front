"use client";

import { useRouter } from "next/navigation";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/contact");
  };

  return (
    <footer className="bg-black dark:bg-black text-neutral-100 dark:text-neutral-100 border-t border-neutral-800 py-10">
      <div className="container mx-auto text-center space-y-4">
        <div className="flex justify-center gap-6 text-2xl">
          <a
            href="https://www.instagram.com/store_arg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram  />
          </a>
          <a
            href="https://wa.me/5491125033874"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp  />
          </a>
        </div>

        <button
          onClick={handleContactClick}
          className="px-5 py-2 border border-neutral-600 rounded-full text-sm font-medium text-neutral-300 hover:bg-neutral-800 transition"
        >
          Contactanos
        </button>

        <p className="text-sm text-neutral-500 mt-4">© 2025 STORE. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

