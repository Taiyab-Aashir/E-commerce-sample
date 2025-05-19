import HomeClient from "@/components/HomeClient";
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

  return <HomeClient initialData={initialData} />;
}

//
