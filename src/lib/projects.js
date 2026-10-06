import projectsData from '../data/projects.json';

export const projects = projectsData;

/** Picks the English or Arabic version of a field, e.g. pick(p, 'title', 'ar') → p.titleAr */
export function pick(project, field, lang) {
    const key = `${field}${lang === 'ar' ? 'Ar' : 'En'}`;
    return project[key] ?? project[`${field}En`];
}

export function countByTag(tag) {
    return projects.filter((p) => p.tags.includes(tag)).length;
}

export const stats = {
    total: projects.length,
    ai: projects.filter((p) => p.tags.includes('AI')).length,
    react: countByTag('React'),
    solo: projects.filter((p) => p.type === 'personal').length,
};

/** All filter tags, in a sensible display order. */
export const TAG_ORDER = ['AI', 'Computer Vision', 'LLM & NLP', 'Machine Learning', 'React', 'Laravel', 'Mobile', 'Game', 'Design', 'Simulation', 'Algorithms'];
export const allTags = TAG_ORDER.filter((t) => projects.some((p) => p.tags.includes(t)));
