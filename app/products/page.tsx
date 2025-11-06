
import Card from "@/components/Card/Card";
import CardList from "@/components/CardList/CardList";
import { getProducts } from "@/service/products";

const page = async () => {
  const products = await getProducts();

  return (

   <div className="max-w-full mx-auto mt-6 mb-6 px-1">


      <CardList>
        {Array.isArray(products)
          ? products.map((product) => 
            <Card key={product.id} {...product} />)
          : null}
      </CardList>
    </div>
  );
};

export default page;
