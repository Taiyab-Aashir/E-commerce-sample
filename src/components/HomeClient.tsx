"use client";

import { useState } from "react";
import ProductListClient from "@/components/ProductListClient";
import SearchSection from "@/components/SearchSection";
import SortDropdown, { SortOption } from "@/components/SortDropdown";
import { Product } from "@/types/product";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface HomeClientProps {
  initialData: ProductsResponse;
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSort, setCurrentSort] = useState<SortOption>("name-asc");

  return (
    <>
      <div className="w-full bg-gray-50 dark:bg-gray-900 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-xl">
              <SearchSection
                products={initialData.products}
                onSearch={setSearchQuery}
              />
            </div>
            <SortDropdown currentSort={currentSort} onSort={setCurrentSort} />
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)] bg-white dark:bg-black">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Products
        </h1>
        <ProductListClient
          initialData={initialData}
          searchQuery={searchQuery}
          currentSort={currentSort}
        />
      </main>
    </>
  );
}
