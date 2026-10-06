import { useRef } from 'react';

/**
 * Card with a cursor-following glow and an optional subtle 3D tilt.
 * Pass any element type through `as` (div, button, article…).
 */
export default function SpotlightCard({ as: Tag = 'div', tilt = true, className = '', children, ...props }) {
    const ref = useRef(null);

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
        if (tilt && window.matchMedia('(pointer: fine)').matches) {
            const rx = ((y / rect.height) - 0.5) * -6;
            const ry = ((x / rect.width) - 0.5) * 6;
            el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        }
    };

    const handleLeave = () => {
        if (ref.current) ref.current.style.transform = '';
    };

    return (
        <Tag
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={`spotlight transition-[transform,border-color,box-shadow] duration-300 ease-out will-change-transform ${className}`}
            {...props}
        >
            {children}
        </Tag>
    );
}
