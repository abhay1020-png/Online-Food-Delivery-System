import { BASE, INK, CHILI, useMirchiApp } from "./AppLogic";
import { TopSection } from "./TopSection";
import { RestaurantSection } from "./RestaurantSection";
import { CartDrawer } from "./CartDrawer";

export default function MirchiApp() {
  const {
    query, setQuery,
    activeCategory, setActiveCategory,
    selected, setSelected,
    cart, setCart,
    cartOpen, setCartOpen,
    placed, setPlaced,
    filtered,
    cartRestaurant,
    cartItems,
    cartTotal,
    cartCount,
    addItem,
    removeItem,
    qtyOf,
  } = useMirchiApp();

  return (
    <div style={{ background: BASE, minHeight: "100%", fontFamily: "'Work Sans', sans-serif", color: INK }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500&family=Work+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .card-hover { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 24px -12px rgba(36,22,8,0.25); }
        .chip { transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; }
        .drawer-enter { animation: slideIn 0.25s ease forwards; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .modal-enter { animation: fadeUp 0.2s ease forwards; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        button:focus-visible, input:focus-visible { outline: 2px solid ${CHILI}; outline-offset: 2px; }
      `}</style>

      <TopSection
        query={query}
        setQuery={setQuery}
        cartCount={cartCount}
        setCartOpen={setCartOpen}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <RestaurantSection
        filtered={filtered}
        activeCategory={activeCategory}
        selected={selected}
        setSelected={setSelected}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        qtyOf={qtyOf}
        addItem={addItem}
        removeItem={removeItem}
        setCartOpen={setCartOpen}
      />

      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        placed={placed}
        setPlaced={setPlaced}
        setCart={setCart}
        cartRestaurant={cartRestaurant}
        cartItems={cartItems}
        cartTotal={cartTotal}
        addItem={addItem}
        removeItem={removeItem}
      />
    </div>
  );
}
