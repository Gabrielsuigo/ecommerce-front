"use client";

import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
    // Solo mostramos en consola, no llamamos a ninguna API
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-md bg-white dark:bg-neutral-900">

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:opacity-80 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

