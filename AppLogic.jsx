import { useState, useMemo } from "react";
import { Star } from "lucide-react";
import { useCart } from "./CartSystem";

export const INK = "#241608";
export const BASE = "#FFFBF3";
export const CARD = "#FFFFFF";
export const CHILI = "#E1502B";
export const CHILI_DARK = "#B93B1E";
export const TURMERIC = "#EFA23B";
export const LEAF = "#3E5C3A";
export const PAPER = "#F4ECDD";

export const CATEGORIES = [
  { name: "Biryani", emoji: "🍚" },
  { name: "Pizza", emoji: "🍕" },
  { name: "South Indian", emoji: "🥞" },
  { name: "Rolls", emoji: "🌯" },
  { name: "Momos", emoji: "🥟" },
  { name: "Chinese", emoji: "🥡" },
  { name: "Thali", emoji: "🍛" },
  { name: "Desserts", emoji: "🍮" },
];

export const RESTAURANTS = [
  {
    id: 1, name: "Nawab's Biryani House", cuisine: "Biryani, Mughlai", category: "Biryani",
    rating: 4.5, time: "28-33", cost: 350, promoted: false, grad: ["#E1502B", "#B93B1E"], emoji: "🍚",
    menu: [
      { id: "m1", name: "Hyderabadi Chicken Biryani", price: 289, veg: false, desc: "Slow-cooked basmati, dum-sealed with saffron" },
      { id: "m2", name: "Mutton Biryani", price: 349, veg: false, desc: "Tender mutton, aged rice, fried onions" },
      { id: "m3", name: "Veg Dum Biryani", price: 229, veg: true, desc: "Seasonal vegetables, mint, kewra water" },
      { id: "m4", name: "Chicken 65", price: 199, veg: false, desc: "Crisp, curry-leaf tempered starter" },
    ],
  },
  {
    id: 2, name: "Napoli Wood Oven", cuisine: "Pizza, Italian", category: "Pizza",
    rating: 4.3, time: "22-27", cost: 400, promoted: false, grad: ["#EFA23B", "#D9821B"], emoji: "🍕",
    menu: [
      { id: "m1", name: "Margherita", price: 249, veg: true, desc: "San Marzano tomato, fior di latte, basil" },
      { id: "m2", name: "Pepperoni Classico", price: 349, veg: false, desc: "Double pepperoni, mozzarella" },
      { id: "m3", name: "Farmhouse", price: 299, veg: true, desc: "Bell pepper, onion, corn, olives" },
    ],
  },
  {
    id: 3, name: "Kanti's Tiffin Room", cuisine: "South Indian, Filter Coffee", category: "South Indian",
    rating: 4.6, time: "18-24", cost: 180, promoted: false, grad: ["#3E5C3A", "#25391F"], emoji: "🥞",
    menu: [
      { id: "m1", name: "Masala Dosa", price: 99, veg: true, desc: "Crisp rice crepe, spiced potato filling" },
      { id: "m2", name: "Idli Sambar (4pc)", price: 79, veg: true, desc: "Steamed rice cakes, lentil sambar" },
      { id: "m3", name: "Filter Coffee", price: 39, veg: true, desc: "Decoction brewed, frothed steel tumbler" },
      { id: "m4", name: "Rava Kesari", price: 59, veg: true, desc: "Semolina halwa, cashew, saffron" },
    ],
  },
  {
    id: 4, name: "Rollwalla Express", cuisine: "Rolls, Frankie", category: "Rolls",
    rating: 4.2, time: "20-25", cost: 160, promoted: false, grad: ["#B93B1E", "#7A2712"], emoji: "🌯",
    menu: [
      { id: "m1", name: "Kolkata Egg-Chicken Roll", price: 129, veg: false, desc: "Paratha, double egg, onion, chutney" },
      { id: "m2", name: "Paneer Tikka Roll", price: 109, veg: true, desc: "Charred paneer, mint mayo" },
    ],
  },
  {
    id: 5, name: "Steam & Spice Momo Co.", cuisine: "Tibetan, Momos", category: "Momos",
    rating: 4.4, time: "24-30", cost: 200, promoted: false, grad: ["#D9821B", "#B96B10"], emoji: "🥟",
    menu: [
      { id: "m1", name: "Chicken Steamed Momo", price: 149, veg: false, desc: "Hand-pleated, sesame chilli oil" },
      { id: "m2", name: "Paneer Fried Momo", price: 139, veg: true, desc: "Pan-seared, schezwan dip" },
      { id: "m3", name: "Veg Momo Soup", price: 129, veg: true, desc: "Clear broth, spring onion" },
    ],
  },
  {
    id: 6, name: "Dragon Wok", cuisine: "Chinese, Asian", category: "Chinese",
    rating: 4.1, time: "25-32", cost: 320, promoted: false, grad: ["#241608", "#3E2A18"], emoji: "🥡",
    menu: [
      { id: "m1", name: "Chilli Chicken", price: 259, veg: false, desc: "Wok-tossed, dry red chilli, capsicum" },
      { id: "m2", name: "Veg Hakka Noodles", price: 189, veg: true, desc: "Shredded vegetables, soy, vinegar" },
      { id: "m3", name: "Dimsum Basket", price: 229, veg: false, desc: "Assorted steamed dumplings" },
    ],
  },
  {
    id: 7, name: "Grandma's Thali Ghar", cuisine: "North Indian, Thali", category: "Thali",
    rating: 4.7, time: "30-36", cost: 250, promoted: false, grad: ["#3E5C3A", "#1F2E1B"], emoji: "🍛",
    menu: [
      { id: "m1", name: "Deluxe Veg Thali", price: 249, veg: true, desc: "2 sabzi, dal, kadhi, rice, 4 roti, sweet" },
      { id: "m2", name: "Rajasthani Thali", price: 279, veg: true, desc: "Gatte ki sabzi, ker sangri, bajra roti" },
    ],
  },
  {
    id: 8, name: "The Mishti Jar", cuisine: "Desserts, Bengali Sweets", category: "Desserts",
    rating: 4.5, time: "20-26", cost: 150, promoted: false, grad: ["#EFA23B", "#E1502B"], emoji: "🍮",
    menu: [
      { id: "m1", name: "Baked Rasmalai (2pc)", price: 99, veg: true, desc: "Saffron milk-soaked, pistachio" },
      { id: "m2", name: "Mishti Doi", price: 79, veg: true, desc: "Caramelised sweetened curd, clay pot" },
      { id: "m3", name: "Gulab Jamun (4pc)", price: 89, veg: true, desc: "Rose-cardamom syrup" },
    ],
  },
];

export function VegBadge({ veg }) {
  const color = veg ? LEAF : "#8A2E1F";
  return (
    <span
      className="inline-flex items-center justify-center shrink-0"
      style={{ width: 14, height: 14, border: `1.5px solid ${color}`, borderRadius: 3 }}
      title={veg ? "Veg" : "Non-veg"}
    >
      {veg ? (
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      ) : (
        <span
          style={{
            width: 0, height: 0,
            borderLeft: "4px solid transparent",
            borderRight: "4px solid transparent",
            borderBottom: `7px solid ${color}`,
          }}
        />
      )}
    </span>
  );
}

export function StampRating({ rating }) {
  const good = rating >= 4.3;
  return (
    <div
      className="flex items-center gap-1 shrink-0"
      style={{
        background: good ? LEAF : TURMERIC,
        color: "#fff",
        padding: "3px 8px 3px 6px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        fontWeight: 700,
        clipPath: "polygon(0 0, 100% 0, 100% 70%, 92% 100%, 0 100%)",
      }}
    >
      <Star size={11} fill="#fff" strokeWidth={0} />
      {rating.toFixed(1)}
    </div>
  );
}

// Custom hook: browsing/search state, PLUS the cart system pulled in
// from CartSystem.jsx (addItem, removeItem, qtyOf, totals, etc).
export function useMirchiApp() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return RESTAURANTS.filter((r) => {
      const matchesQuery =
        !query ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !activeCategory || r.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const cartSystem = useCart();

  return {
    query, setQuery,
    activeCategory, setActiveCategory,
    selected, setSelected,
    filtered,
    ...cartSystem,
  };
}
