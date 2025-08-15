import { create } from "zustand";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  preco: number;
  sinopse: string;
  capa: string;
}

interface CartStore {
  cart: Livro[];
  addToCart: (item: Livro) => void;
  removeFromCart: (id: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const isAlreadyInCart = state.cart.some((livro) => livro.id === item.id);
      if (!isAlreadyInCart) {
        return { cart: [...state.cart, item] };
      }
      return state;
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));

export default useCartStore;