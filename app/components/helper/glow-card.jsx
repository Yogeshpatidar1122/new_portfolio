"use client";

import { useEffect, useRef } from "react";

const GlowCard = ({ children, identifier }) => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        // This check ensures the code runs only on the client-side.
        if (typeof window === "undefined" || typeof document === "undefined") return;

        const CONFIG = {
            proximity: 40,
            spread: 80,
            blur: 12,
            gap: 32,
            vertical: false,
            opacity: 0,
        };

        const handlePointerMove = (event) => {
            // Loop through each card and calculate its position relative to the pointer
            cardsRef.current.forEach((card) => {
                const cardBounds = card.getBoundingClientRect();

                // Check if pointer is within the proximity of the card
                if (
                    event.x > cardBounds.left - CONFIG.proximity &&
                    event.x < cardBounds.right + CONFIG.proximity &&
                    event.y > cardBounds.top - CONFIG.proximity &&
                    event.y < cardBounds.bottom + CONFIG.proximity
                ) {
                    card.style.setProperty("--active", 1);
                } else {
                    card.style.setProperty("--active", CONFIG.opacity);
                }

                const cardCenter = [
                    cardBounds.left + cardBounds.width * 0.5,
                    cardBounds.top + cardBounds.height * 0.5,
                ];

                let angle =
                    (Math.atan2(event.y - cardCenter[1], event.x - cardCenter[0]) * 180) /
                    Math.PI;

                // Normalize angle
                angle = angle < 0 ? angle + 360 : angle;

                card.style.setProperty("--start", angle + 90);
            });
        };

        const applyStyles = () => {
            const container = containerRef.current;
            if (container) {
                container.style.setProperty("--gap", CONFIG.gap);
                container.style.setProperty("--blur", CONFIG.blur);
                container.style.setProperty("--spread", CONFIG.spread);
                container.style.setProperty(
                    "--direction",
                    CONFIG.vertical ? "column" : "row"
                );
            }
        };

        // // Add event listener to handle mouse movement
        // document.body.addEventListener("pointermove", handlePointerMove);
        // applyStyles();

        // // Cleanup the event listener when the component is unmounted
        // return () => {
        //     document.body.removeEventListener("pointermove", handlePointerMove);
        // };
    }, []); // Empty dependency array ensures this only runs on mount and unmount

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
