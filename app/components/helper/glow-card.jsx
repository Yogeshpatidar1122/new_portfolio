"use client";

import { useEffect, useRef } from "react";

const GlowCard = ({ children, identifier }) => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        // Ensure code runs only on the client
        if (typeof window === "undefined") return;

        const container = containerRef.current;
        const cards = cardsRef.current;

        if (!container || cards.length === 0) return;

        const CONFIG = {
            proximity: 40,
            spread: 80,
            blur: 12,
            gap: 32,
            vertical: false,
            opacity: 0,
        };

        const handlePointerMove = (event) => {
            cards.forEach((card) => {
                const bounds = card.getBoundingClientRect();

                if (
                    event.x > bounds.left - CONFIG.proximity &&
                    event.x < bounds.right + CONFIG.proximity &&
                    event.y > bounds.top - CONFIG.proximity &&
                    event.y < bounds.bottom + CONFIG.proximity
                ) {
                    card.style.setProperty("--active", 1);
                } else {
                    card.style.setProperty("--active", CONFIG.opacity);
                }

                const centerX = bounds.left + bounds.width / 2;
                const centerY = bounds.top + bounds.height / 2;

                const angle =
                    (Math.atan2(event.y - centerY, event.x - centerX) * 180) / Math.PI;

                card.style.setProperty("--start", angle + 90);
            });
        };

        const applyStyles = () => {
            container.style.setProperty("--gap", CONFIG.gap);
            container.style.setProperty("--blur", CONFIG.blur);
            container.style.setProperty("--spread", CONFIG.spread);
            container.style.setProperty(
                "--direction",
                CONFIG.vertical ? "column" : "row"
            );
        };

        document.body.addEventListener("pointermove", handlePointerMove);
        applyStyles();

        return () => {
            document.body.removeEventListener("pointermove", handlePointerMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`glow-container-${identifier} glow-container`}
        >
            <article
                ref={(el) => el && cardsRef.current.push(el)}
                className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
            >
                <div className="glows"></div>
                {children}
            </article>
        </div>
    );
};

export default GlowCard;
