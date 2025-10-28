"use client";
import { useEffect, useRef } from "react";
import Meta from "./components/Meta";
import Header from "./components/Header";
import Footer from "./components/Footer";

// 1. Declare the global Swiper type for the window object.
interface SwiperInstance {
  destroy: (deleteInstance: boolean, cleanupStyles: boolean) => void;
  // Add other properties/methods if needed, e.g., on, slideTo, etc.
}

// Define the Swiper options structure based on usage in the component
interface SwiperOptions {
  slidesPerView?: number | 'auto' | { [key: number]: number | 'auto' };
  spaceBetween?: number;
  loop?: boolean;
  speed?: number;
  autoplay?: {
    delay: number;
  } | boolean;
  breakpoints?: {
    [key: number]: {
      slidesPerView?: number | 'auto';
      spaceBetween?: number;
      // Add other relevant options if needed
    };
  };
  pagination?: boolean | {
    el?: string;
    type?: 'bullets' | 'progressbar' | 'fraction';
    clickable?: boolean;
  };
  // Add any other Swiper options used in the component
}

interface SwiperConstructor {
  // FIX: Replace 'options: any' with the specific 'SwiperOptions' interface
  new(selector: string | HTMLElement, options: SwiperOptions): SwiperInstance;
}

// NOTE: This declare global block should ideally be in a global.d.ts file
// at the project root to prevent TypeScript conflicts if it is declared elsewhere.
declare global {
  interface Window {
    Swiper?: SwiperConstructor;
  }
}

export default function Home() {
  // 2. Use the correct type for the useRef hook: SwiperInstance | null (ALREADY FIXED)
  const testimonialSwiperRef = useRef<SwiperInstance | null>(null);
  const brandSwiperRef = useRef<SwiperInstance | null>(null);

  // Helper to clear timer, handles both NodeJS.Timeout and number
  function safeClearInterval(timer: number | null) {
    if (timer !== null) {
      clearInterval(timer);
    }
  }

  // --- Testimonial Carousel Effect ---
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;
    const interval = 100;
    let timer: number | null = null;

    function initTestimonial(): boolean {
      // Check if Swiper exists on window and is callable
      const Swiper = window.Swiper;
      if (!Swiper) return false;

      try {
        if (testimonialSwiperRef.current) return true;

        // Use the checked and typed Swiper constructor
        testimonialSwiperRef.current = new Swiper('.testimonial .swiper', {
          slidesPerView: 1,
          spaceBetween: 24,
          loop: true,
          speed: 1200,
          autoplay: { delay: 4500 },
          breakpoints: {
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 2 },
          },
        });
        return true;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('initTestimonial error', e);
        return false;
      }
    }

    if (!initTestimonial()) {
      // Use as unknown as number for compatibility
      timer = window.setInterval(() => {
        attempts += 1;
        if (initTestimonial() || attempts >= maxAttempts) {
          safeClearInterval(timer);
          timer = null;
        }
      }, interval) as unknown as number;
    }

    return () => {
      safeClearInterval(timer);
      try {
        // Safely destroy the instance
        if (testimonialSwiperRef.current) {
          testimonialSwiperRef.current.destroy(true, true);
          testimonialSwiperRef.current = null;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('destroy testimonial swiper error', e);
      }
    };
  }, []);

  // --- Brand Carousel Effect ---
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;
    const interval = 100;
    let timer: number | null = null;

    function initBrand(): boolean {
      // Check if Swiper exists on window and is callable
      const Swiper = window.Swiper;
      if (!Swiper) return false;

      try {
        if (brandSwiperRef.current) return true;

        // Use the checked and typed Swiper constructor
        brandSwiperRef.current = new Swiper('.brandCarousel .swiper', {
          pagination: false,
          spaceBetween: 24,
          loop: true,
          speed: 2000,
          autoplay: { delay: 2000 },
          breakpoints: {
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          },
        });
        return true;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('initBrand error', e);
        return false;
      }
    }

    if (!initBrand()) {
      // Use as unknown as number for compatibility
      timer = window.setInterval(() => {
        attempts += 1;
        if (initBrand() || attempts >= maxAttempts) {
          safeClearInterval(timer);
          timer = null;
        }
      }, interval) as unknown as number;
    }

    return () => {
      safeClearInterval(timer);
      try {
        // Safely destroy the instance
        if (brandSwiperRef.current) {
          brandSwiperRef.current.destroy(true, true);
          brandSwiperRef.current = null;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('destroy brand swiper error', e);
      }
    };
  }, []);

  // --- JSX Return ---
  return (
    <div className="overflow-x-hidden" style={{ overflowY: 'auto' }}>
      <div className="main-wrapper">
        <>
          <Meta />
          {/* Header Start */}
          <Header />

          {/* Hero section start */}
          <section className="bg-secondary position-relative pt-140 pb-90">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="hero-content-wrapper">
                    <span
                      className="font-Syne text-dark fw-bold lh-1 text-2xl d-flex flex-wrap align-items-center hello-iam"
                      data-aos="fade-right"
                      data-aos-delay={300}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={65}
                          height={2}
                          viewBox="0 0 65 2"
                          fill="none"
                        >
                          <path d="M0 1H65" stroke="#080808" />
                        </svg>
                      </span>
                      Hello, I’m
                      <img src="/images/icon/victory.png" alt="icon" />
                    </span>
                    <h1
                      className="hero-title font-Syne fw-bold position-relative z-1 circle-shape"
                      data-aos="fade-right"
                      data-aos-delay={400}
                    >
                      Sajjat
                    </h1>
                    <h2
                      className="hero-title font-Syne fw-bold mb-20 mt-8"
                      data-aos="fade-right"
                      data-aos-delay={600}
                    >
                      Mujawar
                    </h2>
                    <p
                      className="font-Syne fw-bold text-lg leading-tight iam-designer mt-5 mb-30"
                      data-aos="fade-right"
                      data-aos-delay={800}
                    >
                      Creative Designer | Based in Mumbai
                    </p>
                    <div className="d-flex flex-wrap hero-btn-wraper">
                      {/* Link Start */}
                      <span data-aos="fade-right" data-aos-delay={1000}>
                        <a
                          href="/contact"
                          className="d-flex align-items-center flex-wrap btn-primary"
                        >
                          Let’s Talk
                          <span className="animate-arrow-up">
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 17L17 7"
                                stroke="currentColor"
                                strokeOpacity="0.9"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 7H17V17"
                                stroke="currentColor"
                                strokeOpacity="0.9"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </a>
                      </span>
                      {/* Link End */}
                      {/* Link Start */}
                      <span data-aos="fade-right" data-aos-delay={1200}>
                        <a
                          href="/projects"
                          className="d-flex align-items-center flex-wrap btn-primary-outline"
                        >
                          My Work
                          <span className="animate-arrow-up">
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 17L17 7"
                                stroke="currentColor"
                                strokeOpacity="0.9"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 7H17V17"
                                stroke="currentColor"
                                strokeOpacity="0.9"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </a>
                      </span>
                      {/* Link End */}
                    </div>
                    <div
                      className="d-flex flex-wrap align-items-center"
                      data-aos="fade-right"
                      data-aos-delay={1400}
                    >
                      <div className="d-flex flex-wrap align-items-center">
                        <span className="font-Syne text-dark fw-bold text-counter lh-1">
                          <span className="counter">3.50</span>+
                        </span>
                        <span className="text-worldwide text-lg">Worldwide client</span>
                        <span className="mx-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={2}
                            height={14}
                            viewBox="0 0 2 14"
                            fill="none"
                          >
                            <path d="M1 0L1 14" stroke="#080808" strokeOpacity="0.4" />
                          </svg>
                        </span>
                      </div>
                      <div className="social-links">
                        <ul className="d-flex flex-wrap align-items-center list-unstyled">
                          <li>
                            {/* Instagram */}
                            <a href="#" className="text-dark">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.75 2H16.25C19.425 2 22 4.575 22 7.75V16.25C22 19.425 19.425 22 16.25 22H7.75C4.575 22 2 19.425 2 16.25V7.75C2 4.575 4.575 2 7.75 2ZM7.75 4C5.67893 4 4 5.67893 4 7.75V16.25C4 18.3211 5.67893 20 7.75 20H16.25C18.3211 20 20 18.3211 20 16.25V7.75C20 5.67893 18.3211 4 16.25 4H7.75ZM12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM17.5 6.5C18.0523 6.5 18.5 6.94772 18.5 7.5C18.5 8.05228 18.0523 8.5 17.5 8.5C16.9477 8.5 16.5 8.05228 16.5 7.5C16.5 6.94772 16.9477 6.5 17.5 6.5Z"
                                  fill="currentColor"
                                  fillOpacity="0.9"
                                />
                              </svg>
                            </a>
                          </li>

                          <li>
                            {/* LinkedIn */}
                            <a href="#" className="text-dark">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.94 5C6.94 5.53 6.729 6.039 6.354 6.414C5.979 6.789 5.47 7 4.94 7C4.41 7 3.9 6.789 3.526 6.414C3.151 6.039 2.94 5.53 2.94 5C2.94 4.47 3.151 3.959 3.526 3.584C3.9 3.209 4.41 2.998 4.94 2.998C5.47 2.998 5.979 3.209 6.354 3.584C6.729 3.959 6.94 4.47 6.94 5ZM7 8.48H3V21H7V8.48ZM13.32 8.48H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.9 14.94 7.13 13.28 10.16L13.32 8.48Z"
                                  fill="currentColor"
                                  fillOpacity="0.9"
                                />
                              </svg>
                            </a>
                          </li>

                          <li>
                            {/* Behance */}
                            <a href="#" className="text-dark">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.443 5.35C8.082 5.35 8.673 5.4 9.213 5.548C9.754 5.647 10.197 5.845 10.59 6.092C10.984 6.34 11.279 6.686 11.475 7.131C11.672 7.576 11.771 8.121 11.771 8.714C11.771 9.407 11.623 10 11.279 10.445C10.984 10.891 10.492 11.286 9.902 11.583C10.738 11.831 11.377 12.276 11.771 12.87C12.164 13.463 12.41 14.205 12.41 15.046C12.41 15.739 12.262 16.332 12.016 16.827C11.771 17.322 11.377 17.767 10.934 18.064C10.453 18.382 9.921 18.616 9.361 18.756C8.771 18.905 8.181 19.004 7.591 19.004H1V5.35H7.443ZM7.049 10.89C7.59 10.89 8.033 10.742 8.377 10.495C8.721 10.248 8.869 9.802 8.869 9.258C8.869 8.961 8.819 8.665 8.721 8.467C8.623 8.269 8.475 8.12 8.279 7.972C8.082 7.873 7.885 7.774 7.639 7.725C7.393 7.675 7.148 7.675 6.852 7.675H4V10.891H7.05L7.049 10.89ZM7.197 16.728C7.492 16.728 7.787 16.678 8.033 16.629C8.279 16.579 8.525 16.481 8.721 16.332C8.921 16.187 9.089 16.002 9.213 15.788C9.311 15.541 9.41 15.244 9.41 14.898C9.41 14.205 9.213 13.711 8.82 13.364C8.426 13.067 7.885 12.919 7.246 12.919H4V16.729L7.197 16.728ZM16.689 16.678C17.082 17.074 17.672 17.272 18.459 17.272C19 17.272 19.492 17.124 19.885 16.877C20.279 16.58 20.525 16.283 20.623 15.987H23.033C22.639 17.173 22.049 18.014 21.263 18.559C20.475 19.053 19.541 19.35 18.41 19.35C17.686 19.352 16.969 19.218 16.295 18.954C15.689 18.727 15.148 18.353 14.721 17.866C14.264 17.411 13.927 16.85 13.738 16.233C13.492 15.59 13.393 14.898 13.393 14.106C13.393 13.364 13.492 12.672 13.738 12.028C13.975 11.409 14.325 10.838 14.771 10.347C15.22 9.886 15.754 9.516 16.344 9.258C17.001 8.994 17.702 8.86 18.41 8.862C19.246 8.862 19.984 9.011 20.623 9.357C21.263 9.703 21.754 10.099 22.147 10.693C22.541 11.237 22.837 11.88 23.033 12.573C23.131 13.265 23.18 13.958 23.131 14.749H16C16 15.541 16.295 16.283 16.689 16.679V16.678ZM19.787 11.484C19.443 11.138 18.902 10.94 18.262 10.94C17.82 10.94 17.475 11.04 17.18 11.188C16.885 11.336 16.689 11.534 16.492 11.732C16.311 11.923 16.191 12.164 16.148 12.424C16.098 12.672 16.049 12.87 16.049 13.067H20.475C20.377 12.325 20.131 11.831 19.787 11.484Z"
                                  fill="currentColor"
                                  fillOpacity="0.9"
                                />
                              </svg>
                            </a>
                          </li>
                        </ul>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-none d-md-block">
              <img
                className="position-absolute top-0 end-0 hero-image"
                data-aos="fade-left"
                src="/images/hero/hero-image.png"
                alt="hero Image"
              />
              <a href="/contact" className="contact-spin">
                <svg
                  className="position-absolute"
                  width={180}
                  height={180}
                  viewBox="0 0 180 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="animate-spin">
                    <path
                      d="M157.631 90C157.631 127.352 127.352 157.632 89.9995 157.632C52.6476 157.632 22.3678 127.352 22.3678 90C22.3678 52.6481 52.6476 22.3683 89.9995 22.3683C127.352 22.3683 157.631 52.6481 157.631 90Z"
                      fill="#080808"
                      stroke="#FFB646"
                      strokeWidth="2.08333"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M43.7883 74.5846C43.5199 75.4042 43.1104 76.0554 42.5597 76.5383C42.0037 77.0107 41.3536 77.3039 40.6095 77.4181C39.8574 77.5296 39.0598 77.4474 38.2165 77.1713C37.3654 76.8927 36.6735 76.4873 36.141 75.9552C35.6005 75.4205 35.2458 74.7983 35.0767 74.0886C34.9103 73.3709 34.9612 72.6023 35.2295 71.7827C35.5469 70.8133 36.0426 70.0987 36.7167 69.6388C37.3908 69.1789 38.1805 69.0055 39.0858 69.1186L38.6292 70.5135C38.1123 70.4665 37.6527 70.5778 37.2503 70.8474C36.8479 71.1171 36.5474 71.5553 36.3487 72.1622C36.0778 72.9897 36.1474 73.7367 36.5574 74.4032C36.9596 75.0671 37.6532 75.5603 38.6384 75.8828C39.6156 76.2027 40.4627 76.2139 41.1796 75.9163C41.8965 75.6188 42.3905 75.0562 42.6614 74.2287C42.86 73.6219 42.8847 73.0934 42.7354 72.6431C42.5862 72.1929 42.2971 71.8365 41.8682 71.5739L42.3249 70.179C43.0903 70.6128 43.6049 71.2132 43.8687 71.9801C44.1324 72.7471 44.1056 73.6152 43.7883 74.5846Z"
                      fill="white"
                    />
                    <path
                      d="M50.1726 61.9256C49.6756 62.6305 49.0849 63.1374 48.4004 63.4462C47.7159 63.7551 46.9941 63.8651 46.2348 63.7763C45.4688 63.6826 44.7232 63.3802 43.998 62.8689C43.2728 62.3576 42.7408 61.7594 42.4021 61.0741C42.0566 60.3841 41.9143 59.6648 41.9752 58.9163C42.0362 58.1679 42.3151 57.4412 42.812 56.7363C43.309 56.0315 43.8997 55.5246 44.5842 55.2158C45.2687 54.9069 45.9915 54.8027 46.7528 54.9031C47.512 54.9919 48.2542 55.292 48.9794 55.8032C49.7046 56.3145 50.24 56.9152 50.5855 57.6052C50.929 58.2837 51.0703 58.9972 51.0094 59.7456C50.9484 60.4941 50.6695 61.2208 50.1726 61.9256ZM49.2067 61.2447C49.5508 60.7567 49.741 60.2567 49.7774 59.7446C49.8185 59.2257 49.7074 58.7212 49.4441 58.2312C49.1808 57.7411 48.7679 57.2978 48.2053 56.9012C47.6428 56.5046 47.0865 56.2646 46.5365 56.1812C45.9865 56.0979 45.474 56.1627 44.9991 56.3758C44.529 56.5821 44.1219 56.9293 43.7779 57.4173C43.4338 57.9053 43.2412 58.4087 43.2001 58.9276C43.1589 59.4465 43.27 59.951 43.5333 60.441C43.8014 60.9242 44.2167 61.3642 44.7793 61.7608C45.3418 62.1574 45.8957 62.4008 46.4409 62.4909C46.9909 62.5743 47.5034 62.5094 47.9783 62.2963C48.4532 62.0832 48.8627 61.7327 49.2067 61.2447Z"
                      fill="white"
                    />
                    <path
                      d="M57.1532 53.6456L51.7944 46.7785L52.8343 45.967L60.3121 48.4499L56.2777 43.28L57.3175 42.4685L62.6763 49.3356L61.6365 50.1471L54.1587 47.6642L58.1931 52.8341L57.1532 53.6456Z"
                      fill="white"
                    />
                    <path
                      d="M70.5729 45.1508L67.6243 38.1023L65.248 39.0964L64.835 38.1092L70.793 35.6168L71.206 36.604L68.8412 37.5933L71.7898 44.6418L70.5729 45.1508Z"
                      fill="white"
                    />
                    <path
                      d="M78.8716 42.2432L80.7576 33.1533L82.1851 32.9397L86.6248 41.083L85.2465 41.2892L84.1931 39.2953L80.6734 39.822L80.2499 42.0369L78.8716 42.2432ZM80.8879 38.733L83.6692 38.3168L81.6911 34.599L80.8879 38.733Z"
                      fill="white"
                    />
                    <path
                      d="M96.3093 41.6882C95.4534 41.5795 94.7363 41.3002 94.1579 40.8504C93.5887 40.3935 93.1778 39.8103 92.925 39.1008C92.6734 38.3831 92.6034 37.584 92.7153 36.7034C92.8282 35.8146 93.0957 35.0584 93.5178 34.4346C93.9409 33.8026 94.4851 33.3366 95.1504 33.0364C95.824 32.7373 96.5887 32.6421 97.4445 32.7508C98.4568 32.8794 99.2525 33.2313 99.8317 33.8066C100.411 34.382 100.73 35.125 100.79 36.0357L99.3337 35.8507C99.2823 35.3341 99.0861 34.9036 98.7452 34.5592C98.4042 34.2149 97.9169 34.0025 97.2832 33.922C96.4191 33.8122 95.6984 34.0217 95.1212 34.5505C94.5449 35.071 94.1915 35.8456 94.0608 36.8743C93.9312 37.8948 94.0803 38.7291 94.5081 39.3772C94.9359 40.0252 95.5818 40.4041 96.4459 40.5139C97.0796 40.5944 97.6035 40.5188 98.0176 40.287C98.4317 40.0553 98.7272 39.704 98.9041 39.2331L100.361 39.4181C100.079 40.252 99.5866 40.871 98.8831 41.275C98.1795 41.679 97.3216 41.8168 96.3093 41.6882Z"
                      fill="white"
                    />
                    <path
                      d="M108.074 44.5801L110.985 37.5128L108.603 36.5314L109.01 35.5415L114.984 38.0021L114.576 38.992L112.205 38.0153L109.294 45.0827L108.074 44.5801Z"
                      fill="white"
                    />
                    <path
                      d="M123.795 54.407L130.354 48.6754L131.378 49.8467L128.952 55.883L135.251 54.2787L136.274 55.45L129.715 61.1815L128.847 60.1883L133.692 55.9552L128.032 57.3643L127.361 56.596L129.498 51.1752L124.663 55.4002L123.795 54.407Z"
                      fill="white"
                    />
                    <path
                      d="M133.257 67.1066L141.164 63.4523L143.487 68.4788L142.516 68.9278L140.746 65.0986L138.283 66.2366L139.897 69.727L138.948 70.1655L137.335 66.6752L134.782 67.855L136.552 71.6842L135.58 72.1332L133.257 67.1066Z"
                      fill="white"
                    />
                    <path
                      d="M137.181 86.6396L138.426 86.6423L138.411 93.4738L137.167 93.4711L137.181 86.6396Z"
                      fill="white"
                    />
                    <path
                      d="M133.683 111.594C134.061 110.818 134.556 110.229 135.168 109.826C135.783 109.434 136.468 109.232 137.221 109.221C137.981 109.213 138.761 109.404 139.558 109.792C140.364 110.185 140.994 111.006 141.449 111.954C141.912 112.903 142.178 113.918 142.248 114.996C142.315 115.961 142.16 116.899 141.782 117.791C141.335 118.73 140.746 119.37 140.015 119.728C139.284 120.086 138.477 120.151 137.596 119.907L138.239 118.587C138.745 118.704 139.215 118.657 139.651 118.445C140.087 118.232 140.445 117.839 140.724 117.265C141.106 116.482 141.139 115.732 140.824 115.016C140.516 114.303 139.896 113.719 138.964 113.265C138.04 112.814 137.202 112.687 136.45 112.884C135.699 113.081 135.133 113.571 134.751 114.354C134.471 114.928 134.375 115.448 134.461 115.915C134.547 116.381 134.785 116.774 135.174 117.093L134.531 118.413C133.832 117.878 133.404 117.213 133.247 116.417C133.091 115.621 133.236 114.764 133.683 113.847Z"
                      fill="white"
                    />
                    <path
                      d="M125.614 123.254C126.204 122.624 126.859 122.203 127.58 121.991C128.3 121.78 129.031 121.77 129.771 121.962C130.517 122.161 131.214 122.563 131.862 123.169C132.51 123.776 132.955 124.442 133.197 125.167C133.444 125.898 133.486 126.631 133.323 127.364C133.159 128.097 132.783 128.779 132.194 129.409C131.604 130.039 130.949 130.46 130.228 130.672C129.508 130.884 128.777 130.887 128.037 130.683C127.297 130.491 126.602 130.091 125.954 129.485C125.306 128.878 124.858 128.21 124.611 127.478C124.364 126.759 124.322 126.032 124.485 125.299C124.649 124.566 125.025 123.884 125.614 123.254ZM126.478 124.062C126.07 124.498 125.812 124.967 125.706 125.47C125.594 125.978 125.634 126.493 125.828 127.015C126.021 127.537 126.369 128.033 126.872 128.503C127.375 128.974 127.893 129.288 128.427 129.446C128.96 129.605 129.477 129.611 129.977 129.465C130.471 129.325 130.922 129.037 131.33 128.601C131.738 128.165 131.998 127.693 132.111 127.184C132.223 126.676 132.182 126.161 131.989 125.639C131.789 125.123 131.439 124.63 130.936 124.16C130.433 123.689 129.918 123.372 129.39 123.208C128.856 123.049 128.339 123.043 127.84 123.189C127.34 123.335 126.886 123.626 126.478 124.062Z"
                      fill="white"
                    />
                    <path
                      d="M117.563 130.504L121.936 138.038L120.795 138.7L113.725 135.221L117.017 140.893L115.876 141.555L111.503 134.021L112.644 133.358L119.714 136.838L116.422 131.166L117.563 130.504Z"
                      fill="white"
                    />
                    <path
                      d="M103.11 137.094L105.066 144.482L107.557 143.822L107.831 144.857L101.586 146.511L101.312 145.476L103.79 144.819L101.834 137.431L103.11 137.094Z"
                      fill="white"
                    />
                    <path
                      d="M94.5093 138.832L91.3962 147.578L89.9528 147.594L86.6703 138.92L88.0639 138.904L88.8342 141.024L92.3929 140.984L93.1157 138.848L94.5093 138.832ZM92.0312 142.033L89.2191 142.065L90.6695 146.018L92.0312 142.033Z"
                      fill="white"
                    />
                    <path
                      d="M77.1843 137.002C78.0177 137.224 78.6908 137.597 79.2035 138.121C79.7061 138.65 80.0349 139.283 80.1901 140.02C80.3432 140.764 80.3052 141.566 80.0762 142.423C79.8451 143.289 79.4785 144.002 78.9766 144.563C78.4725 145.133 77.8707 145.521 77.1713 145.73C76.4638 145.936 75.6933 145.927 74.8599 145.705C73.8742 145.441 73.133 144.986 72.6364 144.338C72.1397 143.69 71.9228 142.911 71.9857 142.001L73.4041 142.38C73.3858 142.898 73.5224 143.351 73.814 143.738C74.1055 144.125 74.5598 144.401 75.1769 144.566C76.0183 144.791 76.7605 144.68 77.4035 144.233C78.0443 143.795 78.4984 143.075 78.766 142.073C79.0314 141.079 78.9956 140.233 78.6588 139.533C78.3219 138.834 77.7327 138.372 76.8913 138.147C76.2742 137.982 75.745 137.987 75.3036 138.161C74.8622 138.335 74.5223 138.643 74.2838 139.086L72.8654 138.707C73.2563 137.919 73.8274 137.372 74.5787 137.066C75.3301 136.76 76.1986 136.739 77.1843 137.002Z"
                      fill="white"
                    />
                    <path
                      d="M65.8866 132.522L62.0282 139.116L64.2512 140.417L63.7107 141.34L58.1373 138.079L58.6777 137.155L60.8899 138.45L64.7483 131.856L65.8866 132.522Z"
                      fill="white"
                    />
                    <path
                      d="M51.6575 120.629L44.3842 125.419L43.5287 124.121L46.7486 118.469L40.2915 119.206L39.436 117.907L46.7093 113.116L47.4348 114.218L42.0629 117.756L47.8604 117.126L48.4216 117.978L45.5706 123.059L50.9321 119.527L51.6575 120.629Z"
                      fill="white"
                    />
                    <path
                      d="M44.0233 106.773L35.696 109.316L34.0791 104.022L35.1022 103.71L36.3339 107.743L38.9273 106.95L37.8045 103.275L38.8038 102.969L39.9266 106.645L42.6151 105.824L41.3833 101.791L42.4064 101.479L44.0233 106.773Z"
                      fill="white"
                    />
                    <path
                      d="M38.2513 95.1897L37.1449 95.2462L36.8866 90.1867L37.993 90.1302L38.2513 95.1897Z"
                      fill="white"
                    />
                  </g>
                  <g>
                    <path
                      d="M89.9999 123.016C108.234 123.016 123.016 108.234 123.016 89.9999C123.016 71.7654 108.234 56.9834 89.9999 56.9834C71.7654 56.9834 56.9834 71.7654 56.9834 89.9999C56.9834 108.234 71.7654 123.016 89.9999 123.016Z"
                      fill="#FFB646"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M89.0556 105.833H88.7517C88.7517 102.454 87.0878 100.016 84.9217 98.2993C82.7319 96.5641 80.0806 95.6169 78.3337 95.2864L78.721 93.2394C80.7295 93.6194 83.7111 94.6819 86.2156 96.6665C87.1483 97.4056 88.0215 98.2792 88.7523 99.2971V74.1667H90.8356V99.7399C91.622 98.5303 92.6098 97.5106 93.6751 96.6665C96.1795 94.6819 99.1612 93.6194 101.17 93.2394L101.557 95.2864C99.8101 95.6169 97.1587 96.5641 94.969 98.2993C92.8028 100.016 91.1389 102.454 91.1389 105.833H90.835H89.0556Z"
                      fill="#080808"
                      fillOpacity="0.9"
                    />
                  </g>
                </svg>
              </a>
            </div>
          </section>
          {/* Hero section end */}

          {/* Service start */}
          <section className="py-120">
            <div className="container">
              <div
                className="row mb-12 align-items-center"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <div className="col-12 col-lg-6">
                  <div className="fw-bold font-Syne lh-1 d-flex flex-wrap flex-column gap-y-2">
                    <span className="text-warning text-xl">Services</span>
                    <h3 className="text-dark section-title position-relative circle-shape">
                      My specialties
                    </h3>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <p className="paragraph">
                    Synergistically seize front-end methods of empowerment without extensive core competencies. Progressively repurpose alternative platforms
                    {" "}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-xl-8">
                  <div className="row row-gap-24">
                    {/* service Item - Graphic Design */}
                    <div className="col-12 col-sm-6 col-md-4">
                      <div className="service-card" data-aos="fade-up" data-aos-delay={500}>
                        {/* Icon */}
                        <div className="d-flex flex-wrap align-items-center justify-content-center service-icon">
                          <img
                            src="/images/icon/graphic-design-icon.svg"
                            alt="service icon"
                            width={30}
                            height={30}
                            className="img-fluid"
                          />
                        </div>
                        {/* Icon End */}
                        <h4>
                          <a
                            href="/projects"
                            className="d-flex flex-wrap align-items-end justify-content-between fw-bold text-xl font-Syne service-card-link"
                          >
                            Graphic <br /> Designer
                            <span className="animate-arrow-up">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="transition-all"
                                  d="M7 17L17 7"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="transition-all"
                                  d="M7 7H17V17"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </a>
                        </h4>
                      </div>
                    </div>
                    {/* service Item End */}

                    {/* service Item - Digital Design */}
                    <div className="col-12 col-sm-6 col-md-4">
                      <div className="service-card" data-aos="fade-up" data-aos-delay={700}>
                        {/* Icon */}
                        <div className="d-flex flex-wrap align-items-center justify-content-center service-icon">
                          <img
                            src="/images/icon/digital-design-icon.svg"
                            alt="service icon"
                            width={30}
                            height={30}
                            className="img-fluid"
                          />
                        </div>
                        {/* Icon End */}
                        <h4>
                          <a
                            href="/projects"
                            className="d-flex flex-wrap align-items-end justify-content-between fw-bold text-xl font-Syne service-card-link"
                          >
                            Digital Creative<br /> Design
                            <span className="animate-arrow-up">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="transition-all"
                                  d="M7 17L17 7"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="transition-all"
                                  d="M7 7H17V17"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </a>
                        </h4>
                      </div>
                    </div>
                    {/* service Item End */}

                    {/* service Item - Branding & Visual Identity */}
                    <div className="col-12 col-sm-6 col-md-4">
                      <div className="service-card" data-aos="fade-up" data-aos-delay={900}>
                        {/* Icon */}
                        <div className="d-flex flex-wrap align-items-center justify-content-center service-icon">
                          <img
                            src="/images/icon/branding-&-visual-identity-icon.svg"
                            alt="service icon"
                            width={26}
                            height={26}
                            className="img-fluid"
                          />
                        </div>
                        {/* Icon End */}
                        <h4>
                          <a
                            href="/projects"
                            className="d-flex flex-wrap align-items-end justify-content-between fw-bold text-xl font-Syne service-card-link"
                          >
                            Branding <br /> Visual Identity
                            <span className="animate-arrow-up">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="transition-all"
                                  d="M7 17L17 7"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="transition-all"
                                  d="M7 7H17V17"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </a>
                        </h4>
                      </div>
                    </div>
                    {/* service Item End */}

                    {/* service Item - Concept Development & Art Direction */}
                    <div className="col-12 col-sm-6 col-md-4">
                      <div className="service-card" data-aos="fade-up" data-aos-delay={1100}>
                        {/* Icon */}
                        <div className="d-flex flex-wrap align-items-center justify-content-center service-icon">
                          <img
                            src="/images/icon/concept-development-&-art-direction-icon.svg"
                            alt="service icon"
                            width={30}
                            height={30}
                            className="img-fluid"
                          />
                        </div>
                        {/* Icon End */}
                        <h4>
                          <a
                            href="/projects"
                            className="d-flex flex-wrap align-items-end justify-content-between fw-bold text-xl font-Syne service-card-link"
                          >
                            Concept <br /> Art Direction
                            <span className="animate-arrow-up">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="transition-all"
                                  d="M7 17L17 7"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="transition-all"
                                  d="M7 7H17V17"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </a>
                        </h4>
                      </div>
                    </div>
                    {/* service Item End */}

                    {/* service Item - Typography & Layout */}
                    <div className="col-12 col-sm-6 col-md-4">
                      <div className="service-card" data-aos="fade-up" data-aos-delay={1300}>
                        {/* Icon */}
                        <div className="d-flex flex-wrap align-items-center justify-content-center service-icon">
                          <img
                            src="/images/icon/typography-&-layout-icon.svg"
                            alt="service icon"
                            width={30}
                            height={30}
                            className="img-fluid"
                          />
                        </div>
                        {/* Icon End */}
                        <h4>
                          <a
                            href="/projects"
                            className="d-flex flex-wrap align-items-end justify-content-between fw-bold text-xl font-Syne service-card-link"
                          >
                            Typography <br /> Layout
                            <span className="animate-arrow-up">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="transition-all"
                                  d="M7 17L17 7"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="transition-all"
                                  d="M7 7H17V17"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </a>
                        </h4>
                      </div>
                    </div>
                    {/* service Item End */}

                    {/* service Item - Illustration & Visual Art */}
                    <div className="col-12 col-sm-6 col-md-4">
                      <div className="service-card" data-aos="fade-up" data-aos-delay={1500}>
                        {/* Icon */}
                        <div className="d-flex flex-wrap align-items-center justify-content-center service-icon">
                          <img
                            src="/images/icon/illustration-&-visual-art-icon.svg"
                            alt="service icon"
                            width={30}
                            height={30}
                            className="img-fluid"
                          />
                        </div>
                        {/* Icon End */}
                        <h4>
                          <a
                            href="/projects"
                            className="d-flex flex-wrap align-items-end justify-content-between fw-bold text-xl font-Syne service-card-link"
                          >
                            Illustration <br /> Visual Art
                            <span className="animate-arrow-up">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="transition-all"
                                  d="M7 17L17 7"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="transition-all"
                                  d="M7 7H17V17"
                                  stroke="currentColor"
                                  strokeOpacity="0.6"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </a>
                        </h4>
                      </div>
                    </div>
                    {/* service Item End */}
                  </div>


                </div>
                <div
                  className="col-12 col-xl-4"
                  data-aos="zoom-in"
                  data-aos-delay={1000}
                >
                  <div className="bg-dark d-flex flex-wrap flex-column justify-content-between service-contact-card">
                    <div className="d-flex flex-wrap justify-content-end">
                      <a href="/contact" className="animate-arrow-up">
                        <svg
                          width={80}
                          height={80}
                          viewBox="0 0 80 80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.3333 56.6666L56.6667 23.3333"
                            stroke="#FFB646"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M23.3333 23.3333H56.6667V56.6666"
                            stroke="#FFB646"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                    <div className="d-flex flex-column flex-wrap gap-y-2">
                      <span className="text-warning text-lg fw-normal lh-1">
                        SAY HELLO!
                      </span>
                      <h4 className="text-white text-2xl fw-bold font-Syne lh-1 say-hello-email">
                        sajjatmujawar16<br />@gmail.com
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Service end */}

          {/* About Us Sectin Start */}
          <section
            className="about-section pb-120"
            data-aos="zoom-out"
            data-aos-delay={800}
          >
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="position-relative">
                    <img src="/images/about/about1.png" alt="" />
                    <div className="d-flex flex-wrap flex-column position-absolute years-of-experience">
                      <span className="years-experience-of-number text-dark fw-bold font-Syne leading-none d-inline-block position-relative">
                        5+
                      </span>
                      <span className="strock-text">
                        Years of <br /> experience
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 about-grid-space-right">
                  <div className="fw-bold font-Syne leading-none d-flex flex-wrap flex-column gap-y-2">
                    <span className="text-warning text-xl">Hello I’m</span>
                    <h3 className="section-title circle-shape text-dark position-relative">
                      Sajjat Mujawar, Creative Designer
                    </h3>
                    <h4 className="based-in-german-title text-dark">Based in Mumbai</h4>
                    <p className="paragraph mb-5">
                      As a <strong>Creative Designer</strong> is a multidisciplinary visual professional who combines artistic talent with strategic thinking to create compelling and effective designs. My specialties span across various fields depending on the industry, but here are the <strong>core specialties and areas of expertise</strong> that typically define My Self:
                    </p>
                    <ul className="award-lists d-flex flex-wrap p-0 list-unstyled">
                      <li className="award-lists-item">
                        <span className="text-dark text-32 fw-bold font-Syne position-relative">
                          08
                        </span>
                        <p className="paragraph">Award winner</p>
                      </li>
                      <li className="award-lists-item">
                        <span className="text-dark text-32 fw-bold font-Syne position-relative">
                          1.2k
                        </span>
                        <p className="paragraph">Worldwide client</p>
                      </li>
                      <li className="award-lists-item">
                        <span className="text-dark text-32 fw-bold font-Syne position-relative">
                          3.5k
                        </span>
                        <p className="paragraph">Job done successfully</p>
                      </li>
                    </ul>
                    <div className="d-flex flex-wrap">
                      <a
                        href="/contact"
                        className="d-flex flex-wrap align-items-center btn-primary"
                      >
                        Download my resume
                        <span className="d-inline-block animate-arrow-up">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 17L17 7"
                              stroke="currentColor"
                              strokeOpacity="0.9"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 7H17V17"
                              stroke="currentColor"
                              strokeOpacity="0.9"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* About Us Sectin End */}

          {/* tabs start */}
          <section className="featured-properties">
            <div className="container">
              <div className="row">
                <div
                  className="col-12 col-lg-5 col-2xl-4"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  <div className="fw-bold font-Syne leading-none d-flex flex-wrap flex-column gap-y-2 mb-4">
                    <span className="text-warning text-xl">Resume</span>
                    <h3 className="section-title circle-shape text-dark position-relative">
                      All over my details find here...
                    </h3>
                  </div>
                  <div className="tabs nav nav-pills flex-wrap flex-lg-column">
                    <button
                      data-bs-toggle="pill"
                      data-bs-target="#about_me_tab"
                      className="tab-btn justify-content-between align-items-center d-inline-flex active"
                    >
                      About me
                      <span className="inline-block animate-arrow-up">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 7H17V17"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      className="tab-btn tab-btn justify-content-between align-items-center d-inline-flex"
                      data-bs-toggle="pill"
                      data-bs-target="#experience_tab"
                    >
                      Experience
                      <span className="inline-block animate-arrow-up">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 7H17V17"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      className="tab-btn tab-btn justify-content-between align-items-center d-inline-flex"
                      data-bs-toggle="pill"
                      data-bs-target="#education_tab"
                    >
                      Education
                      <span className="inline-block animate-arrow-up">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 7H17V17"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      className="tab-btn tab-btn justify-content-between align-items-center d-inline-flex"
                      data-bs-toggle="pill"
                      data-bs-target="#skills_tab"
                    >
                      Skills
                      <span className="inline-block animate-arrow-up">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 7H17V17"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      className="tab-btn tab-btn justify-content-between align-items-center d-inline-flex"
                      data-bs-toggle="pill"
                      data-bs-target="#awards_tab"
                    >
                      Awards
                      <span className="inline-block animate-arrow-up">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 7H17V17"
                            stroke="currentColor"
                            strokeOpacity="0.9"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div
                  className="col-12 col-lg-7 col-2xl-8 featured-properties-space-left"
                  data-aos="fade-up"
                  data-aos-delay={600}
                >
                  <div className="tab-content">
                    <div
                      id="about_me_tab"
                      className="tab-pane fade show active position-relative"
                    >
                      <div className="tab-contents">
                        <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">
                          Based in Mumbai
                        </h4>
                        <p className="paragraph mb-7">
                          Sajjat Mujawar,{" "}
                          <span className="text-dark">Creative Designer</span>, based in
                          Mumbai. A multidisciplinary visual professional who blends artistic
                          vision with strategic thinking to craft meaningful and effective
                          designs across diverse platforms.
                        </p>
                        <p className="paragraph mb-14">
                          My work focuses on creating experiences that connect brands with
                          their audiences through impactful visuals, thoughtful storytelling,
                          and a deep understanding of design principles.
                        </p>
                        <ul className="flex-column gap-3 d-inline-flex list-unstyled p-0">
                          <li className="gap-10 d-inline-flex align-items-center">
                            <span className="w-110px text-black-text-800 text-lg fw-normal leading-none">
                              Name
                            </span>
                            <span className="text-dark text-2xl fw-bold font-Syne leading-8">
                              Sajjat Mujawar
                            </span>
                          </li>
                          <li className="gap-10 d-inline-flex align-items-center">
                            <span className="w-110px text-black-text-800 text-lg fw-normal leading-none">
                              Nationality
                            </span>
                            <span className="text-dark text-2xl fw-bold font-Syne leading-8">
                              Indian
                            </span>
                          </li>
                          <li className="gap-10 d-inline-flex align-items-center">
                            <span className="w-110px text-black-text-800 text-lg fw-normal leading-none">
                              Phone
                            </span>
                            <span className="text-dark text-2xl fw-bold font-Syne leading-8">
                              +91 90294 03595
                            </span>
                          </li>
                          <li className="gap-10 d-inline-flex align-items-center">
                            <span className="w-110px text-black-text-800 text-lg fw-normal leading-none">
                              Email
                            </span>
                            <span className="text-dark text-2xl fw-bold font-Syne leading-8">
                              sajjatmujawar16@gmail.com
                            </span>
                          </li>
                          <li className="gap-10 d-inline-flex align-items-center">
                            <span className="w-110px text-black-text-800 text-lg fw-normal leading-none">
                              Experience
                            </span>
                            <span className="text-dark text-2xl fw-bold font-Syne leading-8">
                              5+ years
                            </span>
                          </li>
                          <li className="gap-10 d-inline-flex align-items-center">
                            <span className="w-110px text-black-text-800 text-lg fw-normal leading-none">
                              Freelance
                            </span>
                            <span className="text-dark text-2xl fw-bold font-Syne leading-8">
                              Available
                            </span>
                          </li>
                          <li className="gap-10 d-inline-flex align-items-center">
                            <span className="w-110px text-black-text-800 text-lg fw-normal leading-none">
                              Skype
                            </span>
                            <span className="text-dark text-2xl fw-bold font-Syne leading-8">
                              sajjat.mujawar
                            </span>
                          </li>
                          <li className="gap-10 d-inline-flex align-items-center">
                            <span className="w-110px text-black-text-800 text-lg fw-normal leading-none">
                              Language
                            </span>
                            <span className="text-dark text-2xl fw-bold font-Syne leading-8">
                              English, Hindi, Marathi
                            </span>
                          </li>
                        </ul>
                      </div>

                    </div>
                    <div
                      id="experience_tab"
                      className="tab-pane fade position-relative"
                    >
                      <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">
                        Experience
                      </h4>
                      <div className="tab-contents tab-contents-experience gap-x-4 gap-y-5">
                        <div className="experience-tab-item d-flex flex-wrap flex-column gap-8 justify-content-between">
                          <span className="text-sm fw-normal font-Inter leading-tight text-black-text-800">
                            06/2020 – Present
                          </span>
                          <div>
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Axtra
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-2xl text-dark">
                              Lead Digital Designer
                            </h4>
                          </div>
                        </div>

                        <div className="experience-tab-item d-flex flex-wrap flex-column gap-8 justify-content-between">
                          <span className="text-sm fw-normal font-Inter leading-tight text-black-text-800">
                            01/2019 – 05/2020
                          </span>
                          <div>
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Studio X
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-2xl text-dark">
                              Senior UI Designer
                            </h4>
                          </div>
                        </div>

                        <div className="experience-tab-item d-flex flex-wrap flex-column gap-8 justify-content-between">
                          <span className="text-sm fw-normal font-Inter leading-tight text-black-text-800">
                            03/2017 – 12/2018
                          </span>
                          <div>
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Axtra
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-2xl text-dark">
                              Creative Designer
                            </h4>
                          </div>
                        </div>

                        <div className="experience-tab-item d-flex flex-wrap flex-column gap-8 justify-content-between">
                          <span className="text-sm fw-normal font-Inter leading-tight text-black-text-800">
                            07/2015 – 02/2017
                          </span>
                          <div>
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              PixelWorks
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-2xl text-dark">
                              Junior Designer
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="education_tab" className="tab-pane fade">
                      <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">
                        Education
                      </h4>
                      <div className="education-tab-contents">
                        <div className="education-tab-item d-flex flex-wrap">
                          <span className="text-sm fw-normal font-Inter leading-tight text-black-text-800">
                            003/2008 – 07/2011
                          </span>
                          <div className="flex-1">
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Axtra
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-2xl text-dark">
                              BA Business Management
                            </h4>
                          </div>
                        </div>
                        <div className="education-tab-item d-flex flex-wrap">
                          <span className="text-sm fw-normal font-Inter leading-tight text-black-text-800">
                            03/2008 – 07/2011
                          </span>
                          <div className="flex-1">
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Axtra
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-2xl text-dark">
                              BA Business Management
                            </h4>
                          </div>
                        </div>
                        <div className="education-tab-item d-flex flex-wrap">
                          <span className="text-sm fw-normal font-Inter leading-tight text-black-text-800">
                            03/2008 – 07/2011
                          </span>
                          <div className="flex-1">
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Axtra
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-2xl text-dark">
                              BA Business Management
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="skills_tab" className="tab-pane fade">
                      <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">
                        Skills
                      </h4>
                      <div className="skills-tab-contents">
                        <div className="d-flex flex-wrap gap-4 align-items-start skills-tab-item">
                          <img
                            className="items-start"
                            src="/images/skills/vs-code.png"
                            alt="icons"
                          />
                          <div className="flex flex-wrap gap-1 flex-1 flex-col">
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              React JS
                            </h4>
                            <p className="text-sm fw-normal font-Inter leading-none text-dark">
                              (90%)
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-4 align-items-start skills-tab-item">
                          <img
                            className="items-start"
                            src="/images/skills/figma.png"
                            alt="icons"
                          />
                          <div className="flex flex-wrap gap-1 flex-1 flex-col">
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              Figma
                            </h4>
                            <p className="text-sm fw-normal font-Inter leading-none text-dark">
                              (70%)
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-4 align-items-start skills-tab-item">
                          <img
                            className="items-start"
                            src="/images/skills/framer.png"
                            alt="icons"
                          />
                          <div className="flex flex-wrap gap-1 flex-1 flex-col">
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              Framer
                            </h4>
                            <p className="text-sm fw-normal font-Inter leading-none text-dark">
                              (80%)
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-4 align-items-start skills-tab-item">
                          <img
                            className="items-start"
                            src="/images/skills/framer.png"
                            alt="icons"
                          />
                          <div className="flex flex-wrap gap-1 flex-1 flex-col">
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              Framer
                            </h4>
                            <p className="text-sm fw-normal font-Inter leading-none text-dark">
                              (80%)
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-4 align-items-start skills-tab-item">
                          <img
                            className="items-start"
                            src="/images/skills/framer.png"
                            alt="icons"
                          />
                          <div className="flex flex-wrap gap-1 flex-1 flex-col">
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              Framer
                            </h4>
                            <p className="text-sm fw-normal font-Inter leading-none text-dark">
                              (80%)
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-4 align-items-start skills-tab-item">
                          <img
                            className="items-start"
                            src="/images/skills/framer.png"
                            alt="icons"
                          />
                          <div className="flex flex-wrap gap-1 flex-1 flex-col">
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              Framer
                            </h4>
                            <p className="text-sm fw-normal font-Inter leading-none text-dark">
                              (80%)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="awards_tab" className="tab-pane fade">
                      <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">
                        Awards
                      </h4>
                      <div className="awards-tab-contents">
                        <div className="d-flex flex-wrap flex-column awards-tab-item">
                          <div className="d-flex align-items-start justify-content-between">
                            <img src="/images/awards/w-dot.png" alt="icons" />
                            <span className="fw-normal text-sm font-Inter text-black-text-800">
                              2018
                            </span>
                          </div>
                          <div>
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Winner
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              01X Developer Award
                            </h4>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap flex-column awards-tab-item">
                          <div className="d-flex align-items-start justify-content-between">
                            <img src="/images/awards/webby.png" alt="icons" />
                            <span className="fw-normal text-sm font-Inter text-black-text-800">
                              2018
                            </span>
                          </div>
                          <div>
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Winner
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              01X Developer Award
                            </h4>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap flex-column awards-tab-item">
                          <div className="d-flex align-items-start justify-content-between">
                            <img src="/images/awards/fwa.png" alt="icons" />
                            <span className="fw-normal text-sm font-Inter text-black-text-800">
                              2018
                            </span>
                          </div>
                          <div>
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Winner
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              01X Developer Award
                            </h4>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap flex-column awards-tab-item">
                          <div className="d-flex align-items-start justify-content-between">
                            <img src="/images/awards/wordpress.png" alt="icons" />
                            <span className="fw-normal text-sm font-Inter text-black-text-800">
                              2018
                            </span>
                          </div>
                          <div>
                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">
                              Winner
                            </p>
                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">
                              01X Developer Award
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="d-flex justify-content-end mt-14 -mr-3">
                    <svg
                      width={54}
                      height={54}
                      viewBox="0 0 54 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.5625 0C27.5625 23.1273 9.1875 28.5455 0 27.8182C16.875 31.0909 25.3125 34.3636 27 54C27 40.3636 34.875 30.5455 54 27.8182C46.125 28.3636 29.8125 24 27.5625 0Z"
                        fill="#FFB646"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* tabs end */}

          {/* Portfolio Section Start */}
          <section className="bg-secondary py-120">
            <div className="container">
              <div className="row">
                <div className="col-12" data-aos="fade-up" data-aos-delay={400}>
                  <div className="fw-bold font-Syne text-center leading-none d-flex flex-wrap flex-column gap-y-2 mb-10">
                    <span className="text-warning text-xl">Portfolio</span>
                    <h3 className="section-title text-dark">
                      My recent{" "}
                      <span className="position-relative circle-shape portfolio-shape">
                        w
                      </span>
                      ork
                    </h3>
                  </div>
                </div>
                <div
                  className="col-12 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={600}
                >
                  <div className="rounded-20 overflow-hidden mb-6">
                    <img src="/images/projects/greekgod-project.jpg" alt="project1" />
                  </div>
                  <div className="d-flex flex-wrap flex-column gap-3">
                    <div className="d-flex flex-wrap gap-2">
                      <a
                        className="text-xs fw-medium font-Inter leading-none px-4 rounded-40 portfolio-tag-link"
                        href="/project"
                      >
                        APP
                      </a>
                      <a
                        className="text-xs fw-medium font-Inter leading-none px-4 rounded-40 portfolio-tag-link"
                        href="/projects"
                      >
                        DEVELOPMENT
                      </a>
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between text-dark portfolio-title">
                      <h4 className="fw-bold font-Syne text-center leading-10 portfolio-link">
                        <a className="transition-all" href="/project-details">
                          Basinik Finance App
                        </a>
                      </h4>
                      <a className="animate-arrow-up" href="/project-details">
                        <svg
                          width={40}
                          height={40}
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={800}
                >
                  <div className="rounded-20 overflow-hidden mb-6">
                    <img src="/images/projects/saraswathy-project.jpg" alt="project1" />
                  </div>
                  <div className="d-flex flex-wrap flex-column gap-3">
                    <div className="d-flex flex-wrap gap-2">
                      <a
                        className="text-xs fw-medium font-Inter leading-none px-4 rounded-40 portfolio-tag-link"
                        href="/projects"
                      >
                        APP
                      </a>
                      <a
                        className="text-xs fw-medium font-Inter leading-none px-4 rounded-40 portfolio-tag-link"
                        href="/projects"
                      >
                        DEVELOPMENT
                      </a>
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between text-dark portfolio-title">
                      <h4 className="fw-bold font-Syne text-center leading-10 portfolio-link">
                        <a className="transition-all" href="/project-details">
                          Oxilex Dashboard design
                        </a>
                      </h4>
                      <a className="animate-arrow-up" href="/project-details">
                        <svg
                          width={40}
                          height={40}
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-12" data-aos="fade-up" data-aos-delay={600}>
                <div className="d-flex">
                  <a
                    href="/projects"
                    className="d-flex align-items-center justify-content-center flex-wrap btn-primary flex-grow-1"
                  >
                    View All Project
                    <span className="inline-block ml-3 animate-arrow-up">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 17L17 7"
                          stroke="currentColor"
                          strokeOpacity="0.9"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 7H17V17"
                          stroke="currentColor"
                          strokeOpacity="0.9"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* Portfolio Section End */}

          {/* Testimonial section Start */}
          <section
            className="bg-white py-120 testimonial"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            <div className="testimonial-space-left px-8">
              <div className="d-flex flex-column testimonial-gap flex-xl-row">
                <div className="fw-bold font-Syne leading-none d-flex flex-wrap flex-column gap-y-2 mb-10 testimonial-title-section">
                  <span className="text-warning text-xl">Testimonial</span>
                  <h3 className="d-inline-block section-title text-dark">
                    <span className="position-relative circle-shape testimonial-shape">
                      Cl
                    </span>
                    ient
                    <br className="hidden d-xl-inline-block" /> feedback
                  </h3>
                </div>
                <div className="swiper w-100">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <span className="d-inline-block qotation-icon">
                        <svg
                          width={48}
                          height={48}
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z"
                            fill="#080808"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </span>
                      <p className="testimonial-texts fw-bold font-Syne">
                        “Energistically build alternative scenarios via cross-unit
                        applications. Credibly exploit one-to-one strategic theme areas
                        and clicks-and-mortar services”
                      </p>
                      <h4 className="d-flex flex-wrap align-items-center gap-4 text-dark testimonial-qotation-name font-Syne">
                        <span>
                          <svg
                            width={48}
                            height={2}
                            viewBox="0 0 48 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 1H48" stroke="#080808" strokeOpacity="0.4" />
                          </svg>
                        </span>{" "}
                        Jhon Smith
                      </h4>
                    </div>
                    <div className="swiper-slide">
                      <span className="d-inline-block qotation-icon">
                        <svg
                          width={48}
                          height={48}
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z"
                            fill="#080808"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </span>
                      <p className="testimonial-texts fw-bold font-Syne">
                        “Energistically build “Unleash energistically build alternative
                        scenarios via cross-unit build efficient initiatives for
                        distinctive vortals. Synergistically strategize via adaptiv“
                      </p>
                      <h4 className="d-flex flex-wrap align-items-center gap-4 text-dark testimonial-qotation-name font-Syne">
                        <span>
                          <svg
                            width={48}
                            height={2}
                            viewBox="0 0 48 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 1H48" stroke="#080808" strokeOpacity="0.4" />
                          </svg>
                        </span>{" "}
                        Jhon Smith
                      </h4>
                    </div>
                    <div className="swiper-slide">
                      <span className="d-inline-block qotation-icon">
                        <svg
                          width={48}
                          height={48}
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z"
                            fill="#080808"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </span>
                      <p className="testimonial-texts fw-bold font-Syne">
                        “Energistically build “Aliquam vehicula nunc facilisis tincidunt
                        feugiat. Pellentesque sed viverra nisi. Fusce et laoreet augue.
                        Quisque pretium, ligula lectus semper urna. Aliquam vehicula.”
                      </p>
                      <h4 className="d-flex flex-wrap align-items-center gap-4 text-dark testimonial-qotation-name font-Syne">
                        <span>
                          <svg
                            width={48}
                            height={2}
                            viewBox="0 0 48 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 1H48" stroke="#080808" strokeOpacity="0.4" />
                          </svg>
                        </span>{" "}
                        Jhon Smith
                      </h4>
                    </div>
                    <div className="swiper-slide">
                      <span className="d-inline-block qotation-icon">
                        <svg
                          width={48}
                          height={48}
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z"
                            fill="#080808"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </span>
                      <p className="testimonial-texts fw-bold font-Syne">
                        “Energistically build “Aliquam vehicula nunc facilisis tincidunt
                        feugiat. Pellentesque sed viverra nisi. Fusce et laoreet augue.
                        Quisque pretium, ligula lectus semper urna. Aliquam vehicula.”
                      </p>
                      <h4 className="d-flex flex-wrap align-items-center gap-4 text-dark testimonial-qotation-name font-Syne">
                        <span>
                          <svg
                            width={48}
                            height={2}
                            viewBox="0 0 48 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 1H48" stroke="#080808" strokeOpacity="0.4" />
                          </svg>
                        </span>{" "}
                        Jhon Smith
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Testimonial section End */}

          {/* Brand Section Start*/}
          <div
            className="bg-white brandCarousel"
            data-aos="flip-down"
            data-aos-delay={600}
          >
            <div className="container">
              <div className="swiper brand-carousel">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img
                      className="mx-auto d-block"
                      src="/images/brand/logo1.svg"
                      alt=" brandlogo"
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      className="mx-auto d-block"
                      src="/images/brand/logo2.svg"
                      alt=" brandlogo"
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      className="mx-auto d-block"
                      src="/images/brand/logo3.svg"
                      alt=" brandlogo"
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      className="mx-auto d-block"
                      src="/images/brand/logo4.svg"
                      alt=" brandlogo"
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      className="mx-auto d-block"
                      src="/images/brand/logo5.svg"
                      alt=" brandlogo"
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      className="mx-auto d-block"
                      src="/images/brand/logo6.svg"
                      alt=" brandlogo"
                    />
                  </div>
                  <div className="swiper-slide">
                    <img
                      className="mx-auto d-block"
                      src="/images/brand/logo3.svg"
                      alt=" brandlogo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Brand Section End*/}

          {/* Blog Section Start */}
          <section className="bg-white py-120">
            <div className="container">
              <div className="row">
                <div className="col-12" data-aos="fade-up" data-aos-delay={500}>
                  <div className="fw-bold font-Syne text-center leading-none flex flex-wrap flex-column gap-y-2 mb-10">
                    <span className="text-warning text-xl">Blog</span>
                    <h3 className="section-title text-dark">
                      My blog
                      <span className="position-relative circle-shape blog-shape">
                        po
                      </span>
                      st
                    </h3>
                  </div>
                </div>
              </div>
              <div className="blog-grid">
                {/* Blog Item Start */}
                <div className="blog-item" data-aos="fade-up" data-aos-delay={300}>
                  <div className="rounded-20 overflow-hidden mb-6">
                    <img
                      className="w-100"
                      src="/images/blog/seo-2025-blog.png"
                      alt="blog image"
                    />
                  </div>
                  <div className="d-flex flex-wrap flex-column gap-3">
                    <ul className="d-flex flex-wrap text-sm fw-normal font-Inter leading-tight p-0 m-0 list-unstyled">
                      <li className="blog-meta-item">
                        <a href="#">UI Design</a>
                      </li>
                      <li className="blog-meta-item">
                        <a href="#">03 May 2019</a>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-end text-dark blog-title-section">
                      <h4 className="fw-bold font-Syne transition-all leading-8 blog-title">
                        <a href="/blog-details">
                          Right-lo-left behind development in mobile web design
                        </a>
                      </h4>
                      <a href="/blog-details" className="animate-arrow-up">
                        <svg
                          width={40}
                          height={40}
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Blog Item End */}
                {/* Blog Item Start */}
                <div className="blog-item" data-aos="fade-up" data-aos-delay={500}>
                  <div className="rounded-20 overflow-hidden mb-6">
                    <img
                      className="w-100"
                      src="/images/blog/blog2.png"
                      alt="blog image"
                    />
                  </div>
                  <div className="d-flex flex-wrap flex-column gap-3">
                    <ul className="d-flex flex-wrap text-sm fw-normal font-Inter leading-tight p-0 list-unstyled m-0">
                      <li className="blog-meta-item">
                        <a href="#">UI Design</a>
                      </li>
                      <li className="blog-meta-item">
                        <a href="#">03 May 2019</a>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-end text-dark blog-title-section">
                      <h4 className="fw-bold font-Syne transition-all leading-8 blog-title">
                        <a href="/blog-details">
                          Connect craft: Reading the smart experience
                        </a>
                      </h4>
                      <a href="/blog-details" className="animate-arrow-up">
                        <svg
                          width={40}
                          height={40}
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Blog Item End */}
                {/* Blog Item Start */}
                <div className="blog-item" data-aos="fade-up" data-aos-delay={700}>
                  <div className="rounded-20 overflow-hidden mb-6">
                    <img
                      className="w-100"
                      src="/images/blog/blog3.png"
                      alt="blog image"
                    />
                  </div>
                  <div className="d-flex flex-wrap flex-column gap-3">
                    <ul className="d-flex flex-wrap text-sm fw-normal font-Inter leading-tight p-0 list-unstyled m-0">
                      <li className="blog-meta-item">
                        <a href="#">UI Design</a>
                      </li>
                      <li className="blog-meta-item">
                        <a href="#">03 May 2019</a>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-end text-dark blog-title-section">
                      <h4 className="fw-bold font-Syne transition-all leading-8 blog-title">
                        <a href="/blog-details">
                          Ecoglow: Sustainable skincare a brighter tomorrow
                        </a>
                      </h4>
                      <a href="/blog-details" className="animate-arrow-up">
                        <svg
                          width={40}
                          height={40}
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Blog Item End */}
                {/* Blog Item Start */}
                <div className="blog-item" data-aos="fade-up" data-aos-delay={900}>
                  <div className="rounded-20 overflow-hidden mb-6">
                    <img
                      className="w-100"
                      src="/images/blog/blog4.png"
                      alt="blog image"
                    />
                  </div>
                  <div className="d-flex flex-wrap flex-column gap-3">
                    <ul className="d-flex flex-wrap text-sm fw-normal font-Inter leading-tight p-0 list-unstyled m-0">
                      <li className="blog-meta-item">
                        <a href="#">UI Design</a>
                      </li>
                      <li className="blog-meta-item">
                        <a href="#">03 May 2019</a>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-end text-dark blog-title-section">
                      <h4 className="fw-bold font-Syne transition-all leading-8 blog-title">
                        <a href="/blog-details">
                          Right-lo-left behind development in mobile web design
                        </a>
                      </h4>
                      <a href="/blog-details" className="animate-arrow-up">
                        <svg
                          width={40}
                          height={40}
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                {/* Blog Item End */}
              </div>
            </div>
          </section>
          {/* Blog Section End */}

          {/* Pricing Section Start */}
          <section className="bg-white pb-120">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-16">
                    <div
                      className="fw-bold font-Syne leading-none d-flex flex-wrap flex-column gap-y-2 pricing-title-section"
                      data-aos="fade-up"
                      data-aos-delay={400}
                    >
                      <span className="text-warning text-xl">Pricing</span>
                      <h3 className="section-title text-dark">
                        Stay chill and pick your{" "}
                        <span className="position-relative circle-shape priceing-shape">
                          pl
                        </span>
                        an
                      </h3>
                    </div>
                    <div
                      className="d-flex contact-for-custom-project"
                      data-aos="fade-up"
                      data-aos-delay={700}
                    >
                      <a
                        href="/contact"
                        className="d-flex align-items-center flex-wrap btn-primary"
                      >
                        Contact for Custom Project
                        <span className="d-inline-block ml-3 animate-arrow-up">
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 17L17 7"
                              stroke="currentColor"
                              strokeOpacity="0.9"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 7H17V17"
                              stroke="currentColor"
                              strokeOpacity="0.9"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prcing-grid">
                {/* Pricing Item Start */}
                <div
                  className="transition-all d-flex flex-wrap flex-column pricing-item"
                  data-aos="fade-up"
                  data-aos-delay={500}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-lg fw-normal font-sans leading-none pricing-plan">
                      Basic
                    </span>
                    <span className="fw-bold text-xl font-Syne pricing-rate">
                      $48/h
                    </span>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between align-items-end">
                    <div>
                      <h4 className="fw-bold font-Syne leading-10 text-32 text-dark mb-1">
                        20 hrs
                      </h4>
                      <p className="text-lg fw-normal font-sans leading-none pricing-plan">
                        10 hours per week
                      </p>
                    </div>
                    <a href="#" className="animate-arrow-up">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="transition-all"
                          d="M7 17L17 7"
                          stroke="currentColor"
                          strokeOpacity="0.6"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="transition-all"
                          d="M7 7H17V17"
                          stroke="currentColor"
                          strokeOpacity="0.6"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                {/* Pricing Item End */}
                {/* Pricing Item Start */}
                <div
                  className="transition-all d-flex flex-wrap flex-column pricing-item"
                  data-aos="fade-up"
                  data-aos-delay={700}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-lg fw-normal font-sans leading-none pricing-plan">
                      Premium
                    </span>
                    <span className="fw-bold text-xl font-Syne pricing-rate">
                      $60/h
                    </span>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between align-items-end">
                    <div>
                      <h4 className="fw-bold font-Syne leading-10 text-32 text-dark mb-1">
                        30 hrs
                      </h4>
                      <p className="text-lg fw-normal font-sans leading-none pricing-plan">
                        15 hours per week
                      </p>
                    </div>
                    <a href="#" className="animate-arrow-up">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="transition-all"
                          d="M7 17L17 7"
                          stroke="currentColor"
                          strokeOpacity="0.6"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="transition-all"
                          d="M7 7H17V17"
                          stroke="currentColor"
                          strokeOpacity="0.6"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                {/* Pricing Item End */}
                {/* Pricing Item Start */}
                <div
                  className="transition-all d-flex flex-wrap flex-column pricing-item"
                  data-aos="fade-up"
                  data-aos-delay={900}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-lg fw-normal font-sans leading-none pricing-plan">
                      Platinum
                    </span>
                    <span className="fw-bold text-xl font-Syne pricing-rate">
                      $60/h
                    </span>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between align-items-end">
                    <div>
                      <h4 className="fw-bold font-Syne leading-10 text-32 text-dark mb-1">
                        20 hrs
                      </h4>
                      <p className="text-lg fw-normal font-sans leading-none pricing-plan">
                        80 hours per week
                      </p>
                    </div>
                    <a href="#" className="animate-arrow-up">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="transition-all"
                          d="M7 17L17 7"
                          stroke="currentColor"
                          strokeOpacity="0.6"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="transition-all"
                          d="M7 7H17V17"
                          stroke="currentColor"
                          strokeOpacity="0.6"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                {/* Pricing Item End */}
              </div>
            </div>
          </section>
          {/* Pricing Section End */}

          {/* Footer Start */}
          <Footer />

        </>
      </div>

    </div>

  );
}
