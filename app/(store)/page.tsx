import ProductsView from "@/components/ProductsView";
import SaleBanner from "@/components/SaleBanner";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  console.log(categories);
  return (
    <div>
      {/* render all the products here */}
      <SaleBanner />
      <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
        <ProductsView categories={categories} products={products} />
      </div>
    </div>
  );
}
