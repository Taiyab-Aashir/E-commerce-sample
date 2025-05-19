"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "rating-asc"
  | "rating-desc";

interface SortDropdownProps {
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
}

export default function SortDropdown({
  onSort,
  currentSort,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "rating-desc", label: "Rating (High to Low)" },
    { value: "rating-asc", label: "Rating (Low to High)" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCurrentLabel = () => {
    return (
      sortOptions.find((option) => option.value === currentSort)?.label ||
      "Sort by"
    );
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span>{getCurrentLabel()}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-48 rounded-lg border dark:border-gray-700 bg-white dark:bg-black shadow-lg">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSort(option.value as SortOption);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white ${
                currentSort === option.value
                  ? "bg-gray-50 dark:bg-gray-800"
                  : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
