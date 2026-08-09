import React, { useState, useEffect, useRef } from 'react';

const MOCK_ZIMMERS = [
  {
    id: 1,
    name: 'אחוזת נוף הכנרת',
    location: 'מושב רמות, רמת הגולן',
    description: 'סוויטות יוקרה עם בריכה פרטית מחוממת ונוף עוצר נשימה לימת הכנרת. מקום מושלם לרוגע והתנתקות מוחלטת.',
    price: 1200,
    rating: 9.4,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['בריכה פרטית', 'ג׳קוזי', 'ארוחת בוקר', 'נוף לכנרת'],
  },
  {
    id: 2,
    name: 'בקתות יער הקסם',
    location: 'אמירים, גליל עליון',
    description: 'בקתות עץ רומנטיות בלב חורש טבעי. מתאים לזוגות המחפשים שקט ושלווה עם עיצוב כפרי אותנטי.',
    price: 850,
    rating: 8.9,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['ג׳קוזי', 'מטבחון', 'טבע ונוף', 'ספא'],
  },
  {
    id: 3,
    name: 'סוויטות חלום מדברי',
    location: 'מצפה רמון, נגב',
    description: 'חוויה מדברית ייחודית עם בריכת אינפיניטי הצופה אל מכתש רמון. שקיעות מרהיבות ואווירה שאין כמותה.',
    price: 1500,
    rating: 9.7,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['בריכה מחוממת', 'ארוחת בוקר', 'טיולי ג׳יפים', 'עיסויים'],
  },
  {
    id: 4,
    name: 'הפנינה של ראש פינה',
    location: 'ראש פינה, גליל',
    description: 'מבנה אבן משוחזר מהמאה ה-19 בלב המושבה העתיקה. אווירה קסומה והיסטורית בשילוב כל הפינוקים המודרניים.',
    price: 950,
    rating: 9.1,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['ארוחת בוקר', 'מרפסת נוף', 'קרוב למסעדות', 'עיצוב וינטג׳'],
  },
  {
    id: 5,
    name: 'וילה מול הים',
    location: 'קיסריה, מישור החוף',
    description: 'וילת נופש ענקית למשפחות עם חצר גדולה, עמדת מנגל ובריכה ענקית מול הים. מושלמת למפגשים משפחתיים.',
    price: 2500,
    rating: 8.5,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['בריכה', 'מתאים למשפחות', 'מנגל', 'קרבה לים'],
  }
];

const Icons = {
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Heart: ({ filled, className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Layers: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>,
  List: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
  Check: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Filter: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
};

const SwipeCard = ({ zimmer, onSwipe, active }) => {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState(null);
  
  const startXRef = useRef(0);
  const SWIPE_THRESHOLD = 100;

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
      setDragX(0); // snap back
    }
  };

  const onMouseDown = (e) => handleDragStart(e.clientX);
  const onMouseMove = (e) => handleDragMove(e.clientX);
  const onMouseUp = handleDragEnd;
  const onMouseLeave = () => { if (isDragging) handleDragEnd(); };
  const onTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = handleDragEnd;

  let transform = '';
  if (exitDirection === 'right') transform = `translateX(500px) rotate(30deg)`;
  else if (exitDirection === 'left') transform = `translateX(-500px) rotate(-30deg)`;
  else if (isDragging) transform = `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`;

  return (
    <div 
      style={{
        transform,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        zIndex: active ? 10 : 0,
        opacity: exitDirection ? 0 : 1,
        touchAction: 'none'
      }}
      className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 select-none cursor-grab active:cursor-grabbing absolute w-full h-full"
      onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
    >
      <div className="relative h-[60%]">
        <img src={zimmer.image} alt={zimmer.name} className="w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Swipe Indicators */}
        <div 
          className="absolute top-8 left-8 border-4 border-rose-500 text-rose-500 font-black text-3xl rounded-xl px-6 py-2 opacity-0 transition-opacity duration-200 pointer-events-none bg-white/90 backdrop-blur-sm"
          style={{ opacity: dragX > 50 ? Math.min(dragX / SWIPE_THRESHOLD, 1) : 0, transform: 'rotate(-10deg)' }}
        >אהבתי</div>
        <div 
          className="absolute top-8 right-8 border-4 border-slate-400 text-slate-500 font-black text-3xl rounded-xl px-6 py-2 opacity-0 transition-opacity duration-200 pointer-events-none bg-white/90 backdrop-blur-sm"
          style={{ opacity: dragX < -50 ? Math.min(Math.abs(dragX) / SWIPE_THRESHOLD, 1) : 0, transform: 'rotate(10deg)' }}
        >הבא</div>
        
        <div className="absolute bottom-0 w-full p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-sky-500/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Icons.Star /> {zimmer.rating}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold mb-1 drop-shadow-md">{zimmer.name}</h2>
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-200 drop-shadow-sm">
            <Icons.MapPin /> {zimmer.location}
          </div>
        </div>
      </div>
      
      <div className="p-6 h-[40%] flex flex-col justify-between bg-white">
        <div>
          <div className="text-2xl font-black text-slate-900 mb-3">
            ₪{zimmer.price} <span className="text-sm text-slate-500 font-medium">/ ללילה</span>
          </div>
          <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">{zimmer.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {zimmer.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="bg-slate-50 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>{amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [viewMode, setViewMode] = useState('list'); // 'list', 'swipe', 'favorites'
  const [selectedZimmer, setSelectedZimmer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [swipeQueue, setSwipeQueue] = useState([]);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);

  const [maxPrice, setMaxPrice] = useState(3000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const allAmenities = ['בריכה פרטית', 'ג׳קוזי', 'ארוחת בוקר', 'בריכה מחוממת', 'נוף לכנרת', 'מתאים למשפחות'];

  useEffect(() => {
    const filtered = MOCK_ZIMMERS.filter(z => {
      const matchSearch = z.location.includes(searchQuery) || z.name.includes(searchQuery);
      const matchPrice = z.price <= maxPrice;
      const matchAmenities = selectedAmenities.length === 0 || selectedAmenities.every(a => z.amenities.includes(a));
      return matchSearch && matchPrice && matchAmenities;
    });
    setSwipeQueue(filtered);
    setCurrentSwipeIndex(0);
  }, [searchQuery, maxPrice, selectedAmenities]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
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
    if (direction === 'right' && !favorites.find(f => f.id === zimmer.id)) {
      setFavorites([...favorites, zimmer]);
      showToast('נשמר במועדפים! ❤️');
    }
    setCurrentSwipeIndex(prev => prev + 1);
  };

  const handleNavigation = (mode) => {
    setViewMode(mode);
    setSelectedZimmer(null);
    window.scrollTo(0, 0);
  };

  const renderHeader = () => (
    <header className="bg-white/90 backdrop-blur-lg text-slate-800 sticky top-0 z-50 border-b border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-1.5" 
          onClick={() => handleNavigation('list')}
        >
          <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center text-white">
            <Icons.Home />
          </div>
          צימר<span className="text-sky-500">Finder</span>
        </h1>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-2 items-center bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100">
          <button 
            onClick={() => handleNavigation('list')}
            className={`px-5 py-2 rounded-xl flex items-center gap-2 transition-all font-bold text-sm ${viewMode === 'list' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'}`}
          >
            <Icons.List /> רשימה
          </button>
          <button 
            onClick={() => handleNavigation('swipe')}
            className={`px-5 py-2 rounded-xl flex items-center gap-2 transition-all font-bold text-sm ${viewMode === 'swipe' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'}`}
          >
            <Icons.Layers /> החלקה
          </button>
          <div className="w-px h-5 bg-slate-200 mx-1"></div>
          <button 
            onClick={() => handleNavigation('favorites')}
            className={`px-5 py-2 rounded-xl flex items-center gap-2 transition-all font-bold text-sm ${viewMode === 'favorites' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-500 hover:text-rose-500 hover:bg-rose-50'}`}
          >
            <div className="relative">
              <Icons.Heart filled={viewMode === 'favorites'} className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                  {favorites.length}
                </span>
              )}
            </div>
            מועדפים
          </button>
        </div>
      </div>
    </header>
  );

  const renderBottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center h-16 pb-safe z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <button onClick={() => handleNavigation('list')} className={`flex flex-col items-center gap-1 w-20 transition-colors ${viewMode === 'list' ? 'text-sky-500' : 'text-slate-400'}`}>
        <Icons.Search />
        <span className="text-[10px] font-bold">חיפוש</span>
      </button>
      <button onClick={() => handleNavigation('swipe')} className={`flex flex-col items-center gap-1 w-20 transition-colors ${viewMode === 'swipe' ? 'text-sky-500' : 'text-slate-400'}`}>
        <Icons.Layers />
        <span className="text-[10px] font-bold">החלקה</span>
      </button>
      <button onClick={() => handleNavigation('favorites')} className={`flex flex-col items-center gap-1 w-20 relative transition-colors ${viewMode === 'favorites' ? 'text-rose-500' : 'text-slate-400'}`}>
        <div className="relative">
          <Icons.Heart filled={viewMode === 'favorites'} />
          {favorites.length > 0 && <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">{favorites.length}</span>}
        </div>
        <span className="text-[10px] font-bold">מועדפים</span>
      </button>
    </div>
  );

  const renderHeroSearch = () => {
    if (viewMode === 'favorites' || selectedZimmer) return null;
    
    return (
      <div className="bg-slate-900 pb-12 pt-8 px-4 transition-all relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          {viewMode === 'list' && (
            <div className="text-white mb-8 text-center md:text-right mt-4">
              <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">מצאו את החופשה הבאה שלכם</h2>
              <p className="text-slate-300 font-medium md:text-lg">צימרים, וילות ומקומות אירוח בוטיק ברחבי הארץ</p>
            </div>
          )}
          
          <div className="bg-white/10 backdrop-blur-md p-1.5 md:p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-2 shadow-2xl border border-white/20">
            <div className="flex-1 bg-white rounded-xl md:rounded-full flex items-center px-4 md:px-6 py-3.5 gap-3 shadow-inner">
              <div className="text-sky-500"><Icons.MapPin /></div>
              <input 
                type="text" 
                placeholder="לאן תרצו לנסוע?" 
                className="w-full outline-none text-slate-800 bg-transparent placeholder-slate-400 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 px-8 rounded-xl md:rounded-full transition-all text-lg shadow-lg shadow-sky-500/30 active:scale-95 w-full md:w-auto flex justify-center items-center gap-2">
              <Icons.Search /> חיפוש
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFiltersContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-3">תקציב ללילה (עד ₪{maxPrice})</label>
        <input 
          type="range" min="500" max="3000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-sky-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
          <span>₪500</span><span>₪3000+</span>
        </div>
      </div>
      <hr className="border-slate-100" />
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-4">מתקנים פופולריים</label>
        <div className="space-y-3.5">
          {allAmenities.map(amenity => {
            const isChecked = selectedAmenities.includes(amenity);
            return (
              <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isChecked ? 'bg-sky-500 border-sky-500 text-white shadow-sm' : 'bg-slate-50 border-slate-300 group-hover:border-sky-400'}`}>
                  {isChecked && <Icons.Check className="w-3.5 h-3.5" />}
                </div>
                <input 
                  type="checkbox" className="hidden" checked={isChecked}
                  onChange={() => setSelectedAmenities(isChecked ? selectedAmenities.filter(a => a !== amenity) : [...selectedAmenities, amenity])}
                />
                <span className={`text-sm font-medium ${isChecked ? 'text-slate-900' : 'text-slate-600'}`}>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderPropertyCard = (zimmer) => {
    const isFav = favorites.find(f => f.id === zimmer.id);
    
    return (
      <div 
        key={zimmer.id} onClick={() => setSelectedZimmer(zimmer)}
        className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col sm:flex-row mb-6 cursor-pointer group active:scale-[0.99]"
      >
        <div className="sm:w-[35%] relative h-64 sm:h-auto overflow-hidden">
          <img src={zimmer.image} alt={zimmer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          <button 
            onClick={(e) => toggleFavorite(zimmer, e)}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10"
          >
            <Icons.Heart filled={isFav} className={isFav ? "text-rose-500 w-5 h-5" : "text-slate-400 w-5 h-5"} />
          </button>
        </div>
        
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">{zimmer.name}</h3>
              <div className="bg-sky-50 text-sky-600 font-bold px-2 py-1 rounded-lg text-sm flex items-center gap-1 border border-sky-100">
                <Icons.Star /> {zimmer.rating}
              </div>
            </div>
            
            <div className="text-sm text-slate-500 mb-4 font-medium flex items-center gap-1.5">
              <Icons.MapPin /> {zimmer.location}
            </div>
            <p className="text-slate-600 text-sm line-clamp-2 mb-5 leading-relaxed">{zimmer.description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mt-auto pt-4 border-t border-slate-50">
            <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-0">
              {zimmer.amenities.slice(0, 3).map((a, i) => (
                <span key={i} className="bg-slate-50 text-slate-600 text-[11px] font-bold px-2.5 py-1.5 rounded-md border border-slate-100">{a}</span>
              ))}
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 font-bold mb-0.5 uppercase tracking-wider">מחיר ללילה</div>
              <div className="text-2xl font-black text-slate-900">₪{zimmer.price}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-72 flex-shrink-0">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 sticky top-28">
            <h3 className="font-black text-lg mb-6 flex items-center gap-2 text-slate-900">
              <Icons.Filter /> סינון תוצאות
            </h3>
            {renderFiltersContent()}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {searchQuery ? `תוצאות עבור "${searchQuery}"` : 'כל היעדים'} 
              <span className="text-slate-400 text-lg font-medium mx-2">({swipeQueue.length})</span>
            </h2>
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 shadow-sm"
            >
              <Icons.Filter /> סינון
            </button>
          </div>
          
          {swipeQueue.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
              <div className="text-slate-300 mb-4 flex justify-center w-16 h-16 bg-slate-50 rounded-full items-center mx-auto"><Icons.Search /></div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">לא מצאנו תוצאות</h3>
              <p className="text-slate-500 mb-6">נסו לשנות את הסינונים או לחפש אזור אחר.</p>
              <button onClick={() => {setMaxPrice(3000); setSelectedAmenities([]); setSearchQuery('');}} className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl">נקה הכל</button>
            </div>
          ) : (
            <div className="space-y-2">{swipeQueue.map(renderPropertyCard)}</div>
          )}
        </div>
      </div>
      
      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex flex-col justify-end md:hidden">
          <div className="bg-white w-full rounded-t-[2rem] p-6 pb-safe max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-xl text-slate-900">סינון מתקדם</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-slate-100 rounded-full text-slate-500"><Icons.X /></button>
            </div>
            {renderFiltersContent()}
            <button onClick={() => setShowMobileFilters(false)} className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl mt-8 text-lg shadow-lg active:scale-95 transition-transform">
              הצג {swipeQueue.length} מקומות
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderDetailsView = () => {
    const z = selectedZimmer;
    const isFav = favorites.find(f => f.id === z.id);

    return (
      <div className="bg-white min-h-screen pb-24 md:pb-0 animate-fade-in w-full">
        <div className="relative h-72 sm:h-96 md:h-[450px] w-full">
          <img src={z.image} alt={z.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent pointer-events-none"></div>
          
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center max-w-5xl mx-auto z-10">
            <button onClick={() => setSelectedZimmer(null)} className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-105 transition-transform text-slate-800">
              <Icons.ChevronRight /> 
            </button>
            <button onClick={() => toggleFavorite(z)} className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-105 transition-transform">
              <Icons.Heart filled={isFav} className={isFav ? "text-rose-500 w-6 h-6" : "text-slate-600 w-6 h-6"} />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-5 py-8 relative -mt-10 bg-white rounded-t-[2rem] md:mt-0 md:rounded-none z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:shadow-none">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-lg text-sm font-bold border border-sky-100 flex items-center gap-1.5">
                   <Icons.Star /> {z.rating}
                </span>
                <span className="text-slate-500 text-sm font-medium border-r border-slate-200 pr-2">מבוסס על {z.reviews} חוות דעת</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2">{z.name}</h1>
              <p className="text-slate-500 flex items-center gap-1.5 text-lg font-medium"><Icons.MapPin /> {z.location}</p>
            </div>
            
            {/* Desktop Price Box */}
            <div className="hidden md:block bg-slate-50 p-6 rounded-3xl border border-slate-100 min-w-[280px]">
              <div className="text-slate-500 text-sm font-bold mb-1">החל מ-</div>
              <div className="text-4xl font-black text-slate-900 mb-6">₪{z.price} <span className="text-lg font-medium text-slate-500">/ לילה</span></div>
              <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-sky-500/30 transition-all active:scale-95">
                בדוק זמינות
              </button>
            </div>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">על המקום</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{z.description}</p>
              <p className="text-slate-600 leading-relaxed mt-4">
                חווית אירוח בלתי נשכחת עם דגש על הפרטים הקטנים. המקום מציע אווירה פסטורלית, עיצוב מוקפד ונוחות מקסימלית שתגרום לכם להרגיש בבית מהרגע הראשון.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">מה תמצאו כאן?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {z.amenities.map(a => (
                  <div key={a} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 border border-sky-100/50">
                      <Icons.Check className="text-sky-500 w-5 h-5" />
                    </div>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Mobile Sticky Booking Bar */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 shadow-[0_-15px_30px_rgba(0,0,0,0.05)] z-50 pb-safe">
          <div className="flex justify-between items-center">
             <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">מחיר ללילה</div>
                <div className="text-2xl font-black text-slate-900">₪{z.price}</div>
             </div>
             <button className="bg-sky-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-sky-500/30 active:scale-95 text-lg">
                הזמן עכשיו
             </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSwipeView = () => {
    const hasMore = currentSwipeIndex < swipeQueue.length;

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50 w-full min-h-[calc(100vh-200px)] relative overflow-hidden">
        <div className="mb-6 text-center relative z-10 pt-4">
          <h2 className="text-2xl font-black text-slate-900 mb-1">גלו מקומות חדשים</h2>
          <p className="text-slate-500 text-sm font-medium">החליקו ימינה לשמור, שמאלה לדלג</p>
        </div>

        <div className="relative w-full max-w-[340px] h-[520px] z-10">
          {!hasMore ? (
            <div className="absolute inset-0 bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6"><Icons.Check className="w-10 h-10" /></div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">ראיתם הכל!</h3>
              <p className="text-slate-500 mb-8 text-sm">אין יותר צימרים שעונים על הסינון שלכם כרגע.</p>
              <button onClick={() => handleNavigation('list')} className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold w-full active:scale-95 transition-transform">
                חזרה לרשימה
              </button>
            </div>
          ) : (
            swipeQueue.slice(currentSwipeIndex, currentSwipeIndex + 3).reverse().map((zimmer, idx, arr) => {
              const isTop = idx === arr.length - 1;
              const stackIndex = arr.length - 1 - idx;
              
              return (
                <div 
                  key={zimmer.id}
                  className="absolute inset-0 transition-transform duration-300 ease-out"
                  style={{
                    transform: isTop ? 'none' : `scale(${1 - stackIndex * 0.05}) translateY(${stackIndex * 15}px)`,
                    zIndex: isTop ? 10 : 10 - stackIndex,
                    opacity: isTop ? 1 : 1 - stackIndex * 0.4
                  }}
                >
                  <SwipeCard zimmer={zimmer} active={isTop} onSwipe={handleSwipe} />
                </div>
              );
            })
          )}
        </div>

        {hasMore && (
          <div className="flex gap-6 mt-8 z-10 pb-8">
            <button onClick={() => handleSwipe('left', swipeQueue[currentSwipeIndex])} className="w-14 h-14 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 active:scale-90 transition-all">
              <Icons.X />
            </button>
            <button onClick={() => handleSwipe('right', swipeQueue[currentSwipeIndex])} className="w-14 h-14 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-rose-400 hover:text-rose-500 active:scale-90 transition-all">
              <Icons.Heart filled={true} className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderFavoritesView = () => (
    <div className="max-w-4xl mx-auto px-4 py-10 w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-rose-100 p-2.5 rounded-xl"><Icons.Heart filled={true} className="text-rose-500 w-6 h-6" /></div>
        <h2 className="text-3xl font-black text-slate-900">השמירות שלי</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300"><Icons.Heart className="w-8 h-8" /></div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">עדיין לא שמרתם מקומות</h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm">לחצו על הלב בתצוגת הרשימה או החליקו ימינה בתצוגת טינדר כדי לשמור כאן צימרים.</p>
          <button onClick={() => handleNavigation('swipe')} className="bg-sky-500 text-white font-bold py-3 px-8 rounded-xl active:scale-95 transition-transform shadow-md">
            התחילו לחפש
          </button>
        </div>
      ) : (
        <div className="space-y-4">{favorites.map(renderPropertyCard)}</div>
      )}
    </div>
  );

  return (
    <div dir="rtl" className="min-h-[100dvh] bg-slate-50 font-sans text-right flex flex-col">
      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
      
      {!selectedZimmer && renderHeader()}
      {!selectedZimmer && renderHeroSearch()}
      
      <main className="flex-1 flex flex-col w-full pb-16 md:pb-0">
        {selectedZimmer ? renderDetailsView() : (
          <>
            {viewMode === 'list' && renderListView()}
            {viewMode === 'swipe' && renderSwipeView()}
            {viewMode === 'favorites' && renderFavoritesView()}
          </>
        )}
      </main>

      {!selectedZimmer && renderBottomNav()}

      {toastMessage && (
        <div className="fixed top-24 md:top-auto md:bottom-10 left-1/2 transform -translate-x-1/2 z-[100] bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-slide-up text-sm font-bold">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
