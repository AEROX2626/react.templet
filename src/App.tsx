import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';

// --- ICONS (SVG COMPONENT WRAPPERS) ---
const Icons = {
  Cart: ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  ),
  Sun: ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M9.75 12l-.75-.75M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5ZM19.5 12h-2.25m-10.5 0H3m2-4.5 1.5 1.5m10.75-1.5-1.5 1.5M21 12c0 1.2-.4 2.3-1 3.2l-1.5-1.5M4.5 19.5l1.5-1.5m10.75 1.5-1.5-1.5" />
    </svg>
  ),
  Moon: ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" />
    </svg>
  ),
  Heart: ({ className = "w-6 h-6", filled = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className} ${filled ? 'text-red-500' : ''}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  Trash: ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  Info: ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  Menu: ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  X: ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),
  Star: ({ className = "w-4 h-4 text-yellow-400" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
  )
};

// --- DATABASE & MOCK DATA ---
const BRAND_LIST = [
  { id: "nike", name: "Nike", logo: "⚡", desc: "ספורט וסגנון חיים ללא פשרות" },
  { id: "adidas", name: "Adidas", logo: "👟", desc: "המותג המקורי בעל שלושת הפסים" },
  { id: "chanel", name: "Chanel", logo: "✨", desc: "יוקרה וקלאסיקה צרפתית נצחית" },
  { id: "levis", name: "Levi's", logo: "👖", desc: "חלוצי הג'ינס המקוריים מאז 1873" },
  { id: "zara", name: "Zara", logo: "🧥", desc: "אופנה מהירה ומגמות היישר ממסלולי התצוגה" },
  { id: "gucci", name: "Gucci", logo: "👜", desc: "אופנה איטלקית נועזת ומשפיעה" }
];

const PRODUCT_LIST = [
  // נשים
  { id: 101, category: "נשים", name: "שמלת קיץ פשתן קלילה", price: 249, originalPrice: 319, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80", rating: 4.8, isSale: true, brand: "Zara", sub: "שמלות" },
  { id: 102, category: "נשים", name: "ג'ינס סקיני פרימיום", price: 299, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80", rating: 4.5, isSale: false, brand: "Levi's", sub: "מכנסיים" },
  { id: 103, category: "נשים", name: "תיק יד מעור יוקרתי", price: 599, originalPrice: 850, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80", rating: 4.9, isSale: true, brand: "Gucci", sub: "אקססוריז" },
  { id: 104, category: "נשים", name: "בלייזר פסטל מחויט", price: 349, image: "https://images.unsplash.com/photo-1548624149-f7b3e5a032d1?w=500&q=80", rating: 4.2, isSale: false, brand: "Zara", sub: "ז'קטים" },
  
  // גברים
  { id: 201, category: "גברים", name: "חולצת פשתן קז'ואל כפתורים", price: 189, originalPrice: 220, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80", rating: 4.6, isSale: true, brand: "Zara", sub: "חולצות" },
  { id: 202, category: "גברים", name: "ז'קט ג'ינס קלאסי", price: 320, image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=500&q=80", rating: 4.7, isSale: false, brand: "Levi's", sub: "ז'קטים" },
  { id: 203, category: "גברים", name: "מכנסי צ'ינו אלסטיים", price: 199, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80", rating: 4.4, isSale: false, brand: "Levi's", sub: "מכנסיים" },
  { id: 204, category: "גברים", name: "נעלי סניקרס קורט", price: 399, originalPrice: 450, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80", rating: 4.8, isSale: true, brand: "Adidas", sub: "נעליים" },

  // ילדים
  { id: 301, category: "ילדים", name: "סט אוברול כותנה אורגנית", price: 129, image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500&q=80", rating: 4.9, isSale: false, brand: "Zara", sub: "סטים" },
  { id: 302, category: "ילדים", name: "סווטשירט דינוזאור מחמם", price: 99, originalPrice: 149, image: "https://images.unsplash.com/photo-1519238263530-99bdd1102636?w=500&q=80", rating: 4.5, isSale: true, brand: "Adidas", sub: "חולצות" },
  { id: 303, category: "ילדים", name: "נעלי ספורט סקוצ'ים נוחות", price: 179, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80", rating: 4.7, isSale: false, brand: "Nike", sub: "נעליים" },

  // ספורט
  { id: 401, category: "ספורט", name: "טייץ ריצה מנדף זיעה לנשים", price: 199, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80", rating: 4.8, isSale: false, brand: "Nike", sub: "ביגוד ספורט" },
  { id: 402, category: "ספורט", name: "חולצת דריי-פיט מקצועית לגברים", price: 139, originalPrice: 189, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80", rating: 4.6, isSale: true, brand: "Nike", sub: "ביגוד ספורט" },
  { id: 403, category: "ספורט", name: "נעלי ריצה UltraBoost", price: 649, originalPrice: 799, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80", rating: 4.9, isSale: true, brand: "Adidas", sub: "נעליים" },

  // יופי
  { id: 501, category: "יופי", name: "סרום חומצה היאלורונית מרוכזת", price: 149, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80", rating: 4.7, isSale: false, brand: "Chanel", sub: "טיפוח הפנים" },
  { id: 502, category: "יופי", name: "בושם פריזאי חושני לה סלקט", price: 420, originalPrice: 520, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80", rating: 4.9, isSale: true, brand: "Chanel", sub: "בשמים" },
  { id: 503, category: "יופי", name: "קרם לחות מזין וטבעי", price: 119, image: "https://images.unsplash.com/photo-1608248597481-496100c80836?w=500&q=80", rating: 4.3, isSale: false, brand: "Chanel", sub: "טיפוח הגוף" }
];

// --- 1. THEME CONTEXT ---
const ThemeContext = createContext();

export function ThemeProvider({ children, defaultTheme = "light" }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || defaultTheme;
  });

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// --- 2. CART CONTEXT ---
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("zohar_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("zohar_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size = "M") => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// --- Custom Internal Toast System ---
const ToastContext = createContext();
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 transform translate-y-0 animate-slide-in-right ${
              toast.type === "success" 
                ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800" 
                : "bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800"
            }`}
            dir="rtl"
          >
            <div className="flex items-center gap-2">
              <Icons.Check className="w-5 h-5 flex-shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded"
            >
              <Icons.X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// --- Navigation / Header Component ---
function Header({ currentRoute, setRoute }) {
  const { totalItems } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "בית", path: "/" },
    { label: "נשים", path: "/women" },
    { label: "גברים", path: "/men" },
    { label: "ילדים", path: "/kids" },
    { label: "ספורט", path: "/sports" },
    { label: "יופי", path: "/beauty" },
    { label: "מותגים", path: "/brands" },
    { label: "מבצעים %", path: "/sale", highlight: true }
  ];

  const handleNavClick = (path) => {
    setRoute(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" dir="rtl">
        {/* Mobile menu toggle & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300"
          >
            {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
          <div 
            onClick={() => handleNavClick("/")}
            className="flex items-center cursor-pointer select-none"
          >
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              ZOHAR
            </span>
            <span className="text-xs font-bold mr-1 px-1.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 uppercase">
              Pro
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-sm font-semibold transition-all duration-200 relative py-1.5 ${
                  link.highlight 
                    ? "text-rose-500 hover:text-rose-600" 
                    : isActive 
                      ? "text-violet-600 dark:text-violet-400" 
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Toolbar & Controls */}
        <div className="flex items-center gap-2">
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-300 transition-colors"
            title="שינוי ערכת נושא"
          >
            {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
          </button>

          {/* Cart button */}
          <button
            onClick={() => handleNavClick("/cart")}
            className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-300 transition-colors relative"
            title="עגלת קניות"
          >
            <Icons.Cart />
            {totalItems > 0 && (
              <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-1 shadow-lg transition-colors" dir="rtl">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-right px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  link.highlight 
                    ? "text-rose-500 bg-rose-50 dark:bg-rose-950/20" 
                    : isActive 
                      ? "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400" 
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

// --- Footer Component ---
function Footer({ setRoute }) {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-12 px-4 transition-colors" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span className="text-2xl font-black bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">ZOHAR</span>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            חנות האופנה והלייפסטייל המובילה בישראל. שירות מהיר, משלוחים חינם מעל 199 ₪ ואיכות ללא פשרות.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 text-base">קטגוריות</h4>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><button onClick={() => setRoute("/women")} className="hover:text-violet-500">נשים</button></li>
            <li><button onClick={() => setRoute("/men")} className="hover:text-violet-500">גברים</button></li>
            <li><button onClick={() => setRoute("/kids")} className="hover:text-violet-500">ילדים</button></li>
            <li><button onClick={() => setRoute("/sports")} className="hover:text-violet-500">בגדי ספורט</button></li>
            <li><button onClick={() => setRoute("/beauty")} className="hover:text-violet-500">יופי וטיפוח</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 text-base">שירות לקוחות</h4>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><a href="#" className="hover:text-violet-500">מדיניות משלוחים</a></li>
            <li><a href="#" className="hover:text-violet-500">החזרות והחלפות</a></li>
            <li><a href="#" className="hover:text-violet-500">צור קשר</a></li>
            <li><a href="#" className="hover:text-violet-500">שאלות נפוצות</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 text-base">הרשמה לניוזלטר</h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">הירשמו וקבלו 10% הנחה על הקנייה הראשונה שלכם!</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="כתובת אימייל" 
              className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500 bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-white flex-1"
            />
            <button className="bg-violet-600 text-white text-xs font-bold px-4 rounded-lg hover:bg-violet-700">הרשמה</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} ZOHAR Fashion & Beauty. כל הזכויות שמורות.
      </div>
    </footer>
  );
}

// --- PAGES ---

// 1. Home Page Component
function Home({ setRoute }) {
  const { addToCart } = useContext(CartContext);
  const { addToast } = useContext(ToastContext);

  const heroImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80";

  // Get 3 hot-sellers for preview
  const featuredProducts = useMemo(() => PRODUCT_LIST.slice(0, 3), []);

  return (
    <div className="space-y-16 pb-16 animate-fade-in" dir="rtl">
      {/* Hero Banner Section */}
      <section className="relative h-[550px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Hero Banner" 
            className="w-full h-full object-cover brightness-75 scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20" />
        </div>

        <div className="relative z-10 text-center max-w-2xl px-4 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-rose-500/90 text-white uppercase tracking-wider animate-bounce">
            קולקציית קיץ 2026 החלה!
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight drop-shadow-md">
            האופנה של מחר <br />
            <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
              כאן ועכשיו
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-200 font-medium max-w-lg mx-auto">
            גלו את העיצובים החדשים, המותגים המובילים והחומרים המובחרים ביותר בעונה החדשה.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => setRoute("/women")}
              className="bg-white hover:bg-zinc-100 text-zinc-900 font-bold px-8 py-3.5 rounded-xl shadow-lg transition transform active:scale-95"
            >
              לקולקציית נשים
            </button>
            <button 
              onClick={() => setRoute("/men")}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/60 font-bold px-8 py-3.5 rounded-xl transition backdrop-blur-sm active:scale-95"
            >
              לקולקציית גברים
            </button>
          </div>
        </div>
      </section>

      {/* Grid of Main Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">קטגוריות מובילות</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm sm:text-base">הפריטים שמחכים לכם בכל קולקציה</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: "נשים", path: "/women", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80" },
            { name: "גברים", path: "/men", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80" },
            { name: "ילדים", path: "/kids", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&q=80" },
            { name: "ספורט", path: "/sports", img: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80" },
            { name: "יופי", path: "/beauty", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" }
          ].map((cat, i) => (
            <div 
              key={i} 
              onClick={() => setRoute(cat.path)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md transform hover:-translate-y-1 transition-all"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-lg sm:text-xl font-black text-white">{cat.name}</h3>
                <span className="inline-block mt-1 text-xs text-violet-300 font-bold group-hover:underline">קנו עכשיו ←</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Items / Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">הכי נמכרים השבוע</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-xs sm:text-sm">הקולקציות החדשות שכולם רוצים</p>
          </div>
          <button 
            onClick={() => setRoute("/women")}
            className="text-sm font-bold text-violet-600 dark:text-violet-400 hover:underline"
          >
            לכל המוצרים ←
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-80 overflow-hidden group">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                {prod.isSale && (
                  <span className="absolute top-3 right-3 bg-rose-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md">
                    מבצע!
                  </span>
                )}
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs font-bold px-2 py-1 rounded-md">
                  {prod.brand}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-semibold">{prod.category} • {prod.sub}</span>
                  <div className="flex items-center gap-1">
                    <Icons.Star />
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">{prod.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">{prod.name}</h3>

                <div className="flex items-end justify-between pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">₪{prod.price}</span>
                    {prod.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through">₪{prod.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(prod, "M");
                      addToast(`הפריט "${prod.name}" נוסף לעגלה בהצלחה!`);
                    }}
                    className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition active:scale-95"
                  >
                    <Icons.Cart className="w-4 h-4" />
                    <span>הוספה לעגלה</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-zinc-100 dark:bg-zinc-900/50 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <span className="text-3xl">🚚</span>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">משלוח חינם ומהיר</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">לכל רחבי הארץ בקנייה מעל 199 ₪ בלבד</p>
          </div>
          <div className="space-y-2">
            <span className="text-3xl">🛡️</span>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">תשלום בטוח ומאובטח</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">אבטחת SSL מחמירה ומגוון אפשרויות תשלום נוחות</p>
          </div>
          <div className="space-y-2">
            <span className="text-3xl">🔄</span>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">החזרות קלות</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">אפשרות להחלפה או החזרה תוך 30 יום בקלות רבה</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// 2. Products Catalog Page Component
function ProductsPage({ category, isSale = false }) {
  const { addToCart } = useContext(CartContext);
  const { addToast } = useContext(ToastContext);

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortOption, setSortOption] = useState("recommended");
  const [selectedSize, setSelectedSize] = useState("M");

  // Determine filtering
  const filteredProducts = useMemo(() => {
    return PRODUCT_LIST.filter(prod => {
      // Category filter
      if (!isSale && prod.category !== category) return false;
      // Sale filter
      if (isSale && !prod.isSale) return false;
      // Brand filter
      if (selectedBrand && prod.brand !== selectedBrand) return false;
      // Search text
      if (search && !prod.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (sortOption === "price-low") return a.price - b.price;
      if (sortOption === "price-high") return b.price - a.price;
      if (sortOption === "rating") return b.rating - a.rating;
      return 0; // "recommended"
    });
  }, [category, isSale, selectedBrand, search, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in" dir="rtl">
      {/* Page Title & Breadcrumbs */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
          {isSale ? "מבצעים חמים" : `קולקציית ${category}`}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          {isSale ? "ההנחות הגדולות ביותר על המותגים הטובים ביותר" : `מבחר פריטים יוקרתיים ועדכניים עבור ${category}`}
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-colors">
        {/* Search input */}
        <div className="relative">
          <Icons.Search className="absolute right-3 top-3 text-zinc-400" />
          <input 
            type="text" 
            placeholder="חיפוש פריט..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-3 pr-10 py-2.5 bg-white dark:bg-zinc-950 text-sm border rounded-xl focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-zinc-800 dark:text-white"
          />
        </div>

        {/* Brand filter */}
        <div>
          <select 
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-zinc-950 text-sm border rounded-xl focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-zinc-800 dark:text-white"
          >
            <option value="">כל המותגים</option>
            {BRAND_LIST.map(b => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Sort drop down */}
        <div>
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-zinc-950 text-sm border rounded-xl focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-zinc-800 dark:text-white"
          >
            <option value="recommended">מומלץ עבורך</option>
            <option value="price-low">מחיר: מהנמוך לגבוה</option>
            <option value="price-high">מחיר: מהגבוה לנמוך</option>
            <option value="rating">דירוג קונים</option>
          </select>
        </div>

        {/* Quick info indicator */}
        <div className="flex items-center justify-center md:justify-end text-xs font-bold text-violet-600 dark:text-violet-400">
          נמצאו {filteredProducts.length} מוצרים בקטלוג
        </div>
      </div>

      {/* Product List Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <span className="text-4xl block mb-4">🔍</span>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">לא מצאנו מוצרים התואמים לחיפוש שלך</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">נסו לחפש שוב או לאפס את המסננים</p>
          <button 
            onClick={() => { setSearch(""); setSelectedBrand(""); }}
            className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition"
          >
            איפוס סינונים
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-72 overflow-hidden bg-zinc-100">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                {prod.isSale && (
                  <span className="absolute top-3 right-3 bg-rose-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow">
                    דיל חם!
                  </span>
                )}
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {prod.brand}
                </span>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>{prod.sub}</span>
                    <div className="flex items-center gap-0.5">
                      <Icons.Star />
                      <span className="font-bold text-zinc-600 dark:text-zinc-400">{prod.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-zinc-950 dark:text-zinc-50 text-sm sm:text-base mt-2 line-clamp-2">
                    {prod.name}
                  </h3>
                </div>

                {/* Clothing size picker preview (only for clothing items) */}
                {prod.sub !== "בשמים" && prod.sub !== "טיפוח הפנים" && prod.sub !== "אקססוריז" && (
                  <div className="pt-2 flex items-center gap-1.5 justify-start">
                    <span className="text-[10px] font-bold text-zinc-400">מידה:</span>
                    {["S", "M", "L", "XL"].map(sz => (
                      <button 
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold border transition ${
                          selectedSize === sz 
                            ? "bg-violet-600 border-violet-600 text-white" 
                            : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 text-zinc-500"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-zinc-900 dark:text-zinc-100">₪{prod.price}</span>
                    {prod.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through">₪{prod.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(prod, selectedSize);
                      addToast(`"${prod.name}" (מידה ${selectedSize}) נוסף לעגלה בהצלחה!`);
                    }}
                    className="p-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-violet-600 dark:hover:bg-violet-600 hover:text-white text-white dark:text-zinc-900 rounded-xl transition"
                    title="הוסף לעגלה"
                  >
                    <Icons.Cart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 3. Brands Page Component
function BrandsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-center" dir="rtl">
      <div className="max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">רשימת השותפים שלנו</span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 mt-2">מותגי פרימיום</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-2">
          אנחנו עובדים עם בתי האופנה ומותגי הספורט היוקרתיים ביותר כדי לספק לכם מוצרים באיכות ללא פשרות.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BRAND_LIST.map((brand) => (
          <div 
            key={brand.id}
            className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 transition-all transform hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between items-center text-center"
          >
            <span className="text-5xl mb-4">{brand.logo}</span>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{brand.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs">{brand.desc}</p>
            </div>
            <span className="inline-block mt-6 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:underline cursor-pointer">
              לצפייה במוצרי המותג ←
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Cart & Checkout Page Component
function CartPage({ setRoute }) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useContext(CartContext);
  const { addToast } = useContext(ToastContext);

  // Discount code management
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0); // value in NIS

  // Simulated Checkout Dialog
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", cardNumber: "", expiry: "", cvc: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SUMMER20") {
      const calculatedDiscount = Math.round(totalPrice * 0.2);
      setDiscount(calculatedDiscount);
      addToast("קופון הנחה SUMMER20 הופעל! קיבלת 20% הנחה על כל הסל!");
    } else {
      addToast("קופון לא תקין או פג תוקף.", "error");
    }
  };

  const finalTotal = Math.max(0, totalPrice - discount);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.cardNumber) {
      addToast("אנא מלאו את כל שדות החובה למשלוח ותשלום.", "error");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      clearCart();
      setDiscount(0);
      setPromoCode("");
      addToast("הזמנתך התקבלה בהצלחה! אישור יישלח לטלפון שלך בקרוב.");
      setRoute("/");
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in" dir="rtl">
      <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-8">עגלת הקניות שלך</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center transition-colors">
          <span className="text-5xl block mb-4">🛒</span>
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">עגלת הקניות שלך ריקה</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm mx-auto">
            נראה שלא הוספת מוצרים עדיין. זה הזמן להתחיל לבחור את פריטי הלייפסטייל המושלמים עבורך!
          </p>
          <button 
            onClick={() => setRoute("/")}
            className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition transform active:scale-95"
          >
            חזרה לחנות
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={`${item.id}-${item.size}`}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs transition-colors"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl flex-shrink-0"
                />
                
                <div className="flex-1 w-full text-right sm:text-right space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">{item.name}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">מידה: <span className="font-bold text-zinc-600 dark:text-zinc-300">{item.size}</span> | מותג: {item.brand}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-zinc-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      title="הסר מוצר"
                    >
                      <Icons.Trash className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">₪{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Sidebox */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 h-fit space-y-6 transition-colors">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg border-b pb-4">סיכום הזמנה</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>סכום ביניים</span>
                <span>₪{totalPrice}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>הנחת קופון</span>
                  <span>- ₪{discount}</span>
                </div>
              )}
              
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>משלוח</span>
                <span>{totalPrice >= 199 ? "חינם!" : "₪29"}</span>
              </div>
              
              <div className="flex justify-between text-zinc-900 dark:text-zinc-100 font-extrabold text-base pt-3 border-t">
                <span>סה"כ לתשלום</span>
                <span>₪{finalTotal + (totalPrice >= 199 ? 0 : 29)}</span>
              </div>
            </div>

            {/* Promo code field */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">יש לך קוד הנחה?</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="לדוגמא: SUMMER20" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500 bg-white dark:bg-zinc-950 dark:border-zinc-800 dark:text-white flex-1"
                />
                <button 
                  onClick={applyPromo}
                  className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold px-4 rounded-lg hover:bg-violet-600 dark:hover:bg-violet-600 dark:hover:text-white transition"
                >
                  הפעלה
                </button>
              </div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">טיפ: נסו להשתמש בקוד <strong className="text-violet-500">SUMMER20</strong> להטבה של 20%</span>
            </div>

            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl shadow-md transition transform active:scale-95 text-center text-sm"
            >
              המשך לקופה ומילוי פרטים
            </button>
          </div>
        </div>
      )}

      {/* Simulated Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-6 animate-fade-in text-right max-h-[90vh] overflow-y-auto" dir="rtl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">פרטי משלוח ותשלום מאובטח</h3>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {/* Personal details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">1. פרטי משלוח</h4>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">שם מלא *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="שם פרטי ומשפחה"
                    className="w-full px-3 py-2 text-sm border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">טלפון ליצירת קשר *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05x-xxxxxxx"
                      className="w-full px-3 py-2 text-sm border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">כתובת למשלוח *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="רחוב, מספר בית, עיר"
                      className="w-full px-3 py-2 text-sm border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-3 pt-2 border-t dark:border-zinc-800">
                <h4 className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">2. פרטי כרטיס אשראי</h4>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">מספר כרטיס אשראי *</label>
                  <input 
                    type="text" 
                    required
                    maxLength={16}
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g,'') })}
                    placeholder="4580 •••• •••• ••••"
                    className="w-full px-3 py-2 text-sm border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">תוקף *</label>
                    <input 
                      type="text" 
                      required
                      maxLength={5}
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 dark:text-white text-center"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">CVC *</label>
                    <input 
                      type="password" 
                      required
                      maxLength={3}
                      placeholder="•••"
                      value={formData.cvc}
                      onChange={(e) => setFormData({ ...formData, cvc: e.target.value.replace(/\D/g,'') })}
                      className="w-full px-3 py-2 text-sm border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 dark:text-white text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t dark:border-zinc-800">
                <div className="text-right">
                  <span className="text-xs text-zinc-400 block">סה"כ לתשלום:</span>
                  <span className="text-lg font-black text-zinc-900 dark:text-zinc-50">₪{finalTotal + (totalPrice >= 199 ? 0 : 29)}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl"
                  >
                    ביטול
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow transition flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        <span>מבצע תשלום...</span>
                      </>
                    ) : (
                      <span>שלם עכשיו וסיים הזמנה</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 5. Not Found Page Component
function NotFound({ setRoute }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center animate-fade-in" dir="rtl">
      <span className="text-7xl block mb-6">🏜️</span>
      <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-100">404 - העמוד לא נמצא</h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-base mt-2 max-w-sm mx-auto">
        אופס! נראה שהעמוד שאתה מחפש אינו קיים או שהוסר. נסה לחזור לעמוד הבית שלנו.
      </p>
      <button 
        onClick={() => setRoute("/")}
        className="mt-8 bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition transform active:scale-95 text-sm"
      >
        חזרה לעמוד הבית
      </button>
    </div>
  );
}

// --- Error Boundary Component ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 text-center" dir="rtl">
          <span className="text-6xl block mb-4">⚠️</span>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">אופס, משהו השתבש בהרצת האפליקציה</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm">אנא רעננו את הדף או נסו שוב מאוחר יותר.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-violet-600 text-white font-bold px-6 py-2.5 rounded-xl shadow"
          >
            רענון הדף
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Router Switch Logic ---
function Router({ currentRoute, setRoute }) {
  switch (currentRoute) {
    case "/":
      return <Home setRoute={setRoute} />;
    case "/women":
      return <ProductsPage category="נשים" key="women" />;
    case "/men":
      return <ProductsPage category="גברים" key="men" />;
    case "/kids":
      return <ProductsPage category="ילדים" key="kids" />;
    case "/sports":
      return <ProductsPage category="ספורט" key="sports" />;
    case "/beauty":
      return <ProductsPage category="יופי" key="beauty" />;
    case "/sale":
      return <ProductsPage category="מבצעים" isSale={true} key="sale" />;
    case "/brands":
      return <BrandsPage />;
    case "/cart":
      return <CartPage setRoute={setRoute} />;
    default:
      return <NotFound setRoute={setRoute} />;
  }
}

// --- MAIN APP EXPORT ---
export default function App() {
  const [route, setRoute] = useState("/");

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <ToastProvider>
            <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-violet-500 selection:text-white">
              {/* Header Navigation */}
              <Header currentRoute={route} setRoute={setRoute} />
              
              {/* Main Content Area */}
              <main className="flex-grow">
                <Router currentRoute={route} setRoute={setRoute} />
              </main>

              {/* Footer */}
              <Footer setRoute={setRoute} />
            </div>
          </ToastProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
