import React, { useState, useEffect } from 'react';

const Icons = {
  ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Briefcase: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  TrendingUp: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Brain: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4 4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
};

const Header = () => (
  <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold rounded-sm tracking-tighter">
          AYD
        </div>
        <span className="font-semibold tracking-wide text-lg">אריאל יואב דביר</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <a href="#services" className="hover:text-white transition-colors">התמחויות</a>
        <a href="#ai-tool" className="hover:text-white transition-colors">כלים חכמים</a>
        <a href="#about" className="hover:text-white transition-colors">אודות</a>
      </nav>
      <a href="#contact" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
        <span>קבעו פגישה</span>
        <Icons.ArrowLeft />
      </a>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex flex-col justify-center overflow-hidden">
    {/* Abstract Background Elements */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl -z-10"></div>
    <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-900/20 rounded-full blur-3xl -z-10"></div>
    
    <div className="max-w-7xl mx-auto w-full">
      <div className="inline-block px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 text-xs font-medium tracking-widest text-cyan-400 uppercase">
        ניהול הון ופיננסים פרימיום
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
        מנהיגות פיננסית. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-500">
          אסטרטגיה לעתיד.
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
        אריאל יואב דביר, מתכנן פיננסי CFP® בכיר, מביא סטנדרט חדש של ניהול הון אישי ומשפחתי. תכנון הוליסטי 360° המשלב מומחיות נטולת פשרות עם אנליזה חכמה לביטחון השקט הנפשי שלכם.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <a href="#contact" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all text-center">
          התחילו תכנון פיננסי
        </a>
        <a href="#services" className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all text-center">
          גלו את השירותים שלנו
        </a>
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="border-y border-white/5 bg-white/[0.02]">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-x-reverse divide-white/5">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">15+</div>
          <div className="text-sm text-gray-500 uppercase tracking-wider">שנות ניסיון</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">CFP®</div>
          <div className="text-sm text-gray-500 uppercase tracking-wider">הסמכה בינלאומית</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">360°</div>
          <div className="text-sm text-gray-500 uppercase tracking-wider">ניהול הוליסטי</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-1 flex justify-center"><Icons.Shield /></div>
          <div className="text-sm text-gray-500 uppercase tracking-wider">אובייקטיביות מלאה</div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    {
      icon: <Icons.TrendingUp />,
      title: "ניהול עושר והשקעות",
      desc: "אופטימיזציה של תיק הנכסים, ניהול השקעות אלטרנטיביות ושוק ההון תוך התאמה מדויקת לפרופיל הסיכון ומטרות המשפחה."
    },
    {
      icon: <Icons.Briefcase />,
      title: "תכנון פרישה ומיסוי",
      desc: "אסטרטגיות פרישה מתקדמות להגנה על ההון, מקסום פטורים ממס (קיבוע זכויות), וניהול חכם של קרנות הפנסיה וההשתלמות."
    },
    {
      icon: <Icons.Shield />,
      title: "מעטפת הגנה וביטוח",
      desc: "ניהול סיכונים ובניית חומת הגנה כלכלית לתא המשפחתי באמצעות פתרונות ביטוחי חיים ובריאות פרימיום."
    }
  ];

  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">מומחיות ללא פשרות.</h2>
          <p className="text-gray-400 max-w-xl">השירותים שלנו נבנו כדי לספק מעטפת שלמה, אובייקטיבית וחכמה לכל שלב במחזור החיים הפיננסי שלכם.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <div key={idx} className="group p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors duration-500 cursor-pointer">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                {srv.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{srv.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AITool = () => {
  const [age, setAge] = useState(40);
  const [monthly, setMonthly] = useState(5000);
  const [projectedStandard, setProjectedStandard] = useState(0);
  const [projectedAI, setProjectedAI] = useState(0);

  // Simulate AI calculation logic for projected wealth at age 67
  useEffect(() => {
    const yearsLeft = 67 - age;
    if (yearsLeft <= 0) {
      setProjectedStandard(0);
      setProjectedAI(0);
      return;
    }
    
    // Standard growth ~4% net
    const rStandard = 0.04 / 12;
    const n = yearsLeft * 12;
    const futureStandard = monthly * ((Math.pow(1 + rStandard, n) - 1) / rStandard);
    
    // "AI Optimized" growth ~7% net (due to better tax planning, alternative investments, rebalancing)
    const rAI = 0.07 / 12;
    const futureAI = monthly * ((Math.pow(1 + rAI, n) - 1) / rAI);

    setProjectedStandard(futureStandard);
    setProjectedAI(futureAI);
  }, [age, monthly]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="ai-tool" className="py-24 px-6 bg-gradient-to-b from-black to-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black -z-10"></div>
      
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-cyan-400 mb-4">
            <Icons.Brain />
            <span className="text-sm font-bold tracking-widest uppercase">AYD AI Lab</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">סימולטור השקעות<br/>מוכוון נתונים.</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            גלו את הפוטנציאל האמיתי של הכסף שלכם. המערכת מדגימה כיצד תכנון פיננסי חכם, אופטימיזציית מס ואלוקציית נכסים נכונה יכולים לשנות דרמטית את ההון שלכם בגיל פרישה (67).
          </p>
          
          <div className="space-y-6 bg-white/[0.02] p-6 rounded-2xl border border-white/10">
            <div>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>גיל נוכחי</span>
                <span className="text-cyan-400">{age}</span>
              </div>
              <input 
                type="range" min="20" max="65" value={age} 
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>חיסכון חודשי (פנוי)</span>
                <span className="text-cyan-400">₪{monthly.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="1000" max="25000" step="500" value={monthly} 
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 w-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-cyan-900/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
          
          <h3 className="text-lg font-medium text-gray-300 mb-8">תחזית הון בגיל 67</h3>
          
          <div className="space-y-8 relative z-10">
            <div>
              <div className="text-sm text-gray-500 mb-1">ללא ניהול (צמיחה סטנדרטית)</div>
              <div className="text-2xl font-semibold text-gray-300">{formatCurrency(projectedStandard)}</div>
              <div className="w-full bg-white/5 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-gray-600 h-full rounded-full transition-all duration-1000" style={{ width: `${(projectedStandard / projectedAI) * 100}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-cyan-400 mb-1 font-medium flex items-center gap-2">
                <span>עם אסטרטגיית AYD</span>
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs rounded">Optimized</span>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                {formatCurrency(projectedAI)}
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_#22d3ee]" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-sm text-gray-400">פער אסטרטגי פוטנציאלי:</span>
              <span className="text-emerald-400 font-bold">+{formatCurrency(projectedAI - projectedStandard)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-32 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">גישה אישית,<br/>מחבקת ועוטפת.</h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-6">
          כמייסד AYD - המרכז לתכנון פיננסי מתקדם, הפילוסופיה שלי פשוטה: כל החלטה פיננסית צריכה להיות מבוססת נתונים, נטולת פניות, ומותאמת אישית ל-DNA הכלכלי של הלקוח.
        </p>
        <p className="text-gray-400 text-lg leading-relaxed mb-8">
          אני מאמין בהסתכלות רחבה (360°) על כל הנכסים של המשפחה. עם מעל 15 שנות ניסיון כסוכן ביטוח פנסיוני, מפקח בחברות ביטוח ומתכנן CFP®, אני והצוות שלי מלווים משפחות לביטחון כלכלי ושקט נפשי אמיתי.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 rounded-full border border-white/10 text-sm">בוגר תואר במנהל עסקים</span>
          <span className="px-4 py-2 rounded-full border border-white/10 text-sm">מתכנן פרישה מוסמך</span>
          <span className="px-4 py-2 rounded-full border border-white/10 text-sm">חבר איגוד פמילי אופיס I.F.O</span>
        </div>
      </div>
      <div className="relative h-[500px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
         {/* Using an abstract premium placeholder representing the founder's presence since we can't use external personal photos reliably without specific URLs */}
         <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 to-transparent"></div>
         <div className="text-center z-10 p-8">
            <div className="w-24 h-24 mx-auto border border-white/20 rounded-full flex items-center justify-center text-4xl font-light mb-6 bg-black/50 backdrop-blur-md">
              A
            </div>
            <h3 className="text-2xl font-bold">אריאל יואב דביר</h3>
            <p className="text-cyan-400 text-sm tracking-widest uppercase mt-2">מנכ"ל ומייסד AYD</p>
         </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="bg-black pt-32 pb-10 border-t border-white/5 relative overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none"></div>
    
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">הגיע הזמן לקחת שליטה.</h2>
        <p className="text-xl text-gray-400 mb-10">תכנון נכון מתחיל בשיחה אחת. השאירו פרטים או צרו קשר ישיר, ונתחיל לבנות את האסטרטגיה שלכם.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="tel:054-9646770" className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
            <Icons.Phone />
            <span>054-9646770</span>
          </a>
          <a href="mailto:ariel@ayd-plan.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 rounded-full hover:bg-white/5 transition-colors">
            <Icons.Mail />
            <span>ariel@ayd-plan.com</span>
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 border-t border-white/10 pt-10 text-sm text-gray-500 relative z-10">
        <div>
          <div className="font-bold text-white text-lg tracking-wider mb-4">AYD</div>
          <p>המרכז לתכנון פיננסי מתקדם, פרישה וניהול עושר. שותף בכיר בקבוצת "מטאור".</p>
        </div>
        <div>
          <div className="font-medium text-white mb-4">יצירת קשר</div>
          <ul className="space-y-2">
            <li>נייד: 054-9646770</li>
            <li>משרד: 053-4652303</li>
            <li>דוא"ל: ariel@ayd-plan.com</li>
          </ul>
        </div>
        <div className="text-left md:text-right">
          <p>&copy; {new Date().getFullYear()} אריאל יואב דביר. כל הזכויות שמורות.</p>
          <p className="mt-2 text-xs">נבנה בהשראת עיצובי פרימיום לתחום הפיננסים.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
      `}} />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <AITool />
        <About />
      </main>
      <Footer />
    </div>
  );
}
