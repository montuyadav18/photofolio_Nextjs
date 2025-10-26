// This file extends the global Window object interface.
// No need to import this file; TypeScript automatically includes it.

/**
 * Defines the minimal interface for a Swiper instance object,
 * specifically requiring the 'destroy' method used in cleanup.
 */
interface SwiperInstance {
    destroy: (deleteInstance: boolean, cleanupStyles: boolean) => void;
}

/**
 * Defines the type for the global Swiper constructor function.
 */
interface SwiperConstructor {
    new(selector: string, params: object): SwiperInstance;
}

/**
 * Extends the global Window object interface to include Swiper,
 * allowing type-safe access without using 'window as any'.
 */
declare global {
    interface Window {
        Swiper?: SwiperConstructor;
    }
}