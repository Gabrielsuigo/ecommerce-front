import Link from "next/link";

const  Hero = () => {
  return (
    <header className="my-6 flex flex-col items-center justify-center text-white min-h-[300px] px-4 sm:px-6">
      <div className="bg-black/60 p-8 sm:p-10 rounded-xl w-full max-w-2xl text-center shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Bienvenido a nuestra tienda
        </h1>

        <p className="text-lg sm:text-xl mt-2">
          Encontrá los mejores productos con los precios más accesibles.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-block bg-white hover:bg-gray-500 text-black text-lg font-semibold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Ver productos
        </Link>
      </div>
    </header>
  );
}

export default Hero
