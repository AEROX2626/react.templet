import React, { useState, useEffect } from 'react';
import { Heart, X, MessageCircle, User, Sparkles, Send, Info, ShieldCheck, ChevronLeft } from 'lucide-react';

// --- Mock Data ---
const MOCK_PROFILES = [
  {
    id: 1,
    name: 'תהילה',
    age: 23,
    location: 'ירושלים',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=500', // Placeholder
    matchPercentage: 92,
    stream: 'ליטאית',
    occupation: 'מורה בחינוך מיוחד',
    about: 'מחפשת בחור ירא שמים, שקובע עיתים לתורה ברצינות וגם עובד. חשוב לי בית פתוח מכניס אורחים, עם אווירה רגועה ושמחה.',
    traits: ['אוהבת לטייל', 'מנגנת בפסנתר', 'משפחתית'],
    lookingFor: 'שילוב תורה ועבודה',
    willMatch: true, // Mock logic: will it be a mutual match?
  },
  {
    id: 2,
    name: 'רחלי',
    age: 25,
    location: 'בני ברק',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=500',
    matchPercentage: 78,
    stream: 'חסידית (כללי)',
    occupation: 'הייטק',
    about: 'ראש פתוח אבל שורשים חזקים. עובדת בתכנות, אוהבת לקרוא המון ולהתפתח. מחפשת מישהו עם שאיפות רוחניות וגשמיות גבוהות.',
    traits: ['קוראת המון', 'שאפתנית', 'אוהבת לבשל'],
    lookingFor: 'אברך מודרני / עובד הייטק',
    willMatch: false,
  },
  {
    id: 3,
    name: 'שירה',
    age: 22,
    location: 'פתח תקווה',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=500',
    matchPercentage: 85,
    stream: 'דתית לאומית תורנית',
    occupation: 'סטודנטית לעבודה סוציאלית',
    about: 'מחפשת להקים בית של תורה וחסד. מתנדבת המון בזמני הפנוי. חשוב לי מישהו שמחובר לעצמו ולסביבה.',
    traits: ['התנדבות', 'טבע', 'עומק'],
    lookingFor: 'בוגר ישיבה גבוהה / הסדר',
    willMatch: true,
  }
];

const ICE_BREAKERS = [
  "איך נראית שבת אידיאלית בעינייך?",
  "מה הדבר שהכי חשוב לך באווירה של הבית שתקים/י?",
  "איזה ספר השפיע עלייך מאוד לאחרונה?",
  "מה התכונה שאת/ה הכי מעריך/ה אצל אנשים?",
  "איך את/ה אוהב/ת להעביר את הזמן הפנוי שלך?"
];

export default function ShidduchApp() {
  const [currentTab, setCurrentTab] = useState('discover'); // 'discover', 'matches', 'chat', 'profile'
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [matches, setMatches] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [showMatchAnimation, setShowMatchAnimation] = useState(null);
  
  // Chat state
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');

  const currentProfile = profiles[0];

  const handleAction = (action) => {
    if (!currentProfile) return;

    if (action === 'like' && currentProfile.willMatch) {
      // It's a match!
      setShowMatchAnimation(currentProfile);
      setMatches([...matches, currentProfile]);
    }

    // Move to next profile
    setTimeout(() => {
      setProfiles(profiles.slice(1));
    }, action === 'like' && currentProfile.willMatch ? 2000 : 300);
  };

  const closeMatchAnimation = () => {
    setShowMatchAnimation(null);
  };

  const openChat = (user) => {
    setActiveChat(user);
    setCurrentTab('chat');
  };

  const sendMessage = (text) => {
    if (!text.trim() || !activeChat) return;
    
    const chatId = activeChat.id;
    const newMsgObj = { id: Date.now(), text, sender: 'me', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMsgObj]
    }));
    setNewMessage('');

    // Mock reply after 2 seconds
    setTimeout(() => {
      const replyObj = { id: Date.now(), text: 'תודה על ההודעה! מעניין מאוד לחשוב על זה.', sender: 'them', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), replyObj]
      }));
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-100 font-sans" dir="rtl">
      <div className="w-full max-w-md h-[100dvh] bg-white shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <header className="bg-white border-b px-4 py-3 flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-500 w-6 h-6" />
            <h1 className="text-2xl font-bold text-stone-800 tracking-tight">בסימן טוב</h1>
          </div>
          <div className="flex gap-4 text-stone-400">
             <button onClick={() => setCurrentTab('discover')} className={`${currentTab === 'discover' ? 'text-amber-500' : 'hover:text-stone-600'}`}>
                <User className="w-6 h-6" />
             </button>
             <button onClick={() => setCurrentTab('matches')} className={`relative ${currentTab === 'matches' || currentTab === 'chat' ? 'text-amber-500' : 'hover:text-stone-600'}`}>
                <MessageCircle className="w-6 h-6" />
                {matches.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {matches.length}
                  </span>
                )}
             </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative bg-stone-50">
          
          {/* --- TAB: DISCOVER --- */}
          {currentTab === 'discover' && (
            <div className="h-full flex flex-col p-4">
              {currentProfile ? (
                <div className="flex-1 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col relative border border-stone-100">
                  {/* Image/Top section */}
                  <div className="relative h-2/5 shrink-0 bg-stone-200">
                    <img 
                      src={currentProfile.image} 
                      alt={currentProfile.name} 
                      className="w-full h-full object-cover filter blur-[2px] hover:blur-none transition duration-300" // Blurred slightly for modesty until matched/clicked, optional design choice
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                       <h2 className="text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
                       <p className="opacity-90">{currentProfile.location} • {currentProfile.stream}</p>
                    </div>
                    {/* OKCupid style match percentage */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-amber-600 font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-amber-200">
                       <Sparkles className="w-4 h-4" />
                       {currentProfile.matchPercentage}% התאמה
                    </div>
                  </div>

                  {/* Details section - Scrollable */}
                  <div className="flex-1 overflow-y-auto p-5 pb-24">
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-stone-500 mb-2 flex items-center gap-1"><Info className="w-4 h-4"/> קצת עליי</h3>
                      <p className="text-stone-800 leading-relaxed">{currentProfile.about}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                        <span className="text-xs text-stone-500 block mb-1">עיסוק נוכחי</span>
                        <span className="text-sm font-medium text-stone-800">{currentProfile.occupation}</span>
                      </div>
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                        <span className="text-xs text-stone-500 block mb-1">מחפש/ת בשידוך</span>
                        <span className="text-sm font-medium text-stone-800">{currentProfile.lookingFor}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-stone-500 mb-3">תכונות ותחומי עניין</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.traits.map(trait => (
                          <span key={trait} className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-full text-sm">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (Absolute at bottom) */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-white via-white to-transparent flex justify-center items-center gap-6">
                    <button 
                      onClick={() => handleAction('pass')}
                      className="w-16 h-16 bg-white border-2 border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:bg-stone-50 hover:text-stone-600 transition shadow-sm"
                    >
                      <X className="w-8 h-8" />
                    </button>
                    <button 
                      onClick={() => handleAction('like')}
                      className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:scale-105 transition shadow-amber-500/30 shadow-md"
                    >
                      <Heart className="w-10 h-10 fill-white" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-10 h-10 text-stone-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-stone-800 mb-2">סיימת את כל ההצעות!</h2>
                  <p className="text-stone-500">נחפש עבורך הצעות נוספות שמתאימות במדויק לפרופיל שלך. בינתיים, בדוק את ההודעות שלך.</p>
                </div>
              )}
            </div>
          )}

          {/* --- MATCH ANIMATION OVERLAY --- */}
          {showMatchAnimation && (
            <div className="absolute inset-0 bg-amber-600/95 z-50 flex flex-col items-center justify-center text-white p-6 animate-in fade-in zoom-in duration-300">
              <Sparkles className="w-20 h-20 mb-6 text-yellow-300 animate-pulse" />
              <h2 className="text-4xl font-bold mb-2">בשעה טובה!</h2>
              <p className="text-xl mb-8 text-center">יש התאמה הדדית בינך לבין {showMatchAnimation.name}.</p>
              
              <div className="flex gap-4 w-full max-w-xs">
                <img src={showMatchAnimation.image} alt="them" className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg" />
                <div className="w-24 h-24 rounded-full border-4 border-white bg-stone-300 flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-stone-500" />
                </div>
              </div>

              <div className="mt-12 w-full max-w-xs space-y-4">
                <button 
                  onClick={() => { closeMatchAnimation(); openChat(showMatchAnimation); }}
                  className="w-full bg-white text-amber-600 py-3 rounded-full font-bold text-lg hover:bg-stone-100 transition shadow-lg"
                >
                  לשלוח הודעה עכשיו
                </button>
                <button 
                  onClick={closeMatchAnimation}
                  className="w-full bg-transparent border-2 border-white/50 text-white py-3 rounded-full font-medium hover:bg-white/10 transition"
                >
                  המשך לעיין בהצעות
                </button>
              </div>
            </div>
          )}

          {/* --- TAB: MATCHES --- */}
          {currentTab === 'matches' && (
            <div className="h-full flex flex-col bg-white">
              <div className="p-4 border-b border-stone-100 bg-stone-50">
                <h2 className="font-bold text-xl text-stone-800">ההתאמות שלי</h2>
                <p className="text-sm text-stone-500">אנשים שאישרו את ההצעה שלך</p>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {matches.length === 0 ? (
                  <div className="text-center text-stone-400 mt-20">
                    <Heart className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>עדיין אין התאמות. המשך לעיין בפרופילים!</p>
                  </div>
                ) : (
                  matches.map(match => (
                    <div 
                      key={match.id} 
                      onClick={() => openChat(match)}
                      className="flex items-center gap-4 p-3 hover:bg-stone-50 cursor-pointer rounded-xl transition border-b border-stone-50 last:border-0"
                    >
                      <div className="relative">
                        <img src={match.image} alt={match.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                        <div className="absolute -bottom-1 -right-1 bg-amber-100 border border-amber-300 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {match.matchPercentage}%
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-stone-800 text-lg">{match.name}</h3>
                        <p className="text-sm text-stone-500 line-clamp-1">
                          {messages[match.id] && messages[match.id].length > 0 
                            ? messages[match.id][messages[match.id].length - 1].text 
                            : 'התחל שיחה עכשיו...'}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* --- TAB: CHAT --- */}
          {currentTab === 'chat' && activeChat && (
            <div className="absolute inset-0 bg-white z-20 flex flex-col h-full">
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-stone-100 shadow-sm bg-white">
                <button onClick={() => setCurrentTab('matches')} className="text-stone-500 hover:text-stone-800">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <img src={activeChat.image} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-stone-800">{activeChat.name}</h3>
                  <p className="text-xs text-amber-600 font-medium">{activeChat.matchPercentage}% התאמה</p>
                </div>
              </div>

              {/* Chat Guidelines Banner */}
              <div className="bg-stone-50 border-b border-stone-200 px-4 py-2 flex items-start gap-2 text-xs text-stone-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>מערכת "בסימן טוב" מבקשת לשמור על שיח מכבד, צנוע ולעניין. מומלץ להתמקד בשאלות של מהות והשקפה כדי לבדוק התאמה אמיתית.</p>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
                {(!messages[activeChat.id] || messages[activeChat.id].length === 0) ? (
                   <div className="text-center mt-10">
                     <p className="text-sm text-stone-500 mb-6">זוהי תחילתה של שיחה חדשה.</p>
                     
                     {/* Icebreakers Feature */}
                     <div className="max-w-xs mx-auto text-right">
                       <h4 className="text-xs font-bold text-stone-400 mb-3 uppercase tracking-wider">שאלות "שוברי קרח" מומלצות:</h4>
                       <div className="space-y-2">
                         {ICE_BREAKERS.map((q, idx) => (
                           <button 
                             key={idx}
                             onClick={() => sendMessage(q)}
                             className="w-full text-right bg-white border border-amber-100 p-3 rounded-xl text-sm text-stone-700 hover:bg-amber-50 hover:border-amber-300 transition shadow-sm"
                           >
                             {q}
                           </button>
                         ))}
                       </div>
                     </div>
                   </div>
                ) : (
                  messages[activeChat.id].map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        msg.sender === 'me' 
                          ? 'bg-amber-500 text-white rounded-br-sm' 
                          : 'bg-white border border-stone-200 text-stone-800 rounded-bl-sm shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-stone-100 flex gap-2 items-center">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(newMessage)}
                  placeholder="הקלד הודעה מכבדת..."
                  className="flex-1 bg-stone-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition"
                />
                <button 
                  onClick={() => sendMessage(newMessage)}
                  disabled={!newMessage.trim()}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                    newMessage.trim() ? 'bg-amber-500 text-white shadow-md' : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  <Send className="w-5 h-5 rtl:-scale-x-100" />
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
