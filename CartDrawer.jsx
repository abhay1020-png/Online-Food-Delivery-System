import { Plus, Minus, ShoppingBag, ChevronLeft, Sparkles } from "lucide-react";
import { INK, BASE, CHILI, TURMERIC, PAPER, VegBadge } from "./AppLogic";

export function CartDrawer({
  cartOpen, setCartOpen, placed, setPlaced, setCart,
  cartRestaurant, cartItems, cartTotal, addItem, removeItem,
}) {
  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(36,22,8,0.55)" }} onClick={() => setCartOpen(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="drawer-enter w-full sm:w-96 h-full flex flex-col"
        style={{ background: BASE }}
      >
        <div className="flex items-center gap-3 p-4 shrink-0" style={{ borderBottom: `1px solid ${PAPER}` }}>
          <button onClick={() => setCartOpen(false)}><ChevronLeft size={20} /></button>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 18 }}>Your order</h2>
        </div>

        {placed ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <Sparkles size={32} style={{ color: TURMERIC }} />
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 20, marginTop: 12 }}>Order placed!</h3>
            <p className="text-sm mt-1" style={{ color: "#8A7457" }}>The tiffin is on its way from {cartRestaurant?.name}.</p>
            <button
              onClick={() => { setPlaced(false); setCart({}); setCartOpen(false); }}
              className="mt-6 px-5 py-2.5 rounded-full text-sm font-bold"
              style={{ background: INK, color: "#fff" }}
            >
              Back to browsing
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag size={28} style={{ color: "#C9BBA2" }} />
            <p className="mt-3 text-sm" style={{ color: "#8A7457" }}>Your cart is empty. Go find something to crave.</p>
          </div>
        ) : (
          <>
            <div className="px-4 pt-3 text-xs font-semibold" style={{ color: "#8A7457" }}>
              FROM {cartRestaurant?.name?.toUpperCase()}
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${PAPER}` }}>
                  <div className="flex items-center gap-2">
                    <VegBadge veg={item.veg} />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs" style={{ color: "#8A7457", fontFamily: "'JetBrains Mono', monospace" }}>₹{item.price} × {item.qty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full px-1 py-1" style={{ background: PAPER }}>
                    <button onClick={() => removeItem(item.id)} className="flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "#fff" }}>
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                    <button onClick={() => addItem(cartRestaurant, item.id)} className="flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "#fff" }}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 shrink-0" style={{ borderTop: `1px solid ${PAPER}` }}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span style={{ color: "#8A7457" }}>Item total</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>₹{cartTotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span style={{ color: "#8A7457" }}>Delivery fee</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>₹{cartTotal > 0 ? 25 : 0}</span>
              </div>
              <button
                onClick={() => setPlaced(true)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold"
                style={{ background: CHILI, color: "#fff" }}
              >
                <span>Place order</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>₹{cartTotal + 25}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
