"use client";

import { Product, CartItem } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity,
    };
    addItem(cartItem);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image gallery */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={1000}
                height={1000}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
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
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-l-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-r-lg"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Details
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Brand
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.brand}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Category
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Stock
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.stock} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Discount
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.discountPercentage} %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
