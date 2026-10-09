/**
 * Renders a project's demo video from:
 *  - a local file in public/ (e.g. "videos/matchlens.mp4") → native <video>
 *  - a YouTube link (watch, youtu.be or shorts) → embedded player
 *  - a Vimeo link → embedded player
 *  - a Google Drive file link → embedded preview
 * Returns null when there is no video, so the section disappears.
 */
function toEmbed(url) {
    try {
        const u = new URL(url, window.location.origin);
        const host = u.hostname.replace('www.', '');

        if (host === 'youtu.be') return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
        if (host.endsWith('youtube.com')) {
            if (u.pathname.startsWith('/shorts/')) return `https://www.youtube.com/embed/${u.pathname.split('/')[2]}`;
            if (u.pathname.startsWith('/embed/')) return url;
            const id = u.searchParams.get('v');
            if (id) return `https://www.youtube.com/embed/${id}`;
        }
        if (host === 'vimeo.com') return `https://player.vimeo.com/video/${u.pathname.split('/').filter(Boolean)[0]}`;
        if (host === 'player.vimeo.com') return url;
        if (host === 'drive.google.com') {
            const match = u.pathname.match(/\/file\/d\/([^/]+)/);
            if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
        }
    } catch {
        return null;
    }
    return null;
}

export default function ProjectVideo({ src, title, poster }) {
    if (!src) return null;
    const embed = toEmbed(src);

    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-2xl">
            {embed ? (
                <iframe
                    src={embed}
                    title={title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    loading="lazy"
                />
            ) : (
                <video
                    src={src}
                    poster={poster || undefined}
                    controls
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-contain"
                />
            )}
        </div>
    );
}
