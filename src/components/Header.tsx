"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Home, ArrowLeft, Sun, Moon } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useTheme } from "next-themes";

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems());
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-gray-900 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isHome && (
              <button
                onClick={() => router.back()}
                className="rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                title="Go Back"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            )}
            <Link
              href="/"
              className="flex items-center space-x-2 rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title="Home"
            >
              <Home className="h-6 w-6" />
              <span className="text-xl font-bold text-white">E-Commerce</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title="View Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
