import React, { useState, useEffect, useRef } from 'react';

const Icons = {
  Search: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Heart: ({ filled, className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
  MapPin: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Star: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#0ea5e9" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Layers: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>,
  Grid: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
  Check: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>,
  X: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Filter: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>,
  ChevronRight: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>,
  ChevronLeft: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>,
  Plus: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Minus: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Refresh: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>,
  User: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Calendar: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Pool: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12h20"></path><path d="M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"></path><path d="M12 12v-3"></path><path d="M10 5l2-2 2 2"></path></svg>,
  Home: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
};

const GENERIC_GALLERY = [
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
];

const MOCK_ZIMMERS = [
  {
    id: 1,
    name: 'אחוזת נוף הכנרת',
    location: 'מושב רמות, רמת הגולן',
    region: 'צפון',
    type: 'סוויטה',
    guests: 2,
    description: 'סוויטות יוקרה עם בריכה פרטית מחוממת ונוף עוצר נשימה לימת הכנרת. חוויה של פעם בחיים המשלבת עיצוב מודרני מוקפד עם הטבע הפראי של רמת הגולן. הסוויטה כוללת מיטת קינג סייז, חדר רחצה מפנק, מרפסת דק פרטית ומטבחון מאובזר.',
    price: 1200,
    rating: 9.4,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', ...GENERIC_GALLERY],
    amenities: ['בריכה פרטית', 'ג׳קוזי', 'ארוחת בוקר', 'נוף לכנרת', 'מכונת אספרסו', 'אינטרנט אלחוטי'],
    isPopular: true
  },
  {
    id: 2,
    name: 'בקתות יער הקסם',
    location: 'אמירים, גליל עליון',
    region: 'צפון',
    type: 'בקתה',
    guests: 4,
    description: 'בקתות עץ רומנטיות בלב חורש טבעי. מתאים לזוגות או משפחות קטנות המחפשים שקט ושלווה הרחק מההמון הסואן. כל בקתה מבודדת ומציעה פרטיות מוחלטת.',
    price: 850,
    rating: 8.9,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', ...GENERIC_GALLERY],
    amenities: ['ג׳קוזי', 'מטבחון', 'טבע ונוף', 'ספא', 'טבעוני'],
    isPopular: false
  },
  {
    id: 3,
    name: 'סוויטות חלום מדברי',
    location: 'מצפה רמון, נגב',
    region: 'דרום',
    type: 'סוויטה',
    guests: 2,
    description: 'חוויה מדברית ייחודית עם בריכת אינפיניטי הצופה אל מכתש רמון. שילוב מושלם של יוקרה אבסולוטית וטבע בראשיתי. בלילה תוכלו ליהנות מתצפית כוכבים מרהיבה מהמרפסת הפרטית.',
    price: 1500,
    rating: 9.7,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', ...GENERIC_GALLERY],
    amenities: ['בריכה מחוממת', 'ארוחת בוקר', 'טיולי ג׳יפים', 'עיסויים', 'צפייה בכוכבים'],
    isPopular: true
  },
  {
    id: 4,
    name: 'הפנינה של ראש פינה',
    location: 'ראש פינה, גליל',
    region: 'צפון',
    type: 'צימר',
    guests: 3,
    description: 'מבנה אבן משוחזר מהמאה ה-19 בלב המושבה העתיקה. אווירה קסומה והיסטורית, במרחק הליכה קצר מהגלריות והמסעדות המעולות של ראש פינה.',
    price: 950,
    rating: 9.1,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', ...GENERIC_GALLERY],
    amenities: ['ארוחת בוקר', 'מרפסת נוף', 'קרוב למסעדות', 'עיצוב וינטג׳'],
    isPopular: false
  },
  {
    id: 5,
    name: 'וילה מול הים',
    location: 'קיסריה, מישור החוף',
    region: 'מרכז',
    type: 'וילה',
    guests: 12,
    description: 'וילת נופש ענקית למשפחות עם חצר גדולה, עמדת מנגל ובריכה ענקית מול הים. מושלמת לאירועים קטנים, שבתות חתן או חופשה משפחתית מורחבת.',
    price: 2500,
    rating: 8.5,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', ...GENERIC_GALLERY],
    amenities: ['בריכה', 'מתאים למשפחות', 'מנגל', 'קרבה לים', 'מטבחון', 'חניה פרטית'],
    isPopular: false
  },
  {
    id: 6,
    name: 'שאטו פרובנס בגליל',
    location: 'כפר ורדים, גליל מערבי',
    region: 'צפון',
    type: 'סוויטה',
    guests: 2,
    description: 'אחוזת בוטיק בעיצוב צרפתי קלאסי. גן מטופח, בריכת אבן טבעית וספא עשיר מציעים חופשה לזוגות בלבד ברמה בינלאומית.',
    price: 1800,
    rating: 9.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', ...GENERIC_GALLERY],
    amenities: ['בריכה', 'ספא', 'לזוגות בלבד', 'ארוחת שף', 'ג׳קוזי'],
    isPopular: true
  }
];

const FILTER_OPTIONS = {
  amenities: ['בריכה פרטית', 'ג׳קוזי', 'ארוחת בוקר', 'בריכה מחוממת', 'נוף לכנרת', 'מתאים למשפחות', 'מנגל', 'ספא', 'לזוגות בלבד'],
  regions: ['צפון', 'מרכז', 'דרום', 'ירושלים'],
  types: ['סוויטה', 'בקתה', 'וילה', 'צימר', 'מלון בוטיק'],
  ratings: [
    { value: 0, label: 'הכל' },
    { value: 8, label: '8+ (טוב)' },
    { value: 9, label: '9+ (מעולה)' },
  ]
};

const CATEGORIES = [
  { id: 'all', name: 'הכל', icon: Icons.Grid },
  { id: 'pool', name: 'עם בריכה', icon: Icons.Pool },
  { id: 'villa', name: 'וילות', icon: Icons.Home },
  { id: 'romantic', name: 'לזוגות', icon: Icons.Heart },
  { id: 'north', name: 'צפון', icon: Icons.MapPin },
];

const SwipeCard = ({ zimmer, onSwipe, active }) => {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState(null); 
  const cardRef = useRef(null);
  const startXRef = useRef(0);
  const SWIPE_THRESHOLD = 120;

  useEffect(() => {
    if (active) {
      setDragX(0);
      setExitDirection(null);
      setIsDragging(false);
    }
  }, [active, zimmer.id]);

  const handleDragStart = (clientX) => {
    if (!active || exitDirection) return;
    startXRef.current = clientX;
    setIsDragging(true);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || !active) return;
    setDragX(clientX - startXRef.current);
  };

  const handleDragEnd = () => {
    if (!isDragging || !active) return;
    setIsDragging(false);
    if (dragX > SWIPE_THRESHOLD) {
      setExitDirection('right');
      setTimeout(() => onSwipe('right', zimmer), 300);
    } else if (dragX < -SWIPE_THRESHOLD) {
      setExitDirection('left');
      setTimeout(() => onSwipe('left', zimmer), 300);
    } else {
      setDragX(0);
    }
  };

  let transform = '';
  if (exitDirection === 'right') {
    transform = `translateX(500px) rotate(30deg)`;
  } else if (exitDirection === 'left') {
    transform = `translateX(-500px) rotate(-30deg)`;
  } else if (isDragging) {
    transform = `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`;
  }

  const cardStyle = {
    transform,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
    zIndex: active ? 10 : 0,
    opacity: exitDirection ? 0 : 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    touchAction: 'none' 
  };

  return (
    <div 
      ref={cardRef}
      style={cardStyle}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 select-none cursor-grab active:cursor-grabbing flex flex-col"
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={() => { if (isDragging) handleDragEnd(); }}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <div className="relative flex-1">
        <img src={zimmer.image} alt={zimmer.name} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none"></div>
        
        <div 
          className="absolute top-8 left-8 border-4 border-emerald-400 text-emerald-400 font-black text-4xl rounded-2xl px-6 py-2 opacity-0 transition-opacity duration-200 pointer-events-none bg-black/20 backdrop-blur-sm"
          style={{ opacity: dragX > 50 ? Math.min(dragX / SWIPE_THRESHOLD, 1) : 0, transform: 'rotate(-15deg)' }}
        >
          שמור
        </div>
        <div 
          className="absolute top-8 right-8 border-4 border-rose-500 text-rose-500 font-black text-4xl rounded-2xl px-6 py-2 opacity-0 transition-opacity duration-200 pointer-events-none bg-black/20 backdrop-blur-sm"
          style={{ opacity: dragX < -50 ? Math.min(Math.abs(dragX) / SWIPE_THRESHOLD, 1) : 0, transform: 'rotate(15deg)' }}
        >
          דלג
        </div>
        
        <div className="absolute bottom-0 w-full p-6 text-white text-right">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-3xl font-bold drop-shadow-md">{zimmer.name}</h2>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-sm font-bold">
              <Icons.Star className="w-4 h-4 text-sky-300" /> {zimmer.rating}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-200 mb-3 drop-shadow-sm">
            <Icons.MapPin className="w-4 h-4" /> {zimmer.location}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white text-right shrink-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {zimmer.amenities.slice(0, 2).map((a, i) => (
              <span key={i} className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">{a}</span>
            ))}
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₪{zimmer.price} <span className="text-sm text-gray-500 font-normal">/ לילה</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'swipe', 'favorites'
  const [selectedZimmer, setSelectedZimmer] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mobile UI state
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Swipe mode state
  const [swipeQueue, setSwipeQueue] = useState([]);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);

  // Filter States
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [guests, setGuests] = useState(2);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    let filtered = MOCK_ZIMMERS.filter(z => {
      const matchSearch = z.location.includes(searchQuery) || z.name.includes(searchQuery);
      const matchPrice = z.price >= priceRange.min && z.price <= priceRange.max;
      const matchAmenities = selectedAmenities.length === 0 || selectedAmenities.every(a => z.amenities.includes(a));
      const matchRegion = selectedRegions.length === 0 || selectedRegions.includes(z.region);
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(z.type);
      const matchRating = z.rating >= minRating;
      const matchGuests = z.guests >= guests;

      return matchSearch && matchPrice && matchAmenities && matchRegion && matchType && matchRating && matchGuests;
    });
    
    // Apply quick categories
    if (activeCategory === 'pool') {
      filtered = filtered.filter(z => z.amenities.includes('בריכה') || z.amenities.includes('בריכה פרטית'));
    } else if (activeCategory === 'villa') {
      filtered = filtered.filter(z => z.type === 'וילה');
    } else if (activeCategory === 'romantic') {
      filtered = filtered.filter(z => z.amenities.includes('לזוגות בלבד') || z.guests === 2);
    } else if (activeCategory === 'north') {
      filtered = filtered.filter(z => z.region === 'צפון');
    }
    
    setSwipeQueue(filtered);
    setCurrentSwipeIndex(0);
  }, [searchQuery, priceRange, selectedAmenities, selectedRegions, selectedTypes, guests, minRating, activeCategory]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFavorite = (zimmer, e) => {
    if (e) e.stopPropagation(); 
    const exists = favorites.find(f => f.id === zimmer.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== zimmer.id));
      showToast('הוסר מהמועדפים');
    } else {
      setFavorites([...favorites, zimmer]);
      showToast('נוסף למועדפים! ❤️');
    }
  };

  const handleSwipe = (direction, zimmer) => {
    if (direction === 'right') {
      if (!favorites.find(f => f.id === zimmer.id)) {
        setFavorites([...favorites, zimmer]);
        showToast('נוסף למועדפים! ❤️');
      }
    }
    setCurrentSwipeIndex(prev => prev + 1);
  };

  const handleNavigation = (mode) => {
    setViewMode(mode);
    setSelectedZimmer(null); 
    window.scrollTo(0, 0);
  };

  const clearAllFilters = () => {
    setPriceRange({ min: 0, max: 5000 });
    setSelectedAmenities([]);
    setSelectedRegions([]);
    setSelectedTypes([]);
    setGuests(1);
    setMinRating(0);
    setSearchQuery('');
    setActiveCategory('all');
  };

  const renderHeader = () => (
    <header className="bg-white/90 backdrop-blur-lg text-slate-800 sticky top-0 z-50 border-b border-gray-200 transition-all">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavigation('grid')}
        >
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
             <Icons.Home className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            צימר<span className="text-sky-500">Finder</span>
          </h1>
        </div>
        
        <div className="hidden md:flex gap-8 font-semibold text-gray-600">
           <button onClick={() => handleNavigation('grid')} className={`hover:text-sky-500 transition-colors ${viewMode === 'grid' ? 'text-sky-500' : ''}`}>חיפוש מקומות</button>
           <button onClick={() => handleNavigation('swipe')} className={`hover:text-sky-500 transition-colors ${viewMode === 'swipe' ? 'text-sky-500' : ''}`}>גילוי מהיר (Swipe)</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleNavigation('favorites')}
            className="relative p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
          >
            <Icons.Heart filled={viewMode === 'favorites'} className="w-6 h-6" />
            {favorites.length > 0 && (
              <span className="absolute 0 top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                {favorites.length}
              </span>
            )}
          </button>
          
          <div className="hidden sm:flex items-center gap-3 border border-gray-200 p-1 pr-3 rounded-full hover:shadow-md transition-shadow cursor-pointer bg-white">
             <Icons.User className="w-5 h-5 text-gray-500" />
             <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white">
                <span className="text-xs font-bold">אורח</span>
             </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderHeroSearch = () => {
    if (viewMode === 'favorites' || selectedZimmer) return null;
    
    return (
      <div className="relative pt-16 pb-28 px-4 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            החופשה הבאה שלכם <br className="hidden md:block" />
            <span className="text-sky-400">מתחילה כאן.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-100 mb-10 font-medium drop-shadow-md">
            וילות, סוויטות וצימרי יוקרה המובילים בישראל.
          </p>
          
          <div className="bg-white p-2 rounded-full flex flex-col md:flex-row gap-2 shadow-2xl max-w-4xl mx-auto w-full">
            <div className="flex-1 hover:bg-gray-50 rounded-full px-6 py-3 transition-colors text-right border-b md:border-b-0 md:border-l border-gray-200">
              <label className="block text-xs font-bold text-gray-900 mb-0.5">איפה?</label>
              <input 
                type="text" 
                placeholder="חיפוש יעד, אזור או שם..." 
                className="w-full outline-none text-gray-600 bg-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 hover:bg-gray-50 rounded-full px-6 py-3 transition-colors text-right border-b md:border-b-0 md:border-l border-gray-200 cursor-pointer">
              <label className="block text-xs font-bold text-gray-900 mb-0.5">תאריכים</label>
              <div className="text-gray-500 text-sm">הוסיפו תאריכים</div>
            </div>
            <div className="flex-1 hover:bg-gray-50 rounded-full px-6 py-3 transition-colors text-right flex items-center justify-between">
              <div>
                 <label className="block text-xs font-bold text-gray-900 mb-0.5">אורחים</label>
                 <div className="text-gray-500 text-sm">{guests} אורחים</div>
              </div>
              <button className="bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-full transition-transform hover:scale-105 shadow-lg shadow-sky-500/40">
                <Icons.Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCategories = () => {
    if (viewMode === 'favorites' || selectedZimmer) return null;
    return (
      <div className="border-b border-gray-200 bg-white sticky top-[73px] z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex gap-8 overflow-x-auto custom-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center gap-2 shrink-0 transition-colors ${activeCategory === cat.id ? 'text-slate-900 border-b-2 border-slate-900 pb-1' : 'text-gray-500 hover:text-gray-900 pb-1.5'}`}
            >
              <cat.icon className="w-6 h-6" />
              <span className="text-sm font-semibold">{cat.name}</span>
            </button>
          ))}
          
          <div className="mr-auto pl-2 flex items-center">
             <button 
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 hover:border-gray-900 transition-colors text-sm font-semibold text-slate-800"
             >
                <Icons.Filter className="w-4 h-4" />
                <span>סינון מתקדם</span>
             </button>
          </div>
        </div>
      </div>
    );
  };

  const renderGridCard = (zimmer) => {
    const isFav = favorites.find(f => f.id === zimmer.id);
    
    return (
      <div 
        key={zimmer.id} 
        onClick={() => setSelectedZimmer(zimmer)}
        className="group cursor-pointer flex flex-col"
      >
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3">
          <img src={zimmer.image} alt={zimmer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          
          {zimmer.isPopular && (
             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-gray-100">
               מומלץ האתר
             </div>
          )}
          
          <button 
            onClick={(e) => toggleFavorite(zimmer, e)}
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center transition-transform hover:scale-110 z-10"
          >
            <Icons.Heart 
               filled={isFav} 
               className={isFav ? "text-rose-500 w-7 h-7 drop-shadow-md" : "text-white/80 w-7 h-7 drop-shadow-md hover:text-white"} 
            />
          </button>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-lg font-bold text-slate-900 leading-tight mb-0.5">{zimmer.name}</h3>
             <p className="text-gray-500 text-sm mb-1">{zimmer.location}</p>
             <p className="text-gray-400 text-sm mb-2">{zimmer.type} • עד {zimmer.guests} אורחים</p>
             <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-black text-slate-900">₪{zimmer.price}</span>
                <span className="text-sm text-gray-600">לילה</span>
             </div>
          </div>
          <div className="flex items-center gap-1 font-semibold text-sm">
             <Icons.Star className="w-4 h-4 text-sky-500" />
             <span>{zimmer.rating}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderGridView = () => (
    <div className="max-w-[1440px] mx-auto px-6 py-10 w-full min-h-[50vh]">
      {swipeQueue.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400"><Icons.Search className="w-8 h-8" /></div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">לא מצאנו מקומות פנויים</h3>
          <p className="text-gray-500 mb-6">נסו לשנות את התאריכים או להסיר סינונים</p>
          <button onClick={clearAllFilters} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
            נקה את כל הסינונים
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {swipeQueue.map(zimmer => renderGridCard(zimmer))}
        </div>
      )}
    </div>
  );

  const renderDetailsView = () => {
    const zimmer = selectedZimmer;
    const isFav = favorites.find(f => f.id === zimmer.id);

    return (
      <div className="bg-white min-h-screen pb-20 animate-fade-in w-full">
        <div className="sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-200 py-4 px-6 flex justify-between items-center hidden md:flex">
           <h2 className="text-xl font-bold text-slate-900">{zimmer.name}</h2>
           <div className="flex gap-4 items-center">
              <span className="font-bold text-lg">₪{zimmer.price} <span className="text-sm text-gray-500 font-normal">/ לילה</span></span>
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-8 rounded-xl transition-colors">
                הזמן עכשיו
              </button>
           </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">{zimmer.name}</h1>
              <div className="flex items-center gap-4 text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-1"><Icons.Star className="w-4 h-4 text-sky-500"/> {zimmer.rating} ({zimmer.reviews} ביקורות)</span>
                <span className="underline decoration-gray-400">{zimmer.location}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleFavorite(zimmer)} className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors font-semibold underline decoration-transparent hover:decoration-gray-900">
                 <Icons.Heart filled={isFav} className={`w-5 h-5 ${isFav ? 'text-rose-500' : 'text-gray-900'}`} />
                 <span className="hidden md:inline">{isFav ? 'שמור' : 'שמור'}</span>
              </button>
              <button onClick={() => setSelectedZimmer(null)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors font-semibold text-slate-900">
                 חזרה
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden mb-12">
             <div className="md:col-span-2 row-span-2 h-full cursor-pointer group overflow-hidden">
                <img src={zimmer.gallery[0]} alt="main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             </div>
             {zimmer.gallery.slice(1, 5).map((img, i) => (
                <div key={i} className="hidden md:block h-full cursor-pointer group overflow-hidden">
                   <img src={img} alt={`gallery-${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            <div className="lg:col-span-2 space-y-10">
               <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{zimmer.type} מתארח על ידי צוות המקום</h2>
                  <p className="text-gray-600 mb-6 font-medium">עד {zimmer.guests} אורחים • {zimmer.region}</p>
                  <hr className="border-gray-200" />
               </div>
               
               <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">על המקום</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">{zimmer.description}</p>
               </div>

               <hr className="border-gray-200" />

               <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">מה יש במקום?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {zimmer.amenities.map((a, i) => (
                      <div key={i} className="flex items-center gap-4 text-gray-800 font-medium text-lg">
                        <Icons.Check className="w-6 h-6 text-sky-500" />
                        {a}
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-1">
               <div className="sticky top-32 bg-white rounded-3xl border border-gray-200 p-6 shadow-xl shadow-gray-200/50">
                  <div className="flex items-baseline gap-1 mb-6">
                     <span className="text-3xl font-black text-slate-900">₪{zimmer.price}</span>
                     <span className="text-gray-600 font-medium">לילה</span>
                  </div>
                  
                  <div className="border border-gray-300 rounded-xl mb-4 overflow-hidden">
                     <div className="flex border-b border-gray-300">
                        <div className="flex-1 p-3 border-l border-gray-300">
                           <div className="text-[10px] font-bold text-gray-900 uppercase">הגעה</div>
                           <div className="text-sm text-gray-500">הוסף תאריך</div>
                        </div>
                        <div className="flex-1 p-3">
                           <div className="text-[10px] font-bold text-gray-900 uppercase">עזיבה</div>
                           <div className="text-sm text-gray-500">הוסף תאריך</div>
                        </div>
                     </div>
                     <div className="p-3">
                        <div className="text-[10px] font-bold text-gray-900 uppercase">אורחים</div>
                        <div className="text-sm text-gray-900">{guests} אורחים</div>
                     </div>
                  </div>
                  
                  <button className="w-full bg-sky-500 hover:bg-sky-600 active:scale-95 transition-all text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-sky-500/30 mb-4">
                     הזמן עכשיו
                  </button>
                  <div className="text-center text-sm text-gray-500 font-medium mb-6">לא תחויב בשלב זה</div>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between text-gray-700 underline decoration-gray-300">
                        <span>₪{zimmer.price} x 2 לילות</span>
                        <span>₪{zimmer.price * 2}</span>
                     </div>
                     <div className="flex justify-between text-gray-700 underline decoration-gray-300">
                        <span>דמי ניקיון</span>
                        <span>₪200</span>
                     </div>
                     <hr className="border-gray-200" />
                     <div className="flex justify-between font-black text-lg text-slate-900">
                        <span>סה"כ</span>
                        <span>₪{(zimmer.price * 2) + 200}</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFiltersContent = () => (
    <div className="space-y-8 p-6">
      <div>
        <h4 className="font-bold text-lg text-slate-900 mb-4">אורחים</h4>
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <span className="text-gray-700">מבוגרים / ילדים</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors">
              <Icons.Minus className="w-4 h-4" />
            </button>
            <span className="w-4 text-center font-semibold text-lg">{guests}</span>
            <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors">
              <Icons.Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg text-slate-900 mb-4">טווח מחירים (ללילה)</h4>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">מנימום</label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">₪</span>
              <input type="number" value={priceRange.min} onChange={e => setPriceRange({...priceRange, min: +e.target.value})} className="w-full border border-gray-300 rounded-xl py-3 pr-8 pl-3 outline-none focus:border-slate-900" />
            </div>
          </div>
          <div className="flex-1">
             <label className="text-xs text-gray-500 mb-1 block">מקסימום</label>
             <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">₪</span>
              <input type="number" value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: +e.target.value})} className="w-full border border-gray-300 rounded-xl py-3 pr-8 pl-3 outline-none focus:border-slate-900" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg text-slate-900 mb-4">סוג נכס</h4>
        <div className="grid grid-cols-2 gap-3">
          {FILTER_OPTIONS.types.map(type => (
            <label key={type} className="flex gap-3 cursor-pointer group items-center">
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-slate-900 border-slate-900 text-white' : 'border-gray-300'}`}>
                {selectedTypes.includes(type) && <Icons.Check className="w-4 h-4" />}
              </div>
              <input type="checkbox" className="hidden" checked={selectedTypes.includes(type)} onChange={() => {
                setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
              }}/>
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg text-slate-900 mb-4">מתקנים פופולריים</h4>
        <div className="grid grid-cols-2 gap-3">
          {FILTER_OPTIONS.amenities.map(amenity => (
            <label key={amenity} className="flex gap-3 cursor-pointer group items-center">
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${selectedAmenities.includes(amenity) ? 'bg-slate-900 border-slate-900 text-white' : 'border-gray-300'}`}>
                {selectedAmenities.includes(amenity) && <Icons.Check className="w-4 h-4" />}
              </div>
              <input type="checkbox" className="hidden" checked={selectedAmenities.includes(amenity)} onChange={() => {
                setSelectedAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]);
              }}/>
              <span className="text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMobileFiltersModal = () => {
    if (!showMobileFilters) return null;
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex flex-col justify-end transition-opacity">
        <div className="bg-white w-full rounded-t-3xl h-[85vh] flex flex-col animate-slide-up shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Icons.X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-slate-900">סינון מתקדם</h3>
            <button onClick={clearAllFilters} className="text-sm font-semibold underline text-slate-900">
              נקה הכל
            </button>
          </div>
          
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            {renderFiltersContent()}
          </div>
          
          <div className="p-6 border-t border-gray-200 bg-white">
            <button 
              onClick={() => setShowMobileFilters(false)}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:bg-slate-800 transition-colors"
            >
              הצג {swipeQueue.length} מקומות
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    if (selectedZimmer) return null;
    return (
      <footer className="bg-slate-50 border-t border-gray-200 py-12 mt-auto">
         <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
               <h4 className="font-bold text-slate-900 mb-4">תמיכה</h4>
               <ul className="space-y-3 text-gray-600 text-sm font-medium">
                  <li><a href="#" className="hover:underline">מרכז העזרה</a></li>
                  <li><a href="#" className="hover:underline">אפשרויות ביטול</a></li>
                  <li><a href="#" className="hover:underline">נגישות</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-4">אירוח</h4>
               <ul className="space-y-3 text-gray-600 text-sm font-medium">
                  <li><a href="#" className="hover:underline">הוסף את הצימר שלך</a></li>
                  <li><a href="#" className="hover:underline">קהילת המארחים</a></li>
                  <li><a href="#" className="hover:underline">הגנה על מארחים</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-4">אודות צימרFinder</h4>
               <ul className="space-y-3 text-gray-600 text-sm font-medium">
                  <li><a href="#" className="hover:underline">חדשות</a></li>
                  <li><a href="#" className="hover:underline">קריירה</a></li>
                  <li><a href="#" className="hover:underline">משקיעים</a></li>
               </ul>
            </div>
            <div>
               <div className="flex items-center gap-2 mb-4 text-slate-900">
                 <Icons.Home className="w-6 h-6 text-sky-500" />
                 <h1 className="text-xl font-black">צימרFinder</h1>
               </div>
               <p className="text-gray-500 text-sm mb-4">הפלטפורמה המובילה בישראל להזמנת חופשות יוקרה, וילות וצימרים.</p>
            </div>
         </div>
         <div className="max-w-[1440px] mx-auto px-6 mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
            <div>© 2024 ZimmerFinder, Inc. כל הזכויות שמורות.</div>
            <div className="flex gap-4">
               <a href="#" className="hover:underline">פרטיות</a>
               <a href="#" className="hover:underline">תנאים</a>
               <a href="#" className="hover:underline">מפת האתר</a>
            </div>
         </div>
      </footer>
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white font-hebrew text-right flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700;800&display=swap');
        .font-hebrew { font-family: 'Assistant', sans-serif; }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}</style>
      
      {!selectedZimmer && renderHeader()}
      {!selectedZimmer && renderHeroSearch()}
      {!selectedZimmer && renderCategories()}
      
      <main className="flex-1 flex flex-col items-center w-full bg-white">
        {selectedZimmer ? renderDetailsView() : (
          <>
            {viewMode === 'grid' && renderGridView()}
            {viewMode === 'swipe' && (
              <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50 min-h-[calc(100vh-400px)] overflow-hidden w-full relative">
                <div className="relative w-full max-w-sm h-[560px] mt-10">
                  {currentSwipeIndex >= swipeQueue.length ? (
                    <div className="absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center">
                      <Icons.Check className="w-16 h-16 text-emerald-500 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">ראיתם הכל!</h3>
                      <button onClick={clearAllFilters} className="mt-4 text-sky-500 font-bold">נקה סינונים</button>
                    </div>
                  ) : (
                    swipeQueue.slice(currentSwipeIndex, currentSwipeIndex + 3).reverse().map((zimmer, idx, arr) => {
                      const isTop = idx === arr.length - 1;
                      const stackIndex = arr.length - 1 - idx; 
                      return (
                        <div key={zimmer.id} className="absolute inset-0 transition-transform duration-300 ease-out"
                          style={{ transform: isTop ? 'none' : `scale(${1 - stackIndex * 0.05}) translateY(${stackIndex * 15}px)`, zIndex: isTop ? 10 : 10 - stackIndex }}>
                          <SwipeCard zimmer={zimmer} active={isTop} onSwipe={handleSwipe} />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
            {viewMode === 'favorites' && (
               <div className="max-w-[1440px] mx-auto px-6 py-10 w-full min-h-[50vh]">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">המועדפים שלי</h2>
                  {favorites.length === 0 ? (
                     <div className="text-gray-500">לא שמרת עדיין מקומות למועדפים.</div>
                  ) : (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map(zimmer => renderGridCard(zimmer))}
                     </div>
                  )}
               </div>
            )}
          </>
        )}
      </main>

      {renderFooter()}
      {renderMobileFiltersModal()}

      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in font-semibold text-sm">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
