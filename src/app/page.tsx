import ProductListClient from "@/components/ProductListClient";
import { Product } from "@/types/product";

const PAGE_SIZE = 20;

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function fetchInitialProducts(): Promise<ProductsResponse> {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=0`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function Home() {
  const initialData = await fetchInitialProducts();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)] bg-white dark:bg-black">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Products
      </h1>
      <ProductListClient initialData={initialData} />
    </main>
  );
}
