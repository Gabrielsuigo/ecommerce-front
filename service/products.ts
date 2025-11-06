import { Product } from "@/app/interfaces";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const apiUrl = process.env.NEXT_PUBLIC_API_URL


export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${apiUrl}/products`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Error al obtener productos desde la API");
  }

  const data = await res.json();
  return data;
};

// PD
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.slice(0, 3);
};

export const getProductsId = async (id: number): Promise<Product> => {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  return product;
};