"use client";
import Link from 'next/link';
// Import React's SyntheticEvent and MouseEvent types for proper typing
import React, { MouseEvent } from 'react';

export default function Footer() {

    // FIX: Explicitly type 'e' as a React MouseEvent for an HTMLAnchorElement
    const handleScrollUp = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        // Footer Start
        <footer className="footer bg-dark">
            <div className="container">
                <div
                    className="overflow-x-hidden"
                    data-aos="flip-down"
                    data-aos-delay={500}
                >
                    <div className="footer-grid">
                        <div className="pt-12">
                            <h3 className="section-title text-white mb-0">
                                <span className="position-relative circle-shape footer-shape">
                                    Le
                                </span>
                                t’s work together
                            </h3>
                            <div className="d-flex flex-wrap align-items-center mt-10">
                                <span className="text-xl fw-bold font-Syne text-white">
                                    Based in Mumbai |
                                </span>
                                <div className="footer-social">
                                    <ul className="d-flex flex-wrap gap-x-4 align-items-center list-unstyled p-0 footer-social-links">
                                        <li>
                                            <a href="#" className="text-white footer-social-link">
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
                                            <a href="#" className="text-white footer-social-link">
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
                                            <a href="#" className="text-white footer-social-link">
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
                        <div className="d-flex flex-column justify-content-between service-contact-card-footer">
                            <h3 className="text-xl fw-bold font-Syne text-white">
                                Looking for a hectic designer?
                            </h3>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="text-2xl fw-bold font-Syne leading-none text-warning">
                                    sajjatmujawar16<br />@gmail.com
                                </p>
                                <a href="#" className="text-white animate-arrow-up">
                                    <svg
                                        width={40}
                                        height={40}
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.6667 28.3334L28.3334 11.6667"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.6667 11.6667H28.3334V28.3334"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="d-flex flex-column justify-content-between service-contact-card-footer">
                            <h3 className="text-xl fw-bold font-Syne text-white">
                                Want a more in-depth look at my history?
                            </h3>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="text-2xl fw-bold font-Syne leading-none text-warning">
                                    <a href="tel:9029403595">+91 90294 03595</a>
                                </p>

                                <a href="#" className="text-white animate-arrow-up">
                                    <svg
                                        width={40}
                                        height={40}
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.6667 28.3334L28.3334 11.6667"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.6667 11.6667H28.3334V28.3334"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="py-72">
                                <svg
                                    className="w-100"
                                    width={1281}
                                    height={77}
                                    viewBox="0 0 1281 77"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    role="img"
                                    aria-label="SAJJAT MUJAWAR"
                                >
                                    <rect width="1281" height="77" fill="transparent" />
                                    <text
                                        x="0"
                                        y="58"
                                        fill="#FFE9D9"
                                        fontFamily="'Syne',sans-serif"
                                        fontSize="80"
                                        fontWeight="900"
                                        letterSpacing="2"
                                        style={{ whiteSpace: "pre" }}
                                    >
                                        SAJJAT MUJAWAR
                                    </text>
                                </svg>

                            </div>
                        </div>
                    </div>
                    <div className="pt-6 copyright">
                        <div className="row">
                            <div className="col-12 col-sm-8 order-last order-sm-first">
                                <p className="text-white text-lg fw-normal font-sans leading-7">
                                    ©2025 Sajjat Mujawar, All Rights Reserved
                                </p>
                            </div>
                            <div className="col-12 col-sm-4 order-first order-sm-last">
                                <div className="d-flex justify-content-end mb-2 mb-sm-0">
                                    <a
                                        id="scrollUp"
                                        className="d-flex flex-wrap align-items-center gap-2"
                                        href="#"
                                        aria-label="scroll up"
                                    >
                                        <span className="text-white text-lg fw-normal font-sans leading-7 transition-all">
                                            Back to Top
                                        </span>
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 19V5"
                                                stroke="#FFB646"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M19 12L12 5L5 12"
                                                stroke="#FFB646"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
}