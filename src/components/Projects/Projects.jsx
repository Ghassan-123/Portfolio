import React, { useState, useEffect, useRef } from 'react';
import { Filter, CheckCircle2, Monitor, ArrowLeft, ArrowRight } from 'lucide-react';
import projectsData from '../../data/projects.json';

export default function Projects({ t, lang, isRTL, activeFilter, setActiveFilter }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const showcaseRef = useRef(null);

    const allTags = Array.from(new Set(projectsData.flatMap((p) => p.tags)));
    const filteredProjects = activeFilter === 'All'
        ? projectsData
        : projectsData.filter((p) => p.tags.includes(activeFilter));

    useEffect(() => {
        if (filteredProjects.length > 0 && (!selectedProject || !filteredProjects.find((p) => p.id === selectedProject.id))) {
            setSelectedProject(filteredProjects[0]);
        }
    }, [activeFilter, filteredProjects, selectedProject]);

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        if (showcaseRef.current) {
            showcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject?.id);
    const nextProject = () => {
        const nextIdx = (currentIndex + 1) % filteredProjects.length;
        setSelectedProject(filteredProjects[nextIdx]);
    };
    const prevProject = () => {
        const prevIdx = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
        setSelectedProject(filteredProjects[prevIdx]);
    };

    return (
        <div className="animate-in fade-in duration-700 pb-16">

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 inline-block">
                    {t.projects.title}
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    {t.projects.subtitle}
                </p>
            </div>

            {/* Sticky Filter Bar */}
            <div className="sticky top-20 z-40 bg-zinc-950/90 backdrop-blur-md py-4 border-b border-zinc-800 mb-12 flex items-center gap-4 overflow-x-auto custom-scrollbar whitespace-nowrap px-2">
                <Filter className="text-gray-500 shrink-0" size={20} />
                <button
                    onClick={() => setActiveFilter('All')}
                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shrink-0 border-2 ${activeFilter === 'All' ? 'bg-teal-900/40 border-teal-400 text-white shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-zinc-900 border-zinc-800 text-gray-400 hover:border-teal-500/50 hover:text-gray-200'}`}
                >
                    {t.projects.filterAll}
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setActiveFilter(tag)}
                        className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shrink-0 border-2 ${activeFilter === tag ? 'bg-cyan-900/40 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-zinc-900 border-zinc-800 text-gray-400 hover:border-cyan-500/50 hover:text-gray-200'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Master Showcase View */}
            {selectedProject && (
                <div ref={showcaseRef} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden scroll-mt-24 mb-20 shadow-2xl animate-in slide-in-from-bottom-8 duration-500">

                    {/* Showcase Control Bar */}
                    <div className="flex justify-between items-center bg-zinc-950 p-4 border-b border-zinc-800">
                        <button
                            onClick={isRTL ? nextProject : prevProject}
                            className="flex items-center gap-2 text-cyan-400 hover:text-teal-300 font-semibold px-4 py-2 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                        >
                            <ArrowLeft size={18} /> {t.projects.prev}
                        </button>

                        <span className="text-gray-500 text-sm hidden md:block font-mono">
                            {currentIndex + 1} / {filteredProjects.length}
                        </span>

                        <button
                            onClick={isRTL ? prevProject : nextProject}
                            className="flex items-center gap-2 text-cyan-400 hover:text-teal-300 font-semibold px-4 py-2 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                        >
                            {t.projects.next} <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* Main Hero Banner */}
                    <div className="w-full h-[40vh] md:h-[60vh] bg-zinc-950 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent z-10"></div>
                        <img
                            src={selectedProject.mainImg}
                            alt={lang === 'en' ? selectedProject.titleEn : selectedProject.titleAr}
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute bottom-10 left-10 right-10 z-20">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
                                {lang === 'en' ? selectedProject.titleEn : selectedProject.titleAr}
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {selectedProject.tags.map((tag) => (
                                    <span key={tag} className="px-5 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-cyan-500/50 text-cyan-300 font-bold text-sm shadow-lg">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Description on top, Gallery underneath */}
                    <div className="p-10 md:p-14 space-y-12">
                        <div className="w-full">
                            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-500" />
                                {t.projects.detailsView}
                            </h3>
                            <p className="text-gray-300 text-xl leading-relaxed whitespace-pre-line">
                                {lang === 'en' ? selectedProject.detailedDescEn : selectedProject.detailedDescAr}
                            </p>
                        </div>

                        <div className="w-full border-t border-zinc-800 pt-12">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Monitor className="text-cyan-500" />
                                {t.projects.gallery}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {selectedProject.gallery.map((img, idx) => (
                                    <div key={idx} className="rounded-2xl overflow-hidden border border-zinc-800 hover:border-teal-500/50 transition-colors h-56 shadow-lg">
                                        <img
                                            src={img}
                                            alt={`Gallery item ${idx + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Grid of All Projects */}
            <h3 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">
                {activeFilter === 'All'
                    ? (lang === 'en' ? 'All Projects' : 'كل المشاريع')
                    : `${lang === 'en' ? 'Filtered by' : 'تصفية حسب'}: ${activeFilter}`}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        className={`group cursor-pointer flex flex-col bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${selectedProject?.id === project.id ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-zinc-800 hover:border-teal-500/50 hover:shadow-xl'}`}
                    >
                        <div className="w-full h-48 overflow-hidden bg-zinc-950 relative">
                            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <img
                                src={project.mainImg}
                                alt={lang === 'en' ? project.titleEn : project.titleAr}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-grow relative z-20">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                {lang === 'en' ? project.titleEn : project.titleAr}
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                                {lang === 'en' ? project.shortDescEn : project.shortDescAr}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.slice(0, 3).map((tech, idx) => (
                                    <span key={idx} className="text-xs font-bold px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-gray-300 group-hover:border-teal-500/30 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="text-xs font-bold px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-gray-500">
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}