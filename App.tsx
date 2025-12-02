import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from './constants';
import { Dish, DishCategory, ChatMessage, Recommendation } from './types';
import DishCard from './components/DishCard';
import ChatInterface from './components/ChatInterface';
import { getMenuRecommendations } from './services/gemini';

const App: React.FC = () => {
  // State
  const [activeCategory, setActiveCategory] = useState<DishCategory | 'All'>('All');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle

  // --- Handlers ---

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content
    };
    
    // Update history immediately for UI
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setIsAiLoading(true);

    // Call API
    const response = await getMenuRecommendations(
      messages.map(m => ({ role: m.role, content: m.content })), 
      content
    );

    // Add assistant message
    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.message,
      recommendations: response.recommendations
    };

    setMessages([...updatedHistory, assistantMsg]);
    setRecommendations(response.recommendations);
    setIsAiLoading(false);
    
    // On mobile, if we get recommendations, maybe close sidebar to show them? 
    // Or keep open. Let's keep it simple.
  };

  const handleCategoryChange = (cat: DishCategory | 'All') => {
    setActiveCategory(cat);
    // Clearing recommendations when manually filtering could be a choice, 
    // but let's keep them if the user just wants to browse.
    // setRecommendations([]); 
  };

  // --- Filtering Logic ---

  const displayedDishes = useMemo(() => {
    // If we have active recommendations, we want to prioritize them or show them specifically?
    // Let's adopt a hybrid approach:
    // 1. If 'All' category and recommendations exist, show recommended first, then others.
    // 2. If specific category, show items in that category (highlighting recommended ones).
    
    let baseList = MENU_ITEMS;

    if (activeCategory !== 'All') {
      baseList = baseList.filter(d => d.category === activeCategory);
    }

    // Sort: Recommended items first
    return [...baseList].sort((a, b) => {
      const aRec = recommendations.find(r => r.dishId === a.id);
      const bRec = recommendations.find(r => r.dishId === b.id);
      if (aRec && !bRec) return -1;
      if (!aRec && bRec) return 1;
      return 0;
    });
  }, [activeCategory, recommendations]);


  return (
    <div className="flex h-screen overflow-hidden bg-brand-50 relative">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Panel: Chat Interface (Concierge) */}
      <aside 
        className={`
          fixed md:relative inset-y-0 left-0 w-[85%] md:w-[400px] z-40 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage}
          isLoading={isAiLoading}
        />
      </aside>

      {/* Right Panel: Menu Grid */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full">
        
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-brand-200 flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-brand-600 hover:bg-brand-50 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h1 className="font-serif text-2xl font-bold text-brand-900 tracking-tight">CraveCompass</h1>
              <p className="hidden md:block text-xs text-brand-500 uppercase tracking-widest">Fine Dining & Cocktails</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Could add search bar or profile here later */}
             <div className="hidden md:flex text-sm font-medium text-brand-400">
               Open 11am - 11pm
             </div>
          </div>
        </header>

        {/* Category Filter Scroll */}
        <div className="bg-brand-50/50 backdrop-blur-sm border-b border-brand-100 py-4 px-6 overflow-x-auto whitespace-nowrap shrink-0">
          <div className="flex gap-2">
            {(['All', ...Object.values(DishCategory)] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`
                  px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  ${activeCategory === cat 
                    ? 'bg-brand-900 text-white shadow-md transform scale-105' 
                    : 'bg-white text-brand-600 border border-brand-200 hover:border-brand-400 hover:bg-brand-50'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          
          {/* Recommendation Banner if active */}
          {recommendations.length > 0 && activeCategory === 'All' && (
            <div className="mb-8">
              <h2 className="font-serif text-xl font-bold text-brand-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span> Recommended for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map(rec => {
                  const dish = MENU_ITEMS.find(d => d.id === rec.dishId);
                  if (!dish) return null;
                  return (
                    <div key={`rec-${dish.id}`} className="h-full">
                       <DishCard dish={dish} isRecommended={true} reason={rec.reason} />
                    </div>
                  );
                })}
              </div>
              <div className="my-8 border-t border-brand-200" />
              <h2 className="font-serif text-xl font-bold text-brand-800 mb-4 opacity-70">
                Full Menu
              </h2>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {displayedDishes.map((dish) => {
              // Check if this dish is already shown in the top recommendation section to avoid dupes visually? 
              // Actually, standard pattern is to show it in the list too, maybe just highlighted.
              // But if we have a dedicated section above, we might filter them out here or just show them again.
              // Let's show them again but without the big "Recommended" badge to keep the grid uniform, 
              // OR filter them out if we used the banner above.
              
              // Simplification: If activeCategory is 'All' and we have recommendations, 
              // we showed the banner. So let's filter them out of the main grid below to avoid duplicates.
              const isRecommended = recommendations.some(r => r.dishId === dish.id);
              if (activeCategory === 'All' && recommendations.length > 0 && isRecommended) return null;

              return (
                <DishCard 
                  key={dish.id} 
                  dish={dish} 
                  isRecommended={isRecommended} // Only true if we didn't filter it out (e.g. inside specific category view)
                />
              );
            })}
            
            {displayedDishes.length === 0 && (
               <div className="col-span-full text-center py-20 text-brand-400">
                 <p className="text-lg">No dishes found in this category.</p>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;