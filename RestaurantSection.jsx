import { Plus, Minus, ShoppingBag, X, Clock } from "lucide-react";
import { INK, BASE, CARD, CHILI, PAPER, VegBadge, StampRating } from "./AppLogic";

export function RestaurantSection({
  filtered, activeCategory, selected, setSelected,
  cart, cartCount, cartTotal, qtyOf, addItem, removeItem, setCartOpen,
}) {
  return (
    <>
      {/* Restaurant grid */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="flex items-baseline justify-between mb-3">
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 20 }}>
            {activeCategory ? activeCategory : "Near you"}
          </h2>
          <span className="text-sm" style={{ color: "#8A7457" }}>{filtered.length} places</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center" style={{ color: "#8A7457" }}>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: INK }}>Nothing matches that craving.</p>
            <p className="text-sm mt-1">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className="card-hover text-left rounded-2xl overflow-hidden"
                style={{ background: CARD, border: `1px solid ${PAPER}` }}
              >
                <div
                  className="h-32 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${r.grad[0]}, ${r.grad[1]})` }}
                >
                  <span style={{ fontSize: 44 }}>{r.emoji}</span>
                  {r.promoted && (
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold"
                      style={{ background: "rgba(255,255,255,0.92)", color: INK, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      PROMOTED
                    </span>
                  )}
                  <span className="absolute top-2 right-2">
                    <StampRating rating={r.rating} />
                  </span>
                </div>
                <div className="p-3.5">
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 16.5 }}>{r.name}</h3>
                  <p className="text-sm mt-0.5" style={{ color: "#8A7457" }}>{r.cuisine}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: "#6B5A47" }}>
                    <span className="flex items-center gap-1"><Clock size={12} /> {r.time} min</span>
                    <span>₹{r.cost} for two</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Restaurant modal */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center" style={{ background: "rgba(36,22,8,0.55)" }} onClick={() => setSelected(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-enter w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl overflow-hidden"
            style={{ background: BASE, maxHeight: "88vh", display: "flex", flexDirection: "column" }}
          >
            <div
              className="h-28 flex items-end p-4 relative shrink-0"
              style={{ background: `linear-gradient(135deg, ${selected.grad[0]}, ${selected.grad[1]})` }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 flex items-center justify-center rounded-full"
                style={{ width: 28, height: 28, background: "rgba(255,255,255,0.9)" }}
              >
                <X size={16} style={{ color: INK }} />
              </button>
              <div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 22, color: "#fff" }}>{selected.name}</h2>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{selected.cuisine}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 py-2.5 text-xs shrink-0" style={{ borderBottom: `1px solid ${PAPER}`, color: "#6B5A47" }}>
              <StampRating rating={selected.rating} />
              <span className="flex items-center gap-1"><Clock size={12} /> {selected.time} min</span>
              <span>₹{selected.cost} for two</span>
            </div>
            <div className="overflow-y-auto px-4 py-2 flex-1">
              {selected.menu.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 py-3" style={{ borderBottom: `1px solid ${PAPER}` }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <VegBadge veg={item.veg} />
                      <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 15 }}>{item.name}</span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: "#8A7457" }}>{item.desc}</p>
                    <p className="text-sm mt-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>₹{item.price}</p>
                  </div>
                  {qtyOf(item.id) > 0 ? (
                    <div className="flex items-center gap-2 rounded-full px-1 py-1" style={{ background: CHILI }}>
                      <button onClick={() => removeItem(item.id)} className="flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "rgba(255,255,255,0.2)" }}>
                        <Minus size={12} color="#fff" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center" style={{ color: "#fff" }}>{qtyOf(item.id)}</span>
                      <button onClick={() => addItem(selected, item.id)} className="flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "rgba(255,255,255,0.2)" }}>
                        <Plus size={12} color="#fff" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addItem(selected, item.id)}
                      className="px-3 py-1.5 rounded-full text-xs font-bold shrink-0"
                      style={{ background: "#fff", color: CHILI, border: `1.5px solid ${CHILI}` }}
                    >
                      ADD
                    </button>
                  )}
                </div>
              ))}
            </div>
            {cartCount > 0 && cart.restaurantId === selected.id && (
              <div className="p-3 shrink-0">
                <button
                  onClick={() => { setSelected(null); setCartOpen(true); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold"
                  style={{ background: INK, color: "#fff" }}
                >
                  <span>{cartCount} item{cartCount > 1 ? "s" : ""} · ₹{cartTotal}</span>
                  <span className="flex items-center gap-1">View cart <ShoppingBag size={14} /></span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
