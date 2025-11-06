import ProductDetail from "@/components/productDetail/productDetail";
import { getProductsId } from "@/service/products";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = await getProductsId(Number(id));

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-full mx-auto mt-20 mb-16 px-1">
      <ProductDetail product={product} />
    </div>
  );
};

export default page;
