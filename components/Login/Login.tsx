"use client";

import { login } from "@/service/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FormEvent, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/helpers/validation";
import Swal from "sweetalert2";


export default function Login() {
  const { setUser } = useAuth();
  const router = useRouter();

  const [Data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [dirty, setDirty] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(Data);
      if (res.statusCode) {
              Swal.fire({
          title: "Error",
          text: res.message,
          icon: "error",
          confirmButtonText: "Entendido",
        });
      } else {
         Swal.fire({
          title: "Bienvenido",
          icon: "success",
          confirmButtonText: "Continuar",
          draggable: true, 
         })

           setUser(res);
           localStorage.setItem("user", JSON.stringify(res));
           router.push("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };
 // actualiza Data en cada input 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
 // marco un campo como "TOCADO" para saber si debe mostrar error
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirty({ ...dirty, [e.target.name]: true });
  };

  useEffect(() => {
    const currentErrors = {
      email: validateEmail(Data.email),
      password: validatePassword(Data.password),
    };
    setErrors(currentErrors);
  }, [Data]);

  // Configuración dinámica de inputs
  const inputs = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "nombre@correo.com",
      autoComplete: "email",
      error: errors.email,
      dirty: dirty.email,
    },
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "********",
      autoComplete: "current-password",
      error: errors.password,
      dirty: dirty.password,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen text-black bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 p-8 rounded-3xl border border-neutral-300 shadow-xl bg-white/70 backdrop-blur-sm"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Iniciá sesión</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Accedé a tu cuenta para continuar
          </p>
        </div>

        {/* Render dinámico de inputs */}
        {inputs.map((input) => (
          <div key={input.name}>
            <label htmlFor={input.name} className="block text-sm font-medium">
              {input.label}
            </label>
            <input
              id={input.name}
              name={input.name}
              type={input.type}
              autoComplete={input.autoComplete}
              value={Data[input.name as keyof typeof Data]}
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
          className={`w-full py-3 rounded-xl text-white font-semibold transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-neutral-800"
          }`}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
