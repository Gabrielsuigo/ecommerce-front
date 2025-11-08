import Link from "next/link";

const Hero = () => {
  return (
    <header className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden mb-20">
      {/* Fondo con gradiente animado */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-95" /> */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250%] h-[400px] bg-gradient-to-r from-white/10 to-transparent blur-3xl opacity-10 animate-pulse" />

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-5xl mx-auto p-14 rounded-[2.5rem] bg-black/60 shadow-2xl backdrop-blur-md border border-white/10">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md mb-6 animate-fadeIn">
          Bienvenido a <span className="text-gray-300">nuestra tienda</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mb-10 animate-fadeIn delay-150">
          Productos de calidad con precios que realmente valen la pena.
        </p>

        <Link
          href="/products"
          className="inline-block bg-white/90 hover:bg-white text-black font-semibold py-3 px-10 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl animate-fadeIn delay-300"
        >
          Ver productos →
        </Link>
      </div>
    </header>
  );
};

export default Hero;