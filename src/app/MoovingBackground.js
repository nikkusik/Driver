// components/MovingBackground.js
'use client';

import { useEffect } from 'react';

const MovingBackground = () => {
    useEffect(() => {
        const numberOfImages = 9; // количество изображений на заднем фоне
        const images = [];
        for (let i = 0; i < numberOfImages; i++) {
            images.push(`url('bg${i + 1}.svg')`);
        }

        const square = Math.floor(Math.random() * (75 - 25 + 1)) + 50;

        const createImageElement = (src) => {
            const img = document.createElement('div');
            img.style.backgroundImage = src;
            img.className = 'bg-image';
            img.style.position = 'absolute';
            img.style.top = `${Math.random() * 100}vh`;
            img.style.left = `${Math.random() * 100}vw`;
            img.style.width = `${square}px`;
            img.style.height = `${square}px`;
            img.style.backgroundSize = 'cover';
            img.style.backgroundPosition = 'center';
            img.style.filter = 'brightness(0.25)'
            img.style.animation = `move ${Math.floor(Math.random() * (40 - 20 + 1)) + 20}s linear infinite`;
            return img;
        };

        const animateImages = () => {
            const bgContainer = document.getElementById('bg-container');
            if (!bgContainer) return;

            images.forEach(src => {
                const img = createImageElement(src);
                bgContainer.appendChild(img);
            });
        };

        animateImages();
    }, []);

    return <div id="bg-container" className="fixed inset-0 -z-1 pointer-events-none"></div>;
};

export default MovingBackground;