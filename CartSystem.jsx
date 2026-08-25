import { useState, useMemo } from "react";
import { RESTAURANTS } from "./AppLogic";

export function useCart() {
  const [cart, setCart] = useState({});    
  const [cartOpen, setCartOpen] = useState(false);
  const [placed, setPlaced] = useState(false);


  const cartRestaurant = cart.restaurantId
    ? RESTAURANTS.find((r) => r.id === cart.restaurantId)
    : null;


  const cartItems = useMemo(() => {
    if (!cartRestaurant) return [];
    return Object.entries(cart.items || {}).reduce((acc, [itemId, qty]) => {
      if (qty > 0) {
        const menuItem = cartRestaurant.menu.find((m) => m.id === itemId);
        if (menuItem) acc.push({ ...menuItem, qty });
      }
      return acc;
    }, []);
  }, [cart, cartRestaurant]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);


  function addItem(restaurant, itemId) {
    setCart((prev) => {
      const isDifferentRestaurant =
        prev.restaurantId && prev.restaurantId !== restaurant.id;

      if (isDifferentRestaurant) {
        const confirmed = window.confirm(
          `Start a new order from ${restaurant.name}? Your current cart will be cleared.`
        );
        if (!confirmed) return prev;
        return { restaurantId: restaurant.id, items: { [itemId]: 1 } };
      }

      const items = { ...(prev.items || {}) };
      items[itemId] = (items[itemId] || 0) + 1;
      return { restaurantId: restaurant.id, items };
    });
  }


  function removeItem(itemId) {
    setCart((prev) => {
      const items = { ...(prev.items || {}) };
      items[itemId] = Math.max(0, (items[itemId] || 0) - 1);
      return { ...prev, items };
    });
  }


  function qtyOf(itemId) {
    return (cart.items || {})[itemId] || 0;
  }


  function clearCart() {
    setCart({});
  }

  return {
    cart, setCart,
    cartOpen, setCartOpen,
    placed, setPlaced,
    cartRestaurant,
    cartItems,
    cartTotal,
    cartCount,
    addItem,
    removeItem,
    qtyOf,
    clearCart,
  };
}
