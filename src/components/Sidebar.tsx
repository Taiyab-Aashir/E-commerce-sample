"use client";

import { Product } from "@/types/product";

interface SidebarProps {
  products: Product[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export default function Sidebar({
  products,
  selectedCategory,
  onCategorySelect,
}: SidebarProps) {
  // Get unique categories and their counts
  const categories = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-64 bg-white dark:bg-black border-r dark:border-gray-800 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Categories
      </h2>
      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === null
              ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          All Products
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({products.length})
          </span>
        </button>
        {Object.entries(categories).map(([category, count]) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({count})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
