"use client";

import {
  validateEmail,
  validatePassword,
  validateAddress,
  validatePhone,
  validateName,
} from "@/helpers/validation";
import { register } from "@/service/auth";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, FormEvent } from "react";
import Swal from "sweetalert2"; // 👈 Importamos SweetAlert2

export default function RegisterForm() {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });

  const [dirty, setDirty] = useState({
    email: false,
    password: false,
    name: false,
    address: false,
    phone: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await register(data);

    if (res.statusCode) {
      // 🔴 Mostrar error con SweetAlert2
      Swal.fire({
        title: "Error en el registro",
        text: res.message || "Ocurrió un problema al crear la cuenta.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#000",
      });
    } else {
      // 🟢 Registro exitoso
      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada correctamente.",
        icon: "success",
        confirmButtonText: "Ir al login",
        confirmButtonColor: "#000",
      }).then(() => {
        router.push("/login");
      });
    }
  };

  useEffect(() => {
    setErrors({
      email: validateEmail(data.email),
      password: validatePassword(data.password),
      name: validateName(data.name),
      address: validateAddress(data.address),
      phone: validatePhone(data.phone),
    });
  }, [data]);

  const inputs = [
    { name: "name", label: "Nombre completo", type: "text", placeholder: "Juan Pérez", error: errors.name, dirty: dirty.name },
    { name: "email", label: "Email", type: "email", placeholder: "nombre@correo.com", error: errors.email, dirty: dirty.email },
    { name: "password", label: "Contraseña", type: "password", placeholder: "********", error: errors.password, dirty: dirty.password },
    { name: "address", label: "Dirección", type: "text", placeholder: "Calle 123, Ciudad", error: errors.address, dirty: dirty.address },
    { name: "phone", label: "Teléfono", type: "tel", placeholder: "+54 9 11 1234 5678", error: errors.phone, dirty: dirty.phone },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 p-8 rounded-3xl border border-neutral-300 shadow-xl bg-white/70 backdrop-blur-sm"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Crear cuenta</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Completá tus datos para registrarte
          </p>
        </div>

        {inputs.map((input) => (
          <div key={input.name}>
            <label htmlFor={input.name} className="block text-sm font-medium">
              {input.label}
            </label>
            <input
              id={input.name}
              name={input.name}
              type={input.type}
              value={data[input.name as keyof typeof data]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={input.placeholder}
              className="mt-1 w-full p-3 rounded-xl bg-neutral-100 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {input.dirty && input.error && (
              <p className="text-sm text-red-600 mt-1">{input.error}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-black text-white hover:bg-neutral-800 transition duration-200 font-semibold"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}