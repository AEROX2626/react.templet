import React, { useState, useEffect } from 'react';

// Custom Inline SVGs for Lucide Icons to ensure reliable rendering without external dependency issues
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Selected service for detailed modal popup
  const [selectedService, setSelectedService] = useState(null);
  
  // Case studies active filter
  const [caseFilter, setCaseFilter] = useState('all');

  // Lead Modal Popup (Audit) state
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [auditForm, setAuditForm] = useState({ name: '', phone: '', email: '', website: '' });

  // Main Contact Form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: 'קידום ממומן',
    budget: 10000,
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // ROI Calculator States
  const [calcBudget, setCalcBudget] = useState(15000); // 15k NIS default
  const [calcCpc, setCalcCpc] = useState(4.5); // Average cost per click (NIS)
  const [calcConvRate, setCalcConvRate] = useState(2.2); // 2.2% Conversion rate
  const [calcAvgValue, setCalcAvgValue] = useState(850); // Average sale value (NIS)

  // Auto trigger audit modal after 8 seconds (only once)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuditModalOpen(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Services data
  const services = [
    {
      id: 'seo',
      title: 'קידום אורגני בגוגל (SEO)',
      shortDesc: 'להופיע במקומות הראשונים בתוצאות החיפוש הטבעיות בגוגל ולהזרים תנועה איכותית ורווחית לטווח הארוך.',
      icon: '🔍',
      detailedDesc: 'קידום אורגני (SEO) הוא המפתח לנוכחות דיגיטלית יציבה שאינה תלויה בתקציב מדיה יומי. אנחנו בדיגיטל וייב מתמחים באופטימיזציה טכנולוגית עמוקה של האתר, כתיבת תוכן ערכי וממוקד לקוח, ובניית פרופיל קישורים חזק וסמכותי.',
      bullets: [
        'מחקר מילות מפתח מקיף ואנליזת מתחרים קשוחה',
        'אופטימיזציית On-Page קפדנית (קוד, מהירות טעינה, חווית משתמש)',
        'אסטרטגיית תוכן חכמה שגוגל אוהב והגולשים מעריצים',
        'בניית פרופיל קישורים איכותי מאתרים מובילים בישראל',
        'דוחות שקופים מדי חודש עם מעקב מיקומים ותנועה'
      ],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'ppc',
      title: 'פרסום ממומן (Google & Social PPC)',
      shortDesc: 'קמפיינים ממוקדי המרות ולידים בגוגל, פייסבוק, אינסטגרם, לינקדאין וטיקטוק עם אופטימיזציה יומיומית.',
      icon: '🚀',
      detailedDesc: 'להגיע לקהל היעד המדויק ביותר ברגע המושלם. אנו מנהלים תקציבי פרסום גדולים בתוצאות חסרות פשרות, תוך שימוש בכלי טרגוט מתקדמים, קריאייטיב פורץ דרך ואסטרטגיית רימרקטינג (שיווק מחדש) מתקדמת.',
      bullets: [
        'קמפיינים ברשת החיפוש, דיספליי ו-Shopping בגוגל',
        'פרסום מפולח ברשתות Meta (פייסבוק ואינסטגרם)',
        'קמפיינים יצירתיים בטיקטוק וטרגוט עסקי בלינקדאין',
        'עיצוב באנרים וקריאייטיב מנצח המניע לפעולה',
        'שיפור מתמיד של יחס ההמרה (CRO) ועלות הרכישה (CPA)'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'social',
      title: 'ניהול רשתות חברתיות 360 (SMO)',
      shortDesc: 'בניית קהילה נאמנה, שפה מותגית ייחודית ויצירת תוכן ויזואלי מהפנט שיוצר מעורבות אמיתית.',
      icon: '📱',
      detailedDesc: 'הנוכחות החברתית שלכם היא כרטיס הביקור החי של העסק. אנחנו מפיחים חיים בדפים העסקיים שלכם דרך כתיבה קריאייטיבית, תכנון גאנט חודשי מוקפד, ניהול תגובות ואינטראקציה, ועיצוב ויזואלי ברמה הגבוהה ביותר.',
      bullets: [
        'יצירת שפה ויזואלית וטקסטואלית ייחודית למותג',
        'כתיבה ועיצוב פוסטים, סטוריז וסרטוני Reels/TikTok',
        'ניהול קהילות ומענה אקטיבי לגולשים להגברת הנאמנות',
        'שיתופי פעולה עם משפיענים ומובילי דעת קהל',
        'מדידה חודשית של חשיפה, מעורבות וגידול אורגני'
      ],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'native',
      title: 'פרסום בטאבולה ואאוטבריין (Native)',
      shortDesc: 'חשיפה באתרי התוכן הגדולים בישראל (Ynet, Mako, וכו\') באמצעות כתבות תדמית ממוקדות המרות.',
      icon: '📰',
      detailedDesc: 'פרסום נייטיב מאפשר לכם לפגוש את הגולש במצב רוח של קריאה ולמידה. אנו מייצרים כתבות תוכן מרתקות המספקות ערך אמיתי, המנווטות את הקורא בצורה חכמה ומתוחכמת אל עבר השארת פרטים או רכישה.',
      bullets: [
        'כתיבת כתבות תוכן ואאוטליין שיווקי המותאם לנישה שלכם',
        'הפצת כתבות ברשתות Taboola ו-Outbrain באתרי המדיה המובילים',
        'סגמנטציה מתקדמת והפרדת קהלים קרים לעומת קהלים חמים',
        'יצירת כותרות ותמונות מסקרנות בבדיקות A/B Testing קבועות',
        'חיבור פיקסלים מתקדמים למדידת המרות ישירות מהכתבה'
      ],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'sites',
      title: 'ניהול ואופטימיזציית אתרים 360',
      shortDesc: 'שירות מקיף המבטיח שהאתר שלכם עובד ללא הפסקה, נראה מעולה, מהיר ומאובטח במערכות וורדפרס ואי-שופ.',
      icon: '🛠️',
      detailedDesc: 'האתר שלכם הוא הלב הפועם של הפעילות הדיגיטלית. אנחנו לוקחים אחריות מלאה על הזמינות, האבטחה, עדכוני המערכת, והטמעת שינויים עיצוביים או פונקציונליים באופן שוטף כדי שהאתר יתפקד כמכונת המרות משומנת.',
      bullets: [
        'תחזוקה שוטפת, גיבויים ואבטחת מידע קפדנית',
        'שיפור מהירות טעינה וחוויית משתמש (Core Web Vitals)',
        'העלאת מוצרים, עדכון תכנים ובאנרים עיצוביים',
        'ניהול חנויות אי-קומרס (WooCommerce, E-shop ועוד)',
        'אינטגרציה של מערכות סליקה, CRM וניוזלטרים'
      ],
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'strategy',
      title: 'אסטרטגיה שיווקית ואנליטיקס',
      shortDesc: 'בניית מפת דרכים אסטרטגית מבוססת דאטה וחיבור תשתיות מדידה מדויקות (GA4, GTM).',
      icon: '📊',
      detailedDesc: 'אנחנו עובדים חכם ופשוט – לא יוצאים לדרך בלי אסטרטגיה מותאמת אישית לכל עסק, ולא ממשיכים בלי מדידת נתונים אבסולוטית. אנו מנתחים, מעבדים ומייצרים תובנות שיווקיות שמייצרות עבורכם את מקסימום התוצאות.',
      bullets: [
        'בניית תמהיל תקציב שיווק רב-ערוצי (Omnichannel)',
        'הטמעת Google Analytics 4 ו-Google Tag Manager מתקדם',
        'הגדרת משפכי המרה מדויקים ומעקב אחר מסע הגולש',
        'דוחות ביצועים דינמיים בזמן אמת (Looker Studio)',
        'פגישות ייעוץ אסטרטגיות תקופתיות להתאמת הפעילות לשינויי השוק'
      ],
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  // Case Studies data
  const caseStudies = [
    {
      id: 1,
      category: 'ecommerce',
      company: 'שופ-סטייל (מותג אופנה אונליין)',
      achievement: 'גידול של 340% במכירות תוך 4 חודשים',
      details: 'החלפנו את מערך הקמפיינים הקיים באסטרטגיית פרסום דינמית בגוגל שופינג ומטא בשילוב רימרקטינג מותאם אישית.',
      stats: { primary: '+340%', secondary: 'פי 4.2 ROI' },
      tag: 'אי-קומרס'
    },
    {
      id: 2,
      category: 'b2b',
      company: 'חברת הייטק סינרג\'י',
      achievement: '180 לידים איכותיים בחודש מקהל יעד גלובלי',
      details: 'קמפיין ממוקד להפליא בלינקדאין וגוגל חיפוש עם דפי נחיתה ייעודיים שהציעו מדריך מקצועי מותאם לתעשייה.',
      stats: { primary: '180 לידים/חודש', secondary: '-45% בעלות ליד' },
      tag: 'B2B & הייטק'
    },
    {
      id: 3,
      category: 'local',
      company: 'מרכז רפואי מדיקל-אסתטיקס',
      achievement: 'מילוי יומן תורים חודשי קדימה באופן קבוע',
      details: 'שילוב של קידום אורגני לביטויי מפתח חזקים בגאוגרפיה ספציפית וקמפיינים ממומנים מבוססי מיקום וסרטוני המלצות.',
      stats: { primary: '100% תפוסה', secondary: 'מקום 1 בגוגל' },
      tag: 'עסקים מקומיים'
    },
    {
      id: 4,
      category: 'ecommerce',
      company: 'רהיטי מעצבים "קאזה"',
      achievement: 'החזר השקעה ממוצע של 1:8 בקמפיינים',
      details: 'בנינו קהלי יעד דומים (Lookalike) מבוססי רוכשים קודמים ופרסמנו קטלוג מוצרים חכם המותאם למחפשי עיצוב הבית.',
      stats: { primary: 'ROI 1:8', secondary: '+120% סל קניה ממוצע' },
      tag: 'אי-קומרס'
    },
    {
      id: 5,
      category: 'b2b',
      company: 'סוכנות ביטוח "עתיד בטוח"',
      achievement: 'הקמת מכונת לידים חמה דרך טאבולה',
      details: 'כתיבת כתבת תוכן אודות שינויים ברפורמת הפנסיה והפצתה בטאבולה ואאוטבריין. הכתבה הניבה אחוזי המרה חסרי תקדים.',
      stats: { primary: '540+ לידים', secondary: '92% איכות גבוהה' },
      tag: 'פיננסים וביטוח'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'רן לוי',
      role: 'מנכ"ל שופ-סטייל',
      text: 'עבדנו עם לא מעט משרדי פרסום בעבר, אבל ב-Digital Vibe מצאנו שותפים אמיתיים לדרך. הנתונים לא משקרים - המכירות שלנו הגיעו לשיא חדש והליווי האישי והשקיפות מלאים.',
      avatar: '👨‍💼'
    },
    {
      name: 'מיכל אהרוני',
      role: 'סמנכ"לית שיווק, Synergy Group',
      text: 'תפעול קמפיין B2B מורכב הוא משימה קשה מאוד. הצוות של דיגיטל וייב פיצח את הקהל שלנו בלינקדאין והביא לנו לידים איכותיים מחברות ענק בחו"ל. ממליצה בחום!',
      avatar: '👩‍💼'
    },
    {
      name: 'ד"ר אלון שגב',
      role: 'בעלים, מדיקל אסתטיקס',
      text: 'הקידום האורגני שלהם פשוט קסם. אנחנו נמצאים במקומות הראשונים במילות החיפוש הכי תחרותיות בתחום האסתטיקה הרפואית. הטלפון במרפאה לא מפסיק לצלצל.',
      avatar: '👨‍ק'
    }
  ];

  // Calculator Logic Formulator
  const calculateROI = () => {
    // Basic Calculations based on current state variables
    const estimatedClicks = Math.round(calcBudget / calcCpc);
    const estimatedConversions = Math.round(estimatedClicks * (calcConvRate / 100));
    const estimatedRevenue = Math.round(estimatedConversions * calcAvgValue);
    const estimatedRoi = calcBudget > 0 ? ((estimatedRevenue - calcBudget) / calcBudget * 100).toFixed(0) : 0;
    const estimatedCpa = estimatedConversions > 0 ? Math.round(calcBudget / estimatedConversions) : 0;

    // Vibe optimized metrics (simulate Digital Vibe optimization results: usually +30% conv rate, -15% CPC)
    const vibeCpc = Math.max(1, +(calcCpc * 0.85).toFixed(2));
    const vibeConvRate = +(calcConvRate * 1.35).toFixed(2);
    
    const vibeClicks = Math.round(calcBudget / vibeCpc);
    const vibeConversions = Math.round(vibeClicks * (vibeConvRate / 100));
    const vibeRevenue = Math.round(vibeConversions * calcAvgValue);
    const vibeRoi = calcBudget > 0 ? ((vibeRevenue - calcBudget) / calcBudget * 100).toFixed(0) : 0;
    const vibeCpa = vibeConversions > 0 ? Math.round(calcBudget / vibeConversions) : 0;

    return {
      clicks: estimatedClicks,
      conversions: estimatedConversions,
      revenue: estimatedRevenue,
      roi: estimatedRoi,
      cpa: estimatedCpa,
      vibe: {
        cpc: vibeCpc,
        clicks: vibeClicks,
        convRate: vibeConvRate,
        conversions: vibeConversions,
        revenue: vibeRevenue,
        roi: vibeRoi,
        cpa: vibeCpa,
        revenueGain: vibeRevenue - estimatedRevenue
      }
    };
  };

  const results = calculateROI();

  // Handlers for inputs
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.email) {
      return;
    }
    // Simulation of API request
    setContactSubmitted(true);
  };

  const handleAuditSubmit = (e) => {
    e.preventDefault();
    if (!auditForm.name || !auditForm.phone) {
      return;
    }
    setAuditSubmitted(true);
    setTimeout(() => {
      setIsAuditModalOpen(false);
      setAuditSubmitted(false);
      setAuditForm({ name: '', phone: '', email: '', website: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans selection:bg-purple-600 selection:text-white antialiased" dir="rtl">
      
      {/* Top microbar */}
      <div className="bg-[#080B12] border-b border-gray-800 text-xs text-gray-400 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <PhoneIcon />
              <a href="tel:03-723-2339" className="hover:text-purple-400 transition-colors">03-723-2339</a>
            </span>
            <span className="flex items-center gap-1">
              <MailIcon />
              <a href="mailto:info@digitalvibe.co.il" className="hover:text-purple-400 transition-colors">info@digitalvibe.co.il</a>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>משרד פרסום דיגיטלי מתקדם מאז 2008</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>זמינים להתחלת פרויקט חדש</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navbar */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-md border-b border-gray-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-lg shadow-purple-500/20">
              DV
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-l from-white via-gray-100 to-purple-400 bg-clip-text text-transparent tracking-wide">DIGITAL VIBE</span>
              <span className="block text-[9px] text-purple-400 font-bold uppercase tracking-widest -mt-1">שיווק דיגיטלי חכם</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => { setActiveTab('home'); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${activeTab === 'home' ? 'text-purple-400' : 'text-gray-300'}`}
            >
              דף הבית
            </button>
            <button 
              onClick={() => { setActiveTab('services'); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${activeTab === 'services' ? 'text-purple-400' : 'text-gray-300'}`}
            >
              שירותי המשרד
            </button>
            <button 
              onClick={() => { setActiveTab('roi'); document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${activeTab === 'roi' ? 'text-purple-400' : 'text-gray-300'}`}
            >
              מחשבון ROI שיווקי
            </button>
            <button 
              onClick={() => { setActiveTab('cases'); document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${activeTab === 'cases' ? 'text-purple-400' : 'text-gray-300'}`}
            >
              סיפורי הצלחה
            </button>
            <button 
              onClick={() => { setActiveTab('about'); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${activeTab === 'about' ? 'text-purple-400' : 'text-gray-300'}`}
            >
              אודות
            </button>
            <button 
              onClick={() => { setActiveTab('contact'); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${activeTab === 'contact' ? 'text-purple-400' : 'text-gray-300'}`}
            >
              צור קשר
            </button>
          </nav>

          {/* Nav CTA button */}
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => setIsAuditModalOpen(true)}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/30 hover:border-purple-500/60 bg-purple-500/5 hover:bg-purple-500/10 px-4 py-2.5 rounded-xl"
            >
              בדיקת אתר חינם 🚀
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-l from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30"
            >
              שיחת ייעוץ חינם
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <MenuIcon />
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/98 flex flex-col justify-between p-6 border-l border-gray-800 animate-fadeIn">
          <div>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black">DV</div>
                <span className="text-lg font-black text-white">DIGITAL VIBE</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                <CloseIcon />
              </button>
            </div>
            
            <nav className="flex flex-col gap-5 text-lg font-bold">
              <button 
                onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-right py-2 border-b border-gray-900 text-gray-200 hover:text-purple-400"
              >
                דף הבית
              </button>
              <button 
                onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-right py-2 border-b border-gray-900 text-gray-200 hover:text-purple-400"
              >
                שירותי המשרד
              </button>
              <button 
                onClick={() => { setActiveTab('roi'); setMobileMenuOpen(false); document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-right py-2 border-b border-gray-900 text-gray-200 hover:text-purple-400"
              >
                מחשבון ROI שיווקי
              </button>
              <button 
                onClick={() => { setActiveTab('cases'); setMobileMenuOpen(false); document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-right py-2 border-b border-gray-900 text-gray-200 hover:text-purple-400"
              >
                סיפורי הצלחה
              </button>
              <button 
                onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-right py-2 border-b border-gray-900 text-gray-200 hover:text-purple-400"
              >
                אודות
              </button>
              <button 
                onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-right py-2 border-b border-gray-900 text-gray-200 hover:text-purple-400"
              >
                צור קשר
              </button>
            </nav>
          </div>

          <div className="flex flex-col gap-4 mt-12">
            <button 
              onClick={() => { setIsAuditModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-center font-bold text-purple-400 border border-purple-500/30 bg-purple-500/5 py-3 rounded-xl"
            >
              בדיקת אתר חינם 🚀
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full text-center bg-gradient-to-l from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl"
            >
              שיחת ייעוץ חינם
            </button>
            <div className="text-center text-xs text-gray-500 mt-4">
              03-723-2339 | החשמונאים 91, תל אביב
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="home" className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Background ambient glow shapes */}
        <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left/Main Column - Content */}
            <div className="lg:col-span-7 text-right">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                משרד בוטיק לשיווק דיגיטלי מבוסס ביצועים ודאטה
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-6">
                מייצרים לכם <br />
                <span className="bg-gradient-to-l from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  תוצאות ומכירות,
                </span> <br />
                לא רק הבטחות.
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                אנחנו ב-**Digital Vibe** מאמינים בשיווק פשוט, חכם ומדיד. מאז 2008 אנו מלווים מותגים ישראלים ובינלאומיים בבניית אסטרטגיות שיווק מנצחות, קמפיינים ממומנים שוברות שיאים, קידום אורגני יציב ופתרונות 360 מעלות.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-l from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-lg shadow-purple-600/30 hover:-translate-y-0.5"
                >
                  בואו נדבר תכלס
                </button>
                <button 
                  onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gray-800/80 hover:bg-gray-800 text-gray-100 font-bold text-lg px-8 py-4 rounded-2xl transition-all border border-gray-700 hover:border-purple-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <TrendingUpIcon />
                  חשבו את ה-ROI שלכם
                </button>
              </div>

              {/* Features inline list */}
              <div className="grid grid-cols-3 gap-4 border-t border-gray-800/80 pt-8 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">16+</div>
                  <div className="text-xs text-gray-400 mt-1">שנות ניסיון מוכח</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">₪140M+</div>
                  <div className="text-xs text-gray-400 mt-1">ניהול תקציבי מדיה</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">320%</div>
                  <div className="text-xs text-gray-400 mt-1">עלייה ממוצעת ב-ROI</div>
                </div>
              </div>

            </div>

            {/* Right Column - Visual representation */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Glassmorphic Dashboard Card */}
                <div className="bg-gradient-to-br from-gray-900/90 to-slate-900/95 border border-gray-800/80 p-6 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md">
                  
                  {/* Decorative dots */}
                  <div className="flex justify-between items-center border-b border-gray-800/80 pb-4 mb-6">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    </div>
                    <span className="text-xs text-purple-400 font-mono">DigitalVibe_Live_ROAS.js</span>
                  </div>

                  {/* Stat Card Internal */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs text-gray-400 block uppercase tracking-wider mb-1">תקציב שיווק חודשי מנוהל</span>
                      <div className="text-3xl font-black text-white flex items-baseline gap-1">
                        <span>₪184,500</span>
                        <span className="text-xs text-green-400 font-bold">+12% השבוע</span>
                      </div>
                    </div>

                    <div className="bg-[#080B12]/80 border border-gray-800/50 p-4 rounded-2xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-300">החזר השקעה (ROAS)</span>
                        <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full font-bold">שיא חדש!</span>
                      </div>
                      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        x5.84
                      </div>
                      
                      {/* Interactive simulated mini graph */}
                      <div className="h-16 flex items-end gap-1.5 mt-4">
                        <div className="bg-purple-600/30 w-full h-8 rounded-md transition-all"></div>
                        <div className="bg-purple-600/40 w-full h-10 rounded-md transition-all"></div>
                        <div className="bg-purple-600/50 w-full h-12 rounded-md transition-all"></div>
                        <div className="bg-purple-600/60 w-full h-9 rounded-md transition-all"></div>
                        <div className="bg-gradient-to-t from-purple-600 to-cyan-400 w-full h-16 rounded-md animate-pulse"></div>
                      </div>
                    </div>

                    {/* Active Campaign Box */}
                    <div className="flex items-center justify-between border-t border-gray-800/80 pt-4">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className="text-xs text-gray-300">אופטימיזציית AI פעילה</span>
                      </div>
                      <button 
                        onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                      >
                        בדקו סימולציה &larr;
                      </button>
                    </div>

                  </div>
                </div>

                {/* Overlapping Absolute Elements */}
                <div className="absolute -bottom-6 -right-6 bg-[#080B12] border border-gray-800/80 p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[200px] hidden sm:flex">
                  <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
                    <TrendingUpIcon />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">המרה ממוצעת</span>
                    <span className="text-base font-bold text-white">4.8% (עלייה)</span>
                  </div>
                </div>

                <div className="absolute -top-6 -left-6 bg-[#080B12] border border-gray-800/80 p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[200px] hidden sm:flex">
                  <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                    <AwardIcon />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">שותף גוגל רשמי</span>
                    <span className="text-xs font-bold text-white">Google Partner</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUSTED BY LOGO MARQUEE */}
      <section className="bg-[#080B12] border-y border-gray-800/60 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">התוצאות מדברות בעד עצמן – מעל 250 מותגים שבטחו בנו</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 hover:opacity-80 transition-opacity">
            <span className="text-lg md:text-xl font-black text-gray-400 tracking-wide font-mono">FINANCE PRO</span>
            <span className="text-lg md:text-xl font-black text-purple-400 tracking-wide font-mono">CASA FURNITURE</span>
            <span className="text-lg md:text-xl font-black text-gray-400 tracking-wide font-mono">SYNERGY GLOBAL</span>
            <span className="text-lg md:text-xl font-black text-cyan-400 tracking-wide font-mono">MEDICAL SPA</span>
            <span className="text-lg md:text-xl font-black text-gray-400 tracking-wide font-mono">STYLE GROUP</span>
          </div>
        </div>
      </section>

      {/* THE SERVICES SECTION (סל השירותים) */}
      <section id="services" className="py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-950/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-2">מגוון השירותים שלנו</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">פתרונות שיווק דיגיטלי מקצה לקצה</h2>
            <p className="text-gray-400">
              אנחנו לא מאמינים בפתרונות "פס ייצור". כל לקוח מקבל תמהיל אסטרטגי בהתאמה מדויקת ליעדים ולתקציב שלו. לחצו על כל שירות כדי לראות מה הוא כולל.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="group bg-gradient-to-b from-gray-900/40 to-slate-900/60 border border-gray-800/80 hover:border-purple-500/40 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/20 cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedService(service)}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>
                <div className="text-xs font-bold text-purple-400 group-hover:text-purple-300 flex items-center gap-1">
                  <span>קרא עוד אודות השירות</span>
                  <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Consultation Ribbon */}
          <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-cyan-950/20 border border-purple-500/20 p-8 md:p-10 rounded-3xl mt-16 text-center md:text-right flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">לא בטוחים איזה סל שירותים מתאים לעסק שלכם?</h3>
              <p className="text-gray-400 text-sm sm:text-base">אנחנו פה כדי לעזור לכם לבנות את המפה השיווקית הנכונה ביותר בשיחת ייעוץ קצרה וללא התחייבות.</p>
            </div>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg whitespace-nowrap"
            >
              בואו נתאים לכם חבילה
            </button>
          </div>

        </div>
      </section>

      {/* INTERACTIVE ROI CALCULATOR SECTION */}
      <section id="roi" className="py-24 bg-[#080B12] relative border-y border-gray-800/40">
        <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-cyan-600/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-widest inline-block mb-3">כלי מבוסס דאטה</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">מחשבון ROI שיווקי אינטראקטיבי</h2>
            <p className="text-gray-400 text-sm sm:text-base">
              תפסיקו לנחש ותתחילו לחשב. הזינו את תקציב השיווק המשוער שלכם ואת נתוני הנוכחות הנוכחיים שלכם, ותראו מה קורה כשמבצעים אופטימיזציה מקצועית של **Digital Vibe**.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Sliders & Controls (col-span-5) */}
            <div className="lg:col-span-5 bg-gray-900/50 border border-gray-800/80 p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3 mb-4">נתוני תקציב ויעדים</h3>
              
              {/* Slider 1: Marketing Budget */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300 font-medium">תקציב שיווק חודשי</span>
                  <span className="text-base font-black text-purple-400">₪{calcBudget.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="2500" 
                  value={calcBudget}
                  onChange={(e) => setCalcBudget(+e.target.value)}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>₪5,000</span>
                  <span>₪50,000</span>
                  <span>₪100,000</span>
                </div>
              </div>

              {/* Slider 2: CPC */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300 font-medium">עלות ממוצעת לקליק (CPC)</span>
                  <span className="text-base font-black text-purple-400">₪{calcCpc}</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="20" 
                  step="0.5" 
                  value={calcCpc}
                  onChange={(e) => setCalcCpc(+e.target.value)}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>₪0.5</span>
                  <span>₪10</span>
                  <span>₪20</span>
                </div>
              </div>

              {/* Slider 3: Conversion Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300 font-medium">אחוז המרה באתר לקוח/ליד</span>
                  <span className="text-base font-black text-purple-400">{calcConvRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="10" 
                  step="0.1" 
                  value={calcConvRate}
                  onChange={(e) => setCalcConvRate(+e.target.value)}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>0.1%</span>
                  <span>5%</span>
                  <span>10%</span>
                </div>
              </div>

              {/* Slider 4: Avg Sale/LTV Value */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300 font-medium">ערך ממוצע של רכישה / ליד חם</span>
                  <span className="text-base font-black text-purple-400">₪{calcAvgValue}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100" 
                  value={calcAvgValue}
                  onChange={(e) => setCalcAvgValue(+e.target.value)}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>₪100</span>
                  <span>₪5,000</span>
                  <span>₪10,000</span>
                </div>
              </div>

            </div>

            {/* Right Column: Comparative Results Dashboard (col-span-7) */}
            <div className="lg:col-span-7 grid gap-6">
              
              {/* Comparative Row */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Standard Results Card */}
                <div className="bg-slate-900/30 border border-gray-800 p-6 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-1.5 w-1/3 bg-gray-600"></div>
                  <h4 className="text-sm font-bold text-gray-400 mb-4">שיווק רגיל (ממוצע שוק)</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-500 block">תנועה חודשית (קליקים)</span>
                      <span className="text-xl font-bold text-white">{results.clicks.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">המרות משוערות</span>
                      <span className="text-xl font-bold text-white">{results.conversions} המרות</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">הכנסה חודשית צפויה</span>
                      <span className="text-2xl font-black text-white">₪{results.revenue.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-800/50 flex justify-between items-center">
                      <span className="text-xs text-gray-500">החזר השקעה (ROI)</span>
                      <span className="text-sm font-bold text-red-400">{results.roi}%</span>
                    </div>
                  </div>
                </div>

                {/* Digital Vibe Optimized Card */}
                <div className="bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border border-purple-500/40 p-6 rounded-3xl relative overflow-hidden shadow-xl shadow-purple-950/30">
                  <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-purple-500 to-cyan-400"></div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-purple-300">אופטימיזציית Digital Vibe</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-200 rounded-full font-bold">משודרג +35%</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-400 block">קליקים משודרגים (CPC נמוך יותר)</span>
                      <span className="text-xl font-bold text-white">{results.vibe.clicks.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">המרות משודרגות (אחוז המרה משופר)</span>
                      <span className="text-xl font-bold text-emerald-400">{results.vibe.conversions} המרות</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">הכנסה חודשית מוגדלת</span>
                      <span className="text-2xl font-black text-emerald-400">₪{results.vibe.revenue.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t border-purple-900/60 flex justify-between items-center">
                      <span className="text-xs text-gray-400">החזר השקעה (ROI)</span>
                      <span className="text-base font-black text-cyan-400">{results.vibe.roi}%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Incremental Improvement callout */}
              <div className="bg-gradient-to-r from-emerald-950/30 to-slate-900/80 border border-emerald-500/20 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-right">
                <div>
                  <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">תוספת רווח נקי פוטנציאלי בחודש</div>
                  <div className="text-3xl font-black text-white">₪{results.vibe.revenueGain.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">חישוב שמרני המבוסס על אופטימיזציית קמפיינים מקצועית של המומחים שלנו.</div>
                </div>
                <button 
                  onClick={() => {
                    const customMessage = `היי, חישבתי במחשבון ROI עם תקציב של ₪${calcBudget} ואשמח להבין איך להגיע להכנסה צפויה של ₪${results.vibe.revenue}.`;
                    setContactForm({ ...contactForm, message: customMessage, budget: calcBudget });
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-md whitespace-nowrap"
                >
                  לשריין שיחה למימוש הפוטנציאל
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SUCCESS STORIES SECTION (סיפורי הצלחה) */}
      <section id="cases" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-2">תוצאות מהשטח</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">הלקוחות שלנו גדלים - ובגדול</h2>
            <p className="text-gray-400 text-sm sm:text-base">
              עייפתם מדיבורים יפים? הנה הנתונים השקופים והאחוזים של מותגים ועסקים בדיוק כמוכם שעשו איתנו קפיצת מדרגה אמיתית.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'כל הפרויקטים' },
              { id: 'ecommerce', label: 'אי-קומרס וחנויות' },
              { id: 'b2b', label: 'B2B והייטק' },
              { id: 'local', label: 'עסקים מקומיים ורפואה' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCaseFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${caseFilter === tab.id ? 'bg-purple-600 text-white' : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies
              .filter(item => caseFilter === 'all' || item.category === caseFilter)
              .map((study) => (
                <div 
                  key={study.id}
                  className="bg-[#080B12]/80 border border-gray-800/80 p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-bold rounded-lg">
                        {study.tag}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">קייס סטאדי</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{study.company}</h3>
                    <p className="text-sm text-purple-300 font-semibold mb-3">{study.achievement}</p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-6">{study.details}</p>
                  </div>

                  <div className="border-t border-gray-800/60 pt-4 mt-auto flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase">תוצאה מרכזית</span>
                      <span className="text-lg font-black text-emerald-400">{study.stats.primary}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase">החזר השקעה</span>
                      <span className="text-sm font-bold text-cyan-400">{study.stats.secondary}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </section>

      {/* ABOUT US SECTION (מי אנחנו) */}
      <section id="about" className="py-24 bg-[#080B12] relative border-t border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual elements */}
            <div className="relative">
              <div className="aspect-video w-full rounded-3xl overflow-hidden bg-gradient-to-tr from-purple-900 to-indigo-950 p-1">
                <div className="w-full h-full bg-[#0B0F19] rounded-[22px] p-6 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Neon grid pattern in back */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-xs font-mono text-purple-400">// אודות דיגיטל וייב</span>
                    <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-bold">18+ אנשי מקצוע</span>
                  </div>

                  <div className="relative z-10 my-8">
                    <div className="text-2xl font-black text-white mb-3">שומרים על יציבות בעידן דיגיטלי משתנה</div>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                      החל משינויי האלגוריתמים של גוגל ומטא, ועד לפריצת הבינה המלאכותית (AI) - הצוות שלנו תמיד נמצא צעד אחד קדימה כדי להבטיח שהלקוחות שלנו מובילים.
                    </p>
                  </div>

                  <div className="relative z-10 flex gap-4 border-t border-gray-800/80 pt-4">
                    <div className="flex -space-x-2 overflow-hidden">
                      <span className="inline-block h-8 w-8 rounded-full bg-purple-600 text-center leading-8 text-xs font-bold text-white border-2 border-[#0B0F19]">רכ</span>
                      <span className="inline-block h-8 w-8 rounded-full bg-cyan-600 text-center leading-8 text-xs font-bold text-white border-2 border-[#0B0F19]">עב</span>
                      <span className="inline-block h-8 w-8 rounded-full bg-indigo-600 text-center leading-8 text-xs font-bold text-white border-2 border-[#0B0F19]">אנ</span>
                    </div>
                    <span className="text-xs text-gray-300 self-center">צוות הניהול המקצועי תמיד זמין לשירותכם</span>
                  </div>

                </div>
              </div>

              {/* Float box */}
              <div className="absolute -bottom-6 -left-4 bg-[#0B0F19] border border-gray-800 p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <div className="text-lg font-bold text-white mb-1">נוסדנו בשנת 2008</div>
                <p className="text-xs text-gray-400">על ידי רמי כהן (מנכ"ל), במטרה להוביל שיווק נטול פשרות מבוסס נתונים בלבד.</p>
              </div>
            </div>

            {/* Narrative */}
            <div className="text-right">
              <span className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-2">מי אנחנו?</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">משרד פרסום שהוא שותף עסקי לגידול שלכם</h2>
              
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  סוכנות **Digital Vibe (דיגיטל וייב בע"מ)** הוקמה בשנת 2008 מתוך חזון לפשט את עולמות השיווק והקידום המסועפים ולהנגיש אותם לעסקים כמודל מוצלח של השקעה והחזר.
                </p>
                <p>
                  אנו לא מאמינים בדיבורים באוויר, דוחות מעורפלים או הבטחות חסרות אחיזה. אנחנו שמים את הדגש על **אסטרטגיה מותאמת אישית, קריאייטיב חד ומדידת נתונים בלתי מתפשרת**.
                </p>
                <p>
                  הצוות שלנו מורכב ממקצוענים מובילים בתחומי ה-SEO, קמפיינרים מוסמכים בגוגל ומטא, מומחי נייטיב (טאבולה/אאוטבריין), מעצבים ומנהלי תוכן שחיים ונושמים את עולמות הדיגיטל 24/7.
                </p>
              </div>

              {/* Three Value Pillars */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-800">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">🤝</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">ליווי אישי</h4>
                    <span className="text-[10px] text-gray-400">חשיבה משותפת וקשר ישיר ומהיר</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">📊</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">100% שקיפות</h4>
                    <span className="text-[10px] text-gray-400">גישה מלאה לדוחות ולחשבונות</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">🎯</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">חתירה לתוצאות</h4>
                    <span className="text-[10px] text-gray-400">ממוקדי המרות ומכירות בפועל</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION (לקוחות ממליצים) */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-purple-400 font-bold text-sm uppercase tracking-wider block mb-2">חוות דעת ופידבקים</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">מה הלקוחות שלנו אומרים עלינו?</h2>
            <p className="text-gray-400">
              אין מחמאה גדולה יותר מלקוחות הממשיכים איתנו שנה אחר שנה וממליצים עלינו הלאה בגאווה.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-gradient-to-b from-gray-900/40 to-slate-900/60 border border-gray-800/80 p-8 rounded-3xl relative flex flex-col justify-between">
                
                {/* Quote sign */}
                <span className="absolute top-4 left-6 text-6xl text-purple-500/10 font-serif pointer-events-none">”</span>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic relative z-10">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-800/60 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <span className="text-xs text-gray-400">{t.role}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* AUDIT CALLOUT LEAD MAGNET (בדיקת אתר חינם) */}
      <section className="bg-gradient-to-r from-purple-950/20 via-[#0B0F19] to-indigo-950/20 py-16 border-y border-gray-800/40">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">רוצים לדעת איפה האתר והפרסום שלכם עומדים?</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            קבלו בדיקה ואופטימיזציה מקצועית חינמית לחלוטין של מומחי השיווק שלנו. נסרוק את האתר, נבדוק את הנוכחות שלכם בגוגל ונחזור אליכם עם תובנות שוות זהב.
          </p>
          <button 
            onClick={() => setIsAuditModalOpen(true)}
            className="bg-gradient-to-l from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg animate-pulse hover:animate-none"
          >
            שלחו לי אופטימיזציה חינם לאתר &larr;
          </button>
        </div>
      </section>

      {/* CONTACT FORM SECTION (צור קשר) */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Contact Information (col-span-5) */}
            <div className="lg:col-span-5 text-right flex flex-col justify-between">
              <div>
                <span className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-2">בואו נצא לדרך</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">מחכים לשמוע על הפרויקט הבא שלכם</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                  נשמח להכיר את העסק שלכם, לשמוע על היעדים והתקציבים שלכם, ולהכין לכם תוכנית עבודה מפורטת וחסרת פשרות להגדלת המכירות.
                </p>

                <div className="space-y-6">
                  
                  {/* Item 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                      <PhoneIcon />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">התקשרו אלינו ישירות</span>
                      <a href="tel:03-723-2339" className="text-lg font-bold text-white hover:text-purple-400 transition-colors">03-723-2339</a>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-600/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                      <MailIcon />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">שלחו לנו מייל שאלות</span>
                      <a href="mailto:info@digitalvibe.co.il" className="text-lg font-bold text-white hover:text-purple-400 transition-colors">info@digitalvibe.co.il</a>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-600/10 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/20">
                      <MapPinIcon />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">בקרו במשרדי החברה</span>
                      <span className="text-lg font-bold text-white">החשמונאים 91, תל אביב-יפו</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Badges/Partners */}
              <div className="border-t border-gray-800/80 pt-8 mt-12 hidden lg:block">
                <span className="text-xs text-gray-400 font-bold block mb-3">שותפי שיווק מוסמכים</span>
                <div className="flex gap-4 items-center opacity-70">
                  <span className="text-xs font-mono text-white tracking-widest bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg">GOOGLE PARTNER</span>
                  <span className="text-xs font-mono text-white tracking-widest bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg">META BUSINESS PARTNER</span>
                </div>
              </div>

            </div>

            {/* Lead Form Component (col-span-7) */}
            <div className="lg:col-span-7">
              <div className="bg-gray-900/50 border border-gray-800/80 p-6 sm:p-10 rounded-3xl relative overflow-hidden backdrop-blur-sm">
                
                {contactSubmitted ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-3xl border border-emerald-500/20 animate-bounce">
                      ✓
                    </div>
                    <h3 className="text-2xl font-black text-white">תודה רבה! הפנייה התקבלה בהצלחה</h3>
                    <p className="text-gray-300 max-w-md mx-auto text-sm sm:text-base">
                      הפרטים שלכם נרשמו במערכת **Digital Vibe**. מומחה שיווק מטעמנו ינתח את האתר ויחזור אליכם לשיחת ייעוץ אישית תוך מקסימום 2 שעות עבודה.
                    </p>
                    <button 
                      onClick={() => setContactSubmitted(false)}
                      className="text-xs text-purple-400 hover:text-purple-300 font-bold underline"
                    >
                      שליחת פנייה נוספת
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6 text-right">
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-300 block">שם מלא *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="ישראל ישראלי" 
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-[#080B12] border border-gray-800 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 rounded-xl px-4 py-3 text-sm text-gray-100 outline-none transition-all text-right"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-300 block">טלפון נייד *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="050-1234567" 
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-[#080B12] border border-gray-800 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 rounded-xl px-4 py-3 text-sm text-gray-100 outline-none transition-all text-right"
                        />
                      </div>

                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      
                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-300 block">כתובת אימייל *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="name@company.com" 
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-[#080B12] border border-gray-800 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 rounded-xl px-4 py-3 text-sm text-gray-100 outline-none transition-all text-right"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-300 block">שם החברה / האתר</label>
                        <input 
                          type="text" 
                          placeholder="שם העסק שלך" 
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                          className="w-full bg-[#080B12] border border-gray-800 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 rounded-xl px-4 py-3 text-sm text-gray-100 outline-none transition-all text-right"
                        />
                      </div>

                    </div>

                    {/* Service Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 block">השירות העיקרי שמעניין אתכם</label>
                      <select 
                        value={contactForm.service}
                        onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                        className="w-full bg-[#080B12] border border-gray-800 focus:border-purple-500/50 rounded-xl px-4 py-3 text-sm text-gray-100 outline-none transition-all text-right appearance-none"
                      >
                        <option value="קידום ממומן">פרסום ממומן בגוגל ומדיה חברתית (PPC)</option>
                        <option value="קידום אורגני">קידום אורגני בגוגל (SEO)</option>
                        <option value="ניהול רשתות">ניהול רשתות חברתיות 360 (SMO)</option>
                        <option value="טאבולה">פרסום בטאבולה ואאוטבריין (Native)</option>
                        <option value="ניהול אתרים">ניהול ואופטימיזציית אתרים 360</option>
                        <option value="שיווק משולב">אסטרטגיה שיווקית משולבת</option>
                      </select>
                    </div>

                    {/* Budget slider inline */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-gray-300">תקציב פרסום חודשי משוער</label>
                        <span className="text-sm font-black text-purple-400">₪{contactForm.budget.toLocaleString()} +</span>
                      </div>
                      <input 
                        type="range" 
                        min="5000" 
                        max="100000" 
                        step="5000" 
                        value={contactForm.budget}
                        onChange={(e) => setContactForm({ ...contactForm, budget: +e.target.value })}
                        className="w-full accent-purple-500"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 block">איך נוכל לעזור לכם? (פירוט קצר)</label>
                      <textarea 
                        rows="3" 
                        placeholder="ספרו לנו קצת על העסק, הקהל ואיזה תוצאות תרצו להשיג..." 
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-[#080B12] border border-gray-800 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 rounded-xl px-4 py-3 text-sm text-gray-100 outline-none transition-all text-right resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-l from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-base py-4 rounded-xl transition-all shadow-lg shadow-purple-600/20 hover:-translate-y-0.5"
                    >
                      קבלו שיחת אפיון ואופטימיזציה חינם
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080B12] border-t border-gray-800/80 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 pb-12 border-b border-gray-800/60">
            
            {/* Column 1: Info (col-span-5) */}
            <div className="md:col-span-5 text-right space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-black">DV</div>
                <span className="text-lg font-black text-white">DIGITAL VIBE</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                דיגיטל וייב בע"מ - משרד פרסום ושיווק אונליין מוביל בישראל מאז 2008. שירותי קידום ממומן, קידום אורגני, נייטיב ואופטימיזציה מתקדמת מבוססת ביצועים ו-ROAS חסר פשרות.
              </p>
              <div className="text-xs text-gray-500">
                © {new Date().getFullYear()} דיגיטל וייב שיווק דיגיטלי בע"מ. כל הזכויות שמורות. ח.פ 516604352.
              </div>
            </div>

            {/* Column 2: Links (col-span-3) */}
            <div className="md:col-span-3 text-right">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">שירותי המשרד</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-400 transition-colors">קידום אורגני בגוגל (SEO)</button></li>
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-400 transition-colors">פרסום ממומן במטא וגוגל (PPC)</button></li>
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-400 transition-colors">ניהול רשתות חברתיות (SMO)</button></li>
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-400 transition-colors">פרסום בטאבולה ואאוטבריין</button></li>
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-purple-400 transition-colors">ניהול ואופטימיזציית אתרים 360</button></li>
              </ul>
            </div>

            {/* Column 3: Navigation (col-span-4) */}
            <div className="md:col-span-4 text-right">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">צור קשר וניווט</h4>
              <ul className="space-y-3 text-xs text-gray-400">
                <li><span className="block text-gray-500">כתובת משרדים:</span> החשמונאים 91, תל אביב-יפו</li>
                <li><span className="block text-gray-500">טלפון ישיר:</span> <a href="tel:03-723-2339" className="hover:text-purple-400 text-white font-bold">03-723-2339</a></li>
                <li><span className="block text-gray-500">דואר אלקטרוני:</span> <a href="mailto:info@digitalvibe.co.il" className="hover:text-purple-400">info@digitalvibe.co.il</a></li>
                <li><span className="block text-gray-500">מדיניות פרטיות:</span> <a href="#" className="hover:underline text-[10px]">מדיניות פרטיות ואבטחת מידע</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500">
              נבנה עבור השראה ועיצוב דיגיטל וייב בע"מ. מבוסס על אסטרטגיה חכמה.
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-all text-sm">f</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-all text-sm">in</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-all text-sm">yt</a>
            </div>
          </div>

        </div>
      </footer>

      {/* SERVICE DETAILS MODAL (פופ-אפ שירותים) */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B12]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0B0F19] border border-gray-800/80 p-6 sm:p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-right relative shadow-2xl shadow-purple-950/20">
            
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <CloseIcon />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-2xl border border-purple-500/20">
                {selectedService.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{selectedService.title}</h3>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {selectedService.detailedDesc}
            </p>

            <h4 className="text-sm font-bold text-white mb-3">מה כוללת מעטפת העבודה שלנו:</h4>
            <ul className="space-y-3 mb-8">
              {selectedService.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-gray-800/80 pt-6">
              <button 
                onClick={() => {
                  setContactForm({ ...contactForm, service: selectedService.title });
                  setSelectedService(null);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-gradient-to-l from-purple-600 to-indigo-600 text-white font-black py-3.5 rounded-xl transition-all text-center text-sm"
              >
                אני רוצה להתייעץ על שירות זה
              </button>
              <button 
                onClick={() => setSelectedService(null)}
                className="w-full bg-gray-900 border border-gray-800 text-gray-300 font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors text-sm"
              >
                סגור חלון
              </button>
            </div>

          </div>
        </div>
      )}

      {/* LEAD MAGNET / FREE AUDIT MODAL (פופ-אפ בדיקה חינם) */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B12]/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0B0F19] border border-purple-500/30 p-6 sm:p-8 rounded-3xl max-w-lg w-full text-right relative shadow-2xl shadow-purple-950/30">
            
            <button 
              onClick={() => setIsAuditModalOpen(false)}
              className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <CloseIcon />
            </button>

            {auditSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-2xl border border-emerald-500/20">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">הבקשה לבדיקה נרשמה בהצלחה!</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  אנחנו כבר מתחילים לסרוק את האתר {auditForm.website || ''} ולנתח את הנוכחות שלכם. נחזור אליכם בהקדם האפשרי עם תוצאות מדויקות.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-5 text-right">
                
                <div>
                  <span className="text-[10px] bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-1 rounded-md font-black uppercase tracking-wider mb-2 inline-block">מתנה ללא התחייבות 🎁</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">קבלו סריקה ואנליזה מלאה לאתר בחינם</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    המומחים שלנו ינתחו את האתר שלכם ברמת מהירות, תגיות SEO, אופטימיזציית מובייל ונתחי שוק, ויחזרו אליכם עם מפת דרכים לשיפור ללא כל עלות.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-300 block">שם מלא *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="השם שלכם" 
                      value={auditForm.name}
                      onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })}
                      className="w-full bg-[#080B12] border border-gray-800 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-gray-100 outline-none transition-all text-right"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-300 block">טלפון נייד *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="05x-xxxxxxx" 
                      value={auditForm.phone}
                      onChange={(e) => setAuditForm({ ...auditForm, phone: e.target.value })}
                      className="w-full bg-[#080B12] border border-gray-800 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-gray-100 outline-none transition-all text-right"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-300 block">כתובת אתר אינטרנט (לא חובה)</label>
                    <input 
                      type="text" 
                      placeholder="www.mycompany.co.il" 
                      value={auditForm.website}
                      onChange={(e) => setAuditForm({ ...auditForm, website: e.target.value })}
                      className="w-full bg-[#080B12] border border-gray-800 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-gray-100 outline-none transition-all text-right"
                    />
                  </div>

                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-l from-purple-600 to-indigo-600 text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-md"
                  >
                    אני רוצה את הבדיקה בחינם! 🚀
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsAuditModalOpen(false)}
                    className="w-1/3 bg-gray-900 border border-gray-800 text-gray-400 font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors text-xs"
                  >
                    אולי אחר כך
                  </button>
                </div>

                <div className="text-[9px] text-gray-500 text-center">
                  * הסריקה והאנליזה מתבצעות על ידי צוות המומחים שלנו באופן ידני וללא כל התחייבות כספית מצדכם.
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
