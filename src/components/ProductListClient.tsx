"use client";

import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import "@/styles/loader.css";

const PAGE_SIZE = 12;

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
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
}: {
  initialData: ProductsResponse;
}) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <>
      {isLoading && (
        <div className="text-center py-10">
          <div className="loader" />
        </div>
      )}
      {isError && (
        <div className="text-center py-10 text-red-400">{error?.message}</div>
      )}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {data?.pages.flatMap((page) =>
          page.products.map((product) => (
            <div
              key={product.id}
              className="transition-transform duration-300 transform-gpu hover:scale-105 hover:rotate-[1deg] hover:shadow-2xl"
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
      <div ref={loadMoreRef} className="h-12 flex items-center justify-center">
        {isFetchingNextPage && <div className="loader" />}
        {!hasNextPage && !isLoading && (
          <span className="text-gray-400">No more products</span>
        )}
      </div>
    </>
  );
}
