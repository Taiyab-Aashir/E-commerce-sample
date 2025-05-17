"use client";

import { Product, CartItem } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/20/solid";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };
    addItem(cartItem);
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {product.title}
          </h3>
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({product.rating})
            </span>
          </div>
          <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className={`absolute bottom-4 right-4 p-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-lg transition-all duration-300 hover:cursor-pointer ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        } hover:bg-indigo-700 dark:hover:bg-indigo-600`}
      >
        <ShoppingCart className="h-5 w-5" />
      </button>
    </div>
  );
}
