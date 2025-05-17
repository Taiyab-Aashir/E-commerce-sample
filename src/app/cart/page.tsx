"use client";

import { useCartStore } from "@/store/cartStore";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)] bg-white dark:bg-black text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Your cart is empty
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)] bg-white dark:bg-black text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-800"
          >
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 relative">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      updateQuantity(item.id, value);
                    }
                  }}
                  className="w-16 text-center border dark:border-gray-800 dark:bg-black dark:text-white rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <div className="text-xl font-bold dark:text-white">
          Total: ${totalPrice().toFixed(2)}
        </div>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors cursor-pointer">
          Checkout
        </button>
      </div>
    </div>
  );
}
