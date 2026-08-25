import { useState, useMemo } from "react";
import { RESTAURANTS } from "./AppLogic";

// Custom hook: everything related to the cart & ordering system.
export function useCart() {
  const [cart, setCart] = useState({});       // { restaurantId, items: { itemId: qty } }
  const [cartOpen, setCartOpen] = useState(false);
  const [placed, setPlaced] = useState(false);

  // Which restaurant the current cart belongs to (a cart can only hold
  // items from one restaurant at a time).
  const cartRestaurant = cart.restaurantId
    ? RESTAURANTS.find((r) => r.id === cart.restaurantId)
    : null;

  // Turn { itemId: qty } into a flat array of full item objects + qty,
  // using reduce() to build it up.
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

  // Total price — reduce() over cartItems.
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Total item count — reduce() over cartItems.
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Add an item to the cart.
  // RESTAURANT RESTRICTION: a cart can only contain items from one
  // restaurant. If the user tries to add from a different restaurant,
  // confirm before wiping the existing cart and starting a new one.
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

  // Remove one unit of an item from the cart (never below 0).
  function removeItem(itemId) {
    setCart((prev) => {
      const items = { ...(prev.items || {}) };
      items[itemId] = Math.max(0, (items[itemId] || 0) - 1);
      return { ...prev, items };
    });
  }

  // Current quantity of a specific item in the cart.
  function qtyOf(itemId) {
    return (cart.items || {})[itemId] || 0;
  }

  // Clear the cart entirely (used after placing an order).
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
