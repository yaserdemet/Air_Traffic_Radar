import React from 'react'

const useFullScreen = () => {
    const openFullscreen = (element?: HTMLElement | null) => {
        const target = element || document.documentElement;
        if (target.requestFullscreen) {
            target.requestFullscreen();
        }
    };

    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    return {
        openFullscreen,
        closeFullscreen
    };
};

export default useFullScreen