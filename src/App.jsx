import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, ArrowLeft, BrainCircuit } from 'lucide-react';
import { translations } from './data/translations';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';

export default function App() {
  const [lang, setLang] = useState('en');
  const [currentView, setCurrentView] = useState('home');
  const [activeFilter, setActiveFilter] = useState('All');

  const t = translations[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'));

  const scrollToSection = (sectionId) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToProjects = (filterTag = 'All') => {
    setActiveFilter(filterTag);
    setCurrentView('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans selection:bg-teal-500/30 flex flex-col relative overflow-hidden">

      {/* Custom Teal Gradient Scrollbar */}
      <style>{`
        ::-webkit-scrollbar { width: 10px; background: #09090b; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #0d9488, #06b6d4, #10b981); border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #06b6d4, #10b981); }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
      `}</style>

      {/* Fixed Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home-top')}>
              <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg group-hover:border-teal-500 transition-colors duration-300 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <BrainCircuit className="text-teal-500 group-hover:text-cyan-400 transition-colors" size={24} />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 tracking-tight">
                AI.Dev
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {currentView === 'projects' ? (
                <button onClick={() => setCurrentView('home')} className="text-sm font-semibold transition-colors text-cyan-400 hover:text-teal-400 flex items-center gap-2 cursor-pointer">
                  {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t.nav.backHome}
                </button>
              ) : (
                <>
                  <button onClick={() => scrollToSection('home-top')} className="text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer">{t.nav.home}</button>
                  <button onClick={() => scrollToSection('about')} className="text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer">{t.nav.about}</button>
                  <button onClick={() => scrollToSection('skills')} className="text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer">{t.nav.skills}</button>
                  <button onClick={() => scrollToSection('categories')} className="text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer">{t.categories.title}</button>
                  <button onClick={() => scrollToSection('contact')} className="text-sm font-bold text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer">{t.nav.contact}</button>
                </>
              )}
            </div>

            <div className="flex items-center">
              <button onClick={toggleLang} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-teal-500 hover:text-cyan-400 transition-all duration-300 text-sm font-bold shadow-sm group cursor-pointer">
                <Globe size={16} className={`${isRTL ? "ml-1" : "mr-1"} group-hover:animate-pulse`} /> {t.nav.toggleLang}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {currentView === 'home' ? (
          <Home t={t} lang={lang} isRTL={isRTL} openProjects={navigateToProjects} />
        ) : (
          <Projects t={t} lang={lang} isRTL={isRTL} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-8 text-center text-gray-500 text-sm mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}