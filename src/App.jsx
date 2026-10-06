import { useState, useEffect, useRef } from 'react';
import { Globe, ArrowRight, ArrowLeft, Menu, X } from 'lucide-react';
import { translations } from './data/translations';
import { profile } from './data/profile';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';

const SECTIONS = ['home-top', 'about', 'work', 'skills', 'contact'];

export default function App() {
    // ?lang=ar in the URL opens the Arabic version directly (handy for sharing).
    const [lang, setLang] = useState(() =>
        new URLSearchParams(window.location.search).get('lang') === 'ar' ? 'ar' : 'en'
    );
    const [currentView, setCurrentView] = useState('home');
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedId, setSelectedId] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home-top');
    const progressRef = useRef(null);
    const glowRef = useRef(null);

    const t = translations[lang];
    const isRTL = lang === 'ar';

    useEffect(() => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        document.title = lang === 'ar'
            ? `${profile.nameAr} | مهندس ذكاء اصطناعي ومطوّر React`
            : `${profile.nameEn} | AI Engineer & React Developer`;
    }, [lang, isRTL]);

    // Scroll progress bar + cursor glow, written straight to the DOM (no re-renders).
    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        };
        const onMove = (e) => {
            if (glowRef.current) glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('pointermove', onMove);
        };
    }, []);

    // Highlight the nav link of the section currently in view.
    useEffect(() => {
        if (currentView !== 'home') return;
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
            { rootMargin: '-45% 0px -50% 0px' }
        );
        SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [currentView, lang]);

    const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'));

    const scrollToSection = (sectionId) => {
        setMenuOpen(false);
        const scroll = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        if (currentView !== 'home') {
            setCurrentView('home');
            setTimeout(scroll, 150);
        } else {
            scroll();
        }
    };

    const openProjects = (filterTag = 'All', projectId = null) => {
        setMenuOpen(false);
        setActiveFilter(filterTag);
        setSelectedId(projectId);
        setCurrentView('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navItems = [
        { id: 'home-top', label: t.nav.home },
        { id: 'about', label: t.nav.about },
        { id: 'work', label: t.nav.work },
        { id: 'skills', label: t.nav.skills },
        { id: 'contact', label: t.nav.contact },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans selection:bg-teal-500/30 flex flex-col relative overflow-x-clip">
            {/* Background: grid, drifting aurora and cursor glow */}
            <div className="fixed inset-0 -z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 bg-grid" />
                <div className="aurora-blob w-[560px] h-[560px] bg-teal-700 -top-48 -start-40" />
                <div className="aurora-blob w-[480px] h-[480px] bg-cyan-800 top-1/3 -end-48" style={{ animationDelay: '-7s' }} />
                <div className="aurora-blob w-[420px] h-[420px] bg-emerald-800 -bottom-40 start-1/3" style={{ animationDelay: '-12s' }} />
                <div
                    ref={glowRef}
                    className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.10),transparent_60%)] transition-transform duration-300 ease-out hidden md:block"
                />
            </div>

            {/* Scroll progress */}
            <div
                ref={progressRef}
                className="fixed top-0 inset-x-0 h-[3px] z-[60] bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 origin-left rtl:origin-right"
                style={{ transform: 'scaleX(0)' }}
            />

            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-zinc-950/75 backdrop-blur-xl border-b border-zinc-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <button className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home-top')}>
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 p-[2px] group-hover:rotate-6 transition-transform duration-300 shadow-[0_0_20px_rgba(20,184,166,0.25)]">
                                <div className="w-full h-full rounded-[10px] bg-zinc-950 flex items-center justify-center font-black">
                                    <span className="text-gradient">{profile.initials}</span>
                                </div>
                            </div>
                            <span className="hidden sm:block text-lg font-black text-white tracking-tight">
                                {lang === 'ar' ? profile.nameAr : profile.nameEn}
                            </span>
                        </button>

                        <div className="hidden md:flex items-center gap-1">
                            {currentView === 'projects' ? (
                                <button onClick={() => setCurrentView('home')} className="text-sm font-semibold text-cyan-400 hover:text-teal-300 flex items-center gap-2 cursor-pointer px-3 py-2 group">
                                    {isRTL
                                        ? <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        : <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />}
                                    {t.nav.backHome}
                                </button>
                            ) : (
                                navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${activeSection === item.id ? 'text-cyan-300' : 'text-gray-400 hover:text-gray-100'}`}
                                    >
                                        {item.label}
                                        <span className={`absolute bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 ${activeSection === item.id ? 'w-6' : 'w-0'}`} />
                                    </button>
                                ))
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={toggleLang} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-teal-500 hover:text-cyan-400 transition-all duration-300 text-sm font-bold group cursor-pointer">
                                <Globe size={16} className="group-hover:rotate-180 transition-transform duration-700" /> {t.nav.toggleLang}
                            </button>
                            <button
                                onClick={() => setMenuOpen((o) => !o)}
                                className="md:hidden p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-gray-300 cursor-pointer"
                                aria-label={t.nav.menu}
                                aria-expanded={menuOpen}
                            >
                                {menuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 pb-5 pt-1 flex flex-col gap-1 border-t border-zinc-800/80">
                        {currentView === 'projects' && (
                            <button onClick={() => { setCurrentView('home'); setMenuOpen(false); }} className="text-start px-3 py-3 rounded-lg font-bold text-cyan-400 hover:bg-zinc-900 cursor-pointer">
                                {t.nav.backHome}
                            </button>
                        )}
                        {navItems.map((item, i) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-start px-3 py-3 rounded-lg font-bold text-gray-300 hover:bg-zinc-900 hover:text-cyan-300 cursor-pointer transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
                                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main content: key re-mounts the view so switching pages animates */}
            <main key={currentView} className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full animate-fade-in">
                {currentView === 'home' ? (
                    <Home t={t} lang={lang} isRTL={isRTL} openProjects={openProjects} scrollToSection={scrollToSection} />
                ) : (
                    <Projects
                        t={t}
                        lang={lang}
                        isRTL={isRTL}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                    />
                )}
            </main>

            <footer className="relative z-10 border-t border-zinc-800 bg-zinc-950/80 py-8 text-center text-gray-500 text-sm mt-auto">
                <div className="max-w-7xl mx-auto px-4">
                    <p>© {new Date().getFullYear()} {t.footer}</p>
                </div>
            </footer>
        </div>
    );
}
