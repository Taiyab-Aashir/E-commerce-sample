"use client";

import { useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import { Product } from "@/types/product";
import { SortOption } from "@/components/SortDropdown";
import "@/styles/loader.css";

const PAGE_SIZE = 500;

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface ProductListClientProps {
  initialData: ProductsResponse;
  searchQuery: string;
  currentSort: SortOption;
}

async function fetchProducts({ pageParam = 1 }): Promise<ProductsResponse> {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${
      (pageParam - 1) * PAGE_SIZE
    }`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default function ProductListClient({
  initialData,
  searchQuery,
  currentSort,
}: ProductListClientProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * PAGE_SIZE;
      return loaded < lastPage.total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
  });

  // Infinite scroll effect
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Get all products from all pages
  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  // Filter products by selected category and search query
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products based on current sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (currentSort) {
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="flex">
      <Sidebar
        products={allProducts}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <div className="flex-1 p-4">
        {isLoading && (
          <div className="text-center py-10">
            <div className="loader" />
          </div>
        )}
        {isError && (
          <div className="text-center py-10 text-red-400">{error?.message}</div>
        )}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-lg transition-transform duration-300 transform-gpu hover:scale-105 hover:rotate-[1deg] hover:shadow-2xl"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {!selectedCategory && !searchQuery && (
          <div
            ref={loadMoreRef}
            className="h-12 flex items-center justify-center mt-2"
          >
            {isFetchingNextPage && <div className="loader" />}
            {!hasNextPage && !isLoading && (
              <span className="text-gray-400">No more products</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
