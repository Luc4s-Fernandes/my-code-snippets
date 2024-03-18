import { createContext, useState } from 'react';

const CartContext = createContext({
  cart: [],
  addCart: () => { },
  clearCart: () => { }
});

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addCart = (userCart) => {
    setCart(userCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const contextValue = {
    cart,
    addCart,
    clearCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;