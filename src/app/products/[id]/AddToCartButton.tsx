"use client";

import { Product, CartItem } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };
    addItem(cartItem);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Add to Cart
    </button>
  );
}
