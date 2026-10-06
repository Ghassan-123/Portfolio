import { ArrowUpRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { projects, pick } from '../../lib/projects';
import SpotlightCard from '../ui/SpotlightCard';
import ProjectCover from '../ui/ProjectCover';

const WIDE = new Set([0, 2, 5]);

export default function FeaturedProjects({ t, lang, isRTL, openProjects }) {
    const featured = projects.filter((p) => p.featured);

    return (
        <section id="work" className="scroll-mt-32">
            <div data-reveal className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-3">{t.featured.title}</h2>
                    <p className="text-lg text-gray-400">{t.featured.subtitle}</p>
                </div>
                <button onClick={() => openProjects('All')} className="text-cyan-400 hover:text-teal-300 font-bold flex items-center gap-2 group cursor-pointer">
                    {t.featured.viewAll}
                    {isRTL
                        ? <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                        : <ChevronRight className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((project, i) => {
                    const title = pick(project, 'title', lang);
                    // Alternating bento: with 6 featured projects, cards 1, 3 and 6 span two
                    // columns so the three rows fill evenly (2+1, 2+1, 1+2).
                    const wide = WIDE.has(i);
                    return (
                        <SpotlightCard
                            as="button"
                            key={project.id}
                            data-reveal
                            style={{ '--delay': `${(i % 3) * 120}ms` }}
                            onClick={() => openProjects('All', project.id)}
                            className={`group text-start cursor-pointer flex flex-col bg-zinc-900/80 border border-zinc-800 hover:border-teal-500/40 rounded-3xl overflow-hidden ${wide ? 'lg:col-span-2' : ''}`}
                        >
                            <div className={`w-full overflow-hidden relative ${wide ? 'h-56 md:h-72' : 'h-48'}`}>
                                <ProjectCover project={project} title={title} imgClassName="group-hover:scale-105 transition-transform duration-700" large={wide} />
                                <span className="absolute top-4 start-4 z-10 text-xs font-bold px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur border border-teal-500/40 text-teal-300">
                                    {t.types[project.type]}
                                </span>
                            </div>
                            <div className="p-6 flex flex-col gap-3 flex-grow">
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{title}</h3>
                                    <ArrowUpRight className={`shrink-0 text-gray-500 group-hover:text-cyan-300 transition-all duration-300 group-hover:-translate-y-1 ${isRTL ? '-scale-x-100 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                                </div>
                                <p className="text-gray-400 leading-relaxed line-clamp-3">{pick(project, 'shortDesc', lang)}</p>
                                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                                    {project.tech.slice(0, 4).map((tech) => (
                                        <span key={tech} className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-gray-300">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </SpotlightCard>
                    );
                })}
            </div>
        </section>
    );
}
