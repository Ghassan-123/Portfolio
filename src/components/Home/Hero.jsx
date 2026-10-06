import { ArrowRight, ArrowLeft, Mail, MapPin } from 'lucide-react';
import { useCountUp, useTypewriter } from '../../hooks/useScrollReveal';
import { profile } from '../../data/profile';
import { stats } from '../../lib/projects';
import ProfilePhoto from '../ui/ProfilePhoto';

function Stat({ value, label, delay }) {
    const [ref, count] = useCountUp(value);
    return (
        <div ref={ref} className="animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
            <div className="text-3xl md:text-4xl font-black text-white tabular-nums">
                {count}<span className="text-teal-400">+</span>
            </div>
            <div className="text-xs md:text-sm text-gray-400 font-semibold mt-1">{label}</div>
        </div>
    );
}

function RoleTypewriter({ roles }) {
    const text = useTypewriter(roles);
    return (
        <span className="text-gradient font-black">
            {text}
            <span className="inline-block w-[3px] h-[0.9em] bg-cyan-400 ms-1 align-[-0.1em] animate-blink" />
        </span>
    );
}

export default function Hero({ t, lang, isRTL, openProjects, scrollToSection }) {
    const name = lang === 'ar' ? profile.nameAr : profile.nameEn;
    const words = name.split(' ');

    return (
        <section className="relative grid lg:grid-cols-[1.25fr_1fr] gap-14 lg:gap-10 items-center pt-6 lg:pt-16 lg:min-h-[min(78vh,860px)]">
            {/* Text column */}
            <div className="order-2 lg:order-1 text-center lg:text-start">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-sm font-bold mb-8 animate-fade-up">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-dot" />
                    {t.hero.available}
                </div>

                <p className="text-lg md:text-xl text-gray-400 font-semibold mb-3 animate-fade-up" style={{ animationDelay: '80ms' }}>
                    {t.hero.greeting}
                </p>

                <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6 [perspective:600px]">
                    {words.map((word, i) => (
                        <span key={`${lang}-${i}`} className="animate-word me-[0.25em]" style={{ '--delay': `${200 + i * 140}ms` }}>
                            {i === words.length - 1 ? <span className="text-gradient">{word}</span> : word}
                        </span>
                    ))}
                </h1>

                <p className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 min-h-[2.5em] md:min-h-[1.4em] animate-fade-up" style={{ animationDelay: '600ms' }}>
                    {t.hero.rolePrefix}{' '}
                    <RoleTypewriter key={lang} roles={t.hero.roles} />
                </p>

                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '750ms' }}>
                    {t.hero.subtitle}
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12 animate-fade-up" style={{ animationDelay: '900ms' }}>
                    <button
                        onClick={() => openProjects('All')}
                        className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.35)] hover:shadow-[0_0_45px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1 text-lg cursor-pointer"
                    >
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                        <span className="relative">{t.hero.cta}</span>
                        {isRTL ? (
                            <ArrowLeft className="relative group-hover:-translate-x-1.5 transition-transform" />
                        ) : (
                            <ArrowRight className="relative group-hover:translate-x-1.5 transition-transform" />
                        )}
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-zinc-700 bg-zinc-900/60 backdrop-blur text-gray-200 font-bold text-lg hover:border-teal-500 hover:text-cyan-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                        <Mail size={20} /> {t.hero.ctaSecondary}
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto lg:mx-0 border-t border-zinc-800/80 pt-8">
                    <Stat value={stats.total} label={t.stats.projects} delay={1000} />
                    <Stat value={stats.ai} label={t.stats.ai} delay={1100} />
                    <Stat value={stats.react} label={t.stats.react} delay={1200} />
                    <Stat value={stats.solo} label={t.stats.solo} delay={1300} />
                </div>
            </div>

            {/* Photo column */}
            <div className="order-1 lg:order-2 flex flex-col items-center animate-scale-in" style={{ animationDelay: '300ms' }}>
                <div className="animate-float">
                    <ProfilePhoto alt={t.hero.photoAlt} className="w-60 sm:w-72 md:w-80 xl:w-[22rem]" />
                </div>
                {profile.location?.en && (
                    <div className="mt-8 flex items-center gap-2 text-gray-400 text-sm font-semibold">
                        <MapPin size={16} className="text-teal-400" />
                        {lang === 'ar' ? profile.location.ar : profile.location.en}
                    </div>
                )}
            </div>
        </section>
    );
}
