// global.d.ts

/**
 * Defines the minimal interface for a Swiper instance object.
 * This is used to type React useRef, specifically requiring the 'destroy' method.
 */
interface SwiperInstance {
    destroy: (deleteInstance: boolean, cleanupStyles: boolean) => void;
}

/**
 * Defines the type for the global Swiper constructor function.
 */
interface SwiperConstructor {
    new (selector: string, params: object): SwiperInstance;
}

/**
 * Extends the global Window object interface to include Swiper.
 * This ensures type safety when accessing Swiper via window.Swiper.
 */
declare global {
    interface Window {
        Swiper?: SwiperConstructor;
    }
}