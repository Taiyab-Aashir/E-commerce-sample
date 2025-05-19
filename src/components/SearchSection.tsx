"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Product } from "@/types/product";

interface SearchSectionProps {
  products: Product[];
  onSearch: (query: string) => void;
}

export default function SearchSection({
  products,
  onSearch,
}: SearchSectionProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<
    Array<{ type: "product" | "category"; name: string }>
  >([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim() === "") {
      setSuggestions([]);
      onSearch("");
      return;
    }

    const searchTerm = value.toLowerCase();
    const productMatches = products
      .filter((product) => product.title.toLowerCase().includes(searchTerm))
      .map((product) => ({ type: "product" as const, name: product.title }));

    const categoryMatches = Array.from(
      new Set(
        products
          .filter((product) =>
            product.category.toLowerCase().includes(searchTerm)
          )
          .map((product) => product.category)
      )
    ).map((category) => ({ type: "category" as const, name: category }));

    setSuggestions([...productMatches, ...categoryMatches].slice(0, 5));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: {
    type: "product" | "category";
    name: string;
  }) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    onSearch(suggestion.name);
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      onSearch(query);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products or categories..."
          className="w-full pl-10 pr-10 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-black border dark:border-gray-700 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white flex items-center space-x-2"
            >
              <span className="text-sm font-medium">
                {suggestion.type === "product" ? "🔍" : "📁"}
              </span>
              <span>{suggestion.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
