"use client";
import { useRouter } from "next/navigation";
import { ProductListProps } from "@/app/interfaces";

const SearchResults = ({ products, onClick }: ProductListProps) => {
  const router = useRouter();

  if (products.length === 0) return null;

  const handleClick = (id: number) => {
    router.push(`/products/${id}`);
    onClick(); // Limpia los resultados
  };

  return (
    <div className="absolute top-[4.5rem] left-0 w-full max-h-[calc(100vh-6rem)] overflow-y-auto bg-white dark:bg-black z-40 px-6 py-8">
      <h3 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
        Resultados de búsqueda
      </h3>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-24">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleClick(product.id)}
            className="cursor-pointer block bg-white dark:bg-neutral-900 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h4 className="text-lg font-bold text-black dark:text-white mb-1">
              {product.name}
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {product.description}
            </p>
            <div className="text-sm text-black dark:text-white space-y-1">
              <p>
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>
              <p>
                <span className="font-semibold">Categoría:</span>{" "}
                {product.categoryId}
              </p>
              <p>
                <span className="font-semibold">Precio:</span> u$s{" "}
                {product.price}
              </p>
           
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
