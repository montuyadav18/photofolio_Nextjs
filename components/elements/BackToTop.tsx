'use client'

import { useState, useEffect } from 'react';

/**
 * Custom Hook to handle the scroll-to-top button logic.
 * Detects scroll position and handles the click event.
 */
const useScrollToTop = (visibilityThreshold = 200) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Function to run on scroll event
        const toggleVisibility = () => {
            // Check if scroll position is past the threshold
            if (window.scrollY > visibilityThreshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Attach the scroll listener
        window.addEventListener('scroll', toggleVisibility);

        // Clean up the listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [visibilityThreshold]); // Re-run effect if threshold changes

    // Function to smoothly scroll to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return { isVisible, scrollToTop };
};

export default useScrollToTop;