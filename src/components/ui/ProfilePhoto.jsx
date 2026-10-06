import { useState } from 'react';
import { profile } from '../../data/profile';

/** Profile photo with a rotating gradient ring. Falls back to an animated monogram. */
export default function ProfilePhoto({ alt, className = '' }) {
    const [failed, setFailed] = useState(!profile.photo);

    return (
        <div className={`relative aspect-square ${className}`}>
            {/* Glow */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-teal-500/30 via-cyan-500/20 to-emerald-500/30 blur-3xl animate-pulse" />

            {/* Spinning ring */}
            <div className="absolute -inset-[3px] rounded-full photo-ring" />

            <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950 border-4 border-zinc-950">
                {!failed ? (
                    <img
                        src={profile.photo}
                        alt={alt}
                        onError={() => setFailed(true)}
                        className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-teal-950" aria-label={alt} role="img">
                        <div className="absolute inset-0 bg-grid opacity-70" />
                        <span className="relative text-7xl md:text-8xl font-black text-gradient select-none">{profile.initials}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
