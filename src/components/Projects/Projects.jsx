import { useEffect, useRef } from 'react';
import {
    Filter, CheckCircle2, Images, ArrowLeft, ArrowRight, PlayCircle, Sparkles, UserRound, Layers, Calendar,
} from 'lucide-react';
import { projects, pick, allTags } from '../../lib/projects';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SpotlightCard from '../ui/SpotlightCard';
import ProjectCover from '../ui/ProjectCover';
import ProjectVideo from '../ui/ProjectVideo';

function SectionTitle({ icon: Icon, children, color = 'text-cyan-400' }) {
    return (
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Icon className={color} size={24} />
            {children}
        </h3>
    );
}

function Showcase({ project, t, lang, isRTL, index, total, onPrev, onNext }) {
    const title = pick(project, 'title', lang);
    const highlights = pick(project, 'highlights', lang) ?? [];
    const role = pick(project, 'role', lang);
    const PrevArrow = isRTL ? ArrowRight : ArrowLeft;
    const NextArrow = isRTL ? ArrowLeft : ArrowRight;

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl">
            {/* Control bar */}
            <div className="flex justify-between items-center bg-zinc-950 p-3 md:p-4 border-b border-zinc-800">
                <button onClick={onPrev} className="flex items-center gap-2 text-cyan-400 hover:text-teal-300 font-semibold px-4 py-2 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer group">
                    <PrevArrow size={18} className="transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" /> {t.projects.prev}
                </button>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                    {Array.from({ length: Math.min(total, 12) }).map((_, i) => (
                        <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === index % 12 ? 'w-6 bg-teal-400' : 'w-1.5 bg-zinc-700'}`} />
                    ))}
                    <span className="ms-3 text-gray-500 text-sm font-mono hidden sm:inline">{index + 1} / {total}</span>
                </div>
                <button onClick={onNext} className="flex items-center gap-2 text-cyan-400 hover:text-teal-300 font-semibold px-4 py-2 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer group">
                    {t.projects.next} <NextArrow size={18} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>
            </div>

            {/* key re-mounts the content, so each project animates in */}
            <div key={project.id} className="animate-fade-in">
                {/* Banner */}
                <div className="w-full h-[min(38vh,340px)] md:h-[min(52vh,520px)] bg-zinc-950 relative overflow-hidden">
                    <div className="absolute inset-0 animate-scale-in">
                        <ProjectCover project={project} title={title} large />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent z-10" />
                    <div className="absolute bottom-8 start-6 end-6 md:bottom-10 md:start-10 md:end-10 z-20 animate-fade-up" style={{ animationDelay: '120ms' }}>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 rounded-full bg-teal-500 text-zinc-950 font-black text-xs uppercase tracking-wider">
                                {t.types[project.type]}
                            </span>
                            {project.year && (
                                <span className="flex items-center gap-1.5 text-gray-300 text-sm font-semibold">
                                    <Calendar size={14} /> {project.year}
                                </span>
                            )}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-5 drop-shadow-lg max-w-4xl">{title}</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-bold text-sm">
                                    {t.tags[tag] ?? tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-12 grid lg:grid-cols-[1.6fr_1fr] gap-12">
                    <div className="space-y-12 min-w-0">
                        <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
                            <SectionTitle icon={CheckCircle2} color="text-emerald-400">{t.projects.detailsView}</SectionTitle>
                            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">{pick(project, 'detailedDesc', lang)}</p>
                        </div>

                        {project.video && (
                            <div className="animate-fade-up" style={{ animationDelay: '280ms' }}>
                                <SectionTitle icon={PlayCircle}>{t.projects.video}</SectionTitle>
                                <ProjectVideo src={project.video} title={title} poster={project.mainImg} />
                            </div>
                        )}

                        {project.gallery?.length > 0 && (
                            <div className="animate-fade-up" style={{ animationDelay: '340ms' }}>
                                <SectionTitle icon={Images}>{t.projects.gallery}</SectionTitle>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.gallery.map((img, idx) => (
                                        <a key={img} href={img} target="_blank" rel="noreferrer" className="group rounded-2xl overflow-hidden border border-zinc-800 hover:border-teal-500/50 transition-colors aspect-video block">
                                            <img src={img} alt={`${title} ${idx + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Side panel */}
                    <aside className="space-y-8 lg:sticky lg:top-28 self-start animate-fade-up" style={{ animationDelay: '260ms' }}>
                        {highlights.length > 0 && (
                            <div className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6">
                                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Sparkles size={18} className="text-teal-400" /> {t.projects.highlights}
                                </h4>
                                <ul className="space-y-3">
                                    {highlights.map((h) => (
                                        <li key={h} className="flex gap-3 text-gray-300 leading-relaxed">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {role && (
                            <div className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6">
                                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <UserRound size={18} className="text-cyan-400" /> {t.projects.role}
                                </h4>
                                <p className="text-gray-300 leading-relaxed">{role}</p>
                            </div>
                        )}

                        <div className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Layers size={18} className="text-emerald-400" /> {t.projects.techStack}
                            </h4>
                            <div className="flex flex-wrap gap-2" dir="ltr">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={tech}
                                        className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-gray-300 hover:border-teal-500/40 hover:text-teal-300 transition-colors animate-scale-in"
                                        style={{ animationDelay: `${300 + i * 40}ms` }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default function Projects({ t, lang, isRTL, activeFilter, setActiveFilter, selectedId, setSelectedId }) {
    const showcaseRef = useRef(null);
    const gridRef = useScrollReveal([activeFilter, lang]);

    const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.tags.includes(activeFilter));
    // Derived instead of synced through an effect: falls back to the first project in the filter.
    const selected = filtered.find((p) => p.id === selectedId) ?? filtered[0];
    const index = filtered.indexOf(selected);

    const goTo = (offset) => {
        if (!filtered.length) return;
        const next = filtered[(index + offset + filtered.length) % filtered.length];
        setSelectedId(next.id);
    };

    const handleSelect = (id) => {
        setSelectedId(id);
        showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Arrow keys move between projects (direction follows the reading direction).
    useEffect(() => {
        const onKey = (e) => {
            if (e.target.closest('input, textarea, iframe, video')) return;
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(isRTL ? -1 : 1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(isRTL ? 1 : -1); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    return (
        <div className="pb-16">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-up">
                <h1 className="text-5xl md:text-6xl font-black mb-6 text-gradient inline-block pb-2">{t.projects.title}</h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.projects.subtitle}</p>
            </div>

            {/* Sticky filter bar */}
            <div className="sticky top-20 z-40 bg-zinc-950/90 backdrop-blur-md py-4 border-b border-zinc-800 mb-12 flex items-center gap-3 overflow-x-auto thin-scrollbar whitespace-nowrap px-2 animate-fade-in">
                <Filter className="text-gray-500 shrink-0" size={20} />
                {['All', ...allTags].map((tag) => {
                    const active = activeFilter === tag;
                    const count = tag === 'All' ? projects.length : projects.filter((p) => p.tags.includes(tag)).length;
                    return (
                        <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shrink-0 border-2 cursor-pointer flex items-center gap-2 ${active
                                ? 'bg-teal-900/40 border-teal-400 text-white shadow-[0_0_18px_rgba(20,184,166,0.35)] scale-105'
                                : 'bg-zinc-900 border-zinc-800 text-gray-400 hover:border-teal-500/50 hover:text-gray-200'}`}
                        >
                            {tag === 'All' ? t.projects.filterAll : (t.tags[tag] ?? tag)}
                            <span className={`text-xs px-1.5 rounded-md ${active ? 'bg-teal-400/20 text-teal-200' : 'bg-zinc-800 text-gray-500'}`}>{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Showcase */}
            {selected && (
                <div ref={showcaseRef} className="scroll-mt-28 mb-20 animate-fade-up">
                    <Showcase
                        project={selected}
                        t={t}
                        lang={lang}
                        isRTL={isRTL}
                        index={index}
                        total={filtered.length}
                        onPrev={() => goTo(-1)}
                        onNext={() => goTo(1)}
                    />
                </div>
            )}

            {/* Grid */}
            <div className="flex items-end justify-between border-b border-zinc-800 pb-4 mb-8">
                <h3 className="text-3xl font-bold text-white">
                    {activeFilter === 'All' ? t.projects.allProjects : `${t.projects.filteredBy}: ${t.tags[activeFilter] ?? activeFilter}`}
                </h3>
                <span className="text-gray-500 font-semibold">{filtered.length} {t.projects.count}</span>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {filtered.map((project, i) => {
                    const title = pick(project, 'title', lang);
                    const isActive = selected?.id === project.id;
                    return (
                        <SpotlightCard
                            as="button"
                            key={project.id}
                            data-reveal
                            style={{ '--delay': `${(i % 3) * 90}ms` }}
                            onClick={() => handleSelect(project.id)}
                            className={`group text-start cursor-pointer flex flex-col bg-zinc-900 border rounded-2xl overflow-hidden ${isActive
                                ? 'border-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                                : 'border-zinc-800 hover:border-teal-500/50 hover:shadow-xl'}`}
                        >
                            <div className="w-full h-44 overflow-hidden bg-zinc-950 relative">
                                <ProjectCover project={project} title={title} imgClassName="transition-transform duration-700 group-hover:scale-110" />
                                <span className="absolute top-3 start-3 z-10 text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur border border-zinc-700 text-gray-300">
                                    {t.types[project.type]}
                                </span>
                                {project.video && (
                                    <PlayCircle className="absolute top-3 end-3 z-10 text-white/90 drop-shadow" size={26} />
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
                                <p className="text-gray-400 text-sm mb-5 flex-grow leading-relaxed line-clamp-3">{pick(project, 'shortDesc', lang)}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-gray-300 group-hover:border-teal-500/30 transition-colors">
                                            {t.tags[tag] ?? tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 3 && (
                                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-gray-500">+{project.tags.length - 3}</span>
                                    )}
                                </div>
                            </div>
                        </SpotlightCard>
                    );
                })}
            </div>
        </div>
    );
}
