// import { useEffect, useRef } from 'react';
"use client";

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- LOCAL TYPE DEFINITION ---

/**
 * Defines the minimal interface for a Swiper instance object,
 * needed locally to type the React useRef.
 */
interface SwiperInstance {
    destroy: (deleteInstance: boolean, cleanupStyles: boolean) => void;
}

// NOTE: The SwiperConstructor and declare global block must be defined 
// in a separate 'global.d.ts' file at the project root to avoid TypeScript errors.

// --- COMPONENT START ---

export default function About() {
    // Initialization of AOS with useEffect
    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            offset: 50,
        });
        AOS.refresh();
    }, []);

    // Type-safe ref: The ref holds a SwiperInstance or null.
    const testimonialSwiperRef = useRef<SwiperInstance | null>(null);

    // Initialize testimonial Swiper when the vendor script is available.
    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 20; // poll up to ~2 seconds (20 * 100ms)
        const interval = 100;
        let timer: number | null = null;

        function initSwiper(): boolean {
            // TypeScript finds window.Swiper type from global.d.ts.
            if (typeof window.Swiper === 'undefined') return false;

            const Swiper = window.Swiper;

            try {
                if (testimonialSwiperRef.current) return true; // already initialized

                // Use the correctly typed Swiper constructor
                testimonialSwiperRef.current = new Swiper('.testimonial .swiper', {
                    pagination: false,
                    breakpoints: {
                        576: { slidesPerView: 2, spaceBetween: 45 },
                        992: { slidesPerView: 3, spaceBetween: 30 },
                        1200: { slidesPerView: 3, spaceBetween: 45 },
                    },
                });
                return true;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn('initSwiper error', e);
                return false;
            }
        }

        // Try immediate init first
        if (!initSwiper()) {
            timer = window.setInterval(() => {
                attempts += 1;
                if (initSwiper() || attempts >= maxAttempts) {
                    if (timer) {
                        clearInterval(timer);
                        timer = null;
                    }
                }
            }, interval) as unknown as number;
        }

        return () => {
            if (timer) clearInterval(timer);
            // destroy swiper instance on unmount (type-safe check)
            try {
                if (testimonialSwiperRef.current) {
                    testimonialSwiperRef.current.destroy(true, true);
                    testimonialSwiperRef.current = null;
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn('destroy swiper error', e);
            }
        };
    }, []);

    // Type-safe ref for brand carousel
    const brandSwiperRef = useRef<SwiperInstance | null>(null);

    // Initialize brand carousel Swiper (same polling approach)
    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 20;
        const interval = 100;
        let timer: number | null = null;

        function initBrand(): boolean {
            // Type-safe check for window.Swiper
            if (typeof window.Swiper === 'undefined') return false;

            const Swiper = window.Swiper;

            try {
                if (brandSwiperRef.current) return true;

                // Use the correctly typed Swiper constructor
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
            timer = window.setInterval(() => {
                attempts += 1;
                if (initBrand() || attempts >= maxAttempts) {
                    if (timer) {
                        clearInterval(timer);
                        timer = null;
                    }
                }
            }, interval) as unknown as number;
        }

        return () => {
            if (timer) clearInterval(timer);
            try {
                // Type-safe cleanup
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
        <div className="overflow-x-hidden">
            <>
                {/* Header Start (Rendered by Header component) */}
                <Meta
                    title="About Sajjat Mujawar | Senior Creative Designer"
                    description="Learn more about Sajjat Mujawar, Senior Creative Designer, and explore his expertise in UI/UX, branding, and creative design."
                    image="/images/about/about2.png"
                    url="https://sajjatmujawar.netlify.app/"
                />

                <Header />
                <main className="pt-[60px]">
                    {/* Main Content Start */}
                    {/* About Me Section Start */}
                    <section className="bg-secondary pt-20 pb-120" data-aos="zoom-in">
                        <div className="container">
                            <div className="about-grid">
                                {/* Using Image component for about image */}
                                <Image className="mx-auto" src="/images/about/about2.png" alt="about me" width={400} height={500} />
                                <div className="fw-bold font-Syne leading-none d-flex flex-wrap flex-column gap-y-2">
                                    <span className="text-warning text-xl">About me</span>
                                    <h3 className="text-dark section-title">
                                        Sajjat Mujawar
                                    </h3>

                                    <h4 className="text-dark text-2xl mt-3 mb-4">Product Designer</h4>
                                    <p className="text-dark text-xl fw-bold font-Syne leading-7 mb-6">
                                        A Product Designer & Developer and I am in the game for over 7+ years. I am proud of my
                                        works and ready to face the next challenge
                                    </p>
                                    <p className="paragraph mb-6">
                                        That is where I come in. A lover of words, a wrangler of copy. Here to create copy that not
                                        only reflects who you are and what you stand for, but words that truly land with those that
                                        read them, calling your audience in and making them .
                                    </p>
                                    <div>
                                        {/* Using Image component for signature */}
                                        <Image src="/images/signature.svg" alt="signature" width={150} height={50} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* About Me Section End */}

                    {/* Experience Section Start */}
                    <section className="bg-white py-120 overflow-x-hidden">
                        <div className="container" data-aos="zoom-out">
                            <div className="about-grid-section-two">
                                <div className="fw-bold font-Syne leading-none d-flex flex-wrap flex-column gap-y-2">
                                    <h3 className="text-dark section-title mb-5">
                                        My vision is to create happy my clients
                                    </h3>
                                    <p className="paragraph mb-7">
                                        That is where I come in. A lover of words, a wrangler of copy. Here to create copy that not
                                        only reflects who you are and what you stand for, but words that truly land with those that
                                        read them, calling your audience in and making them want more.
                                    </p>

                                    <ul className="award-lists d-flex flex-wrap p-0 list-unstyled">
                                        <li className="award-lists-item">
                                            <span className="text-dark text-32 fw-bold font-Syne position-relative">08</span>
                                            <p className="paragraph">Award winner</p>
                                        </li>
                                        <li className="award-lists-item">
                                            <span className="text-dark text-32 fw-bold font-Syne position-relative">1.2k</span>
                                            <p className="paragraph">Worldwide client</p>
                                        </li>
                                        <li className="award-lists-item">
                                            <span className="text-dark text-32 fw-bold font-Syne position-relative">3.5k</span>
                                            <p className="paragraph">Job done successfully</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="d-flex flex-column justify-content-end">
                                    <div className="d-flex flex-wrap flex-column years-of-experience mb-12">
                                        <span
                                            className="years-experience-of-number text-dark fw-bold font-Syne leading-none d-inline-block position-relative">12+</span>
                                        <span className="strock-text">Years of <br /> experience</span>
                                    </div>

                                    <div className="bg-dark d-flex flex-wrap justify-content-between align-items-end say-hello-contact-box">
                                        <div className="d-flex flex-column flex-wrap gap-y-2">
                                            <span className="text-warning text-lg fw-normal leading-none">SAY HELLO!</span>
                                            <h4 className="text-white text-2xl fw-bold font-Syne leading-none mb-0">
                                                hello@henry.com
                                            </h4>
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-end">
                                            <a href="#" className="animate-arrow-up">
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 34L34 14" stroke="#FFB646" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M14 14H34V34" stroke="#FFB646" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Experience Section End */}


                    {/* Video Section Start */}
                    <div className="bg-white pb-120">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="position-relative" data-aos="zoom-in-up">
                                        {/* Using Image component for video thumbnail */}
                                        <Image className="rounded-2xl" src="/images/video/video.png" alt="video image" width={1280} height={720} />
                                        <a href="https://www.youtube.com/watch?v=mSC6GwizOag&ab_channel=TailwindLabs" className="video-popup play-button">
                                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle className="fill-primary group-hover:fill-yellow transition-all duration-300" cx="50" cy="50" r="50" />
                                                <path className="stroke-black-800 group-hover:stroke-white" d="M43 41L57 50L43 59V41Z" strokeOpacity="0.9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Video Section End */}

                    {/* Tabs Start */}
                    <section className="featured-properties">
                        <div className="container" data-aos="zoom-out" data-aos-delay="800">
                            <div className="row">
                                <div className="col-12">
                                    <div className="fw-bold font-Syne text-center leading-none d-flex flex-wrap flex-column gap-y-2 mb-4">
                                        <span className="text-warning text-xl">Resume</span>
                                        <h3 className="section-title text-dark mb-0">
                                            All over my details find he<span className="d-inline-block position-relative circle-shape portfolio-shape2">re.</span>..
                                        </h3>
                                    </div>
                                    <div className="tabs nav nav-pills flex-wrap justify-content-center gap-4 mt-8 mb-14">
                                        {/* Tab Buttons (keeping original hrefs for demonstration, normally would use Next.js routing or component state) */}
                                        {['about_me_tab', 'experience_tab', 'education_tab', 'skills_tab', 'awards_tab'].map((id, index) => {
                                            const label = id.replace('_tab', '').split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
                                            const isActive = index === 0 ? ' active' : '';
                                            return (
                                                <button key={id} data-bs-toggle="pill" data-bs-target={`#${id}`} className={`tab-btn justify-content-between align-items-center d-inline-flex${isActive}`}>
                                                    {label}
                                                    <span className="inline-block animate-arrow-up">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7 17L17 7" stroke="currentColor" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M7 7H17V17" stroke="currentColor" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="tab-content">
                                        {/* About Me Tab Content */}
                                        <div id="about_me_tab" className="tab-pane fade show active position-relative">
                                            <div className="about-me-grid">
                                                {/* Using Image component for about me tab image */}
                                                <Image src="/images/about/about3.png" alt="about me" width={300} height={400} />
                                                <div>
                                                    <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">Based in India</h4>
                                                    <p className="paragraph mb-7">Sajjat Mujawar, <span className="text-dark">Product Designer</span>, based in India. That is where I come in. A lover of words, a wrangler of copy. Here to create copy that not only reflects who you are and what you stand for,</p>
                                                    <p className="paragraph mb-14">but words that truly land with those that read them, calling your audience in and making them want more.</p>

                                                    <ul className="flex-column gap-3 d-inline-flex list-unstyled p-0">
                                                        {['Name', 'Nationality', 'Phone', 'Email', 'Experience', 'Freelance', 'Skype', 'Language'].map((label, index) => {
                                                            const values = ['Sajjat Mujawar', 'Indian', '+91 90294 03595', 'hello@henry.com', '12+ years', 'Available', 'henry.halk23', 'English, Hindi, Marathi, Konkani'];
                                                            return (
                                                                <li key={index} className="gap-10 d-inline-flex align-items-center">
                                                                    <span className="w-110px text-black-text-800 text-lg fw-normal leading-none">{label}</span>
                                                                    <span className="text-dark text-2xl fw-bold font-Syne leading-8">{values[index]}</span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Experience Tab Content */}
                                        <div id="experience_tab" className="tab-pane fade position-relative">
                                            <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">Experience</h4>
                                            <div className="tab-contents tab-contents-experience gap-x-4 gap-y-5">
                                                {[
                                                    { period: '03/216 – Running', company: 'Axtra', title: 'Lead digital marketer' },
                                                    { period: '03/2008 – 07/2011', company: 'Axtra', title: 'JavaScript developer' },
                                                    { period: '03/2008 – 07/2011', company: 'Axtra', title: 'Product designer' },
                                                    { period: '03/2008 – 07/2011', company: 'Axtra', title: 'UX researcher' }
                                                ].map((job, index) => (
                                                    <div key={index} className="experience-tab-item d-flex flex-wrap flex-column gap-8 justify-content-between">
                                                        <span className="text-sm fw-normal font-Inter leading-tight text-black-text-800">{job.period}</span>
                                                        <div>
                                                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">{job.company}</p>
                                                            <h4 className="fw-bold font-Syne leading-normal text-2xl text-dark">{job.title}</h4>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Education Tab Content */}
                                        <div id="education_tab" className="tab-pane fade">
                                            <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">Education</h4>
                                            <div className="education-tab-contents">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="education-tab-item d-flex flex-wrap">
                                                        <span className="text-sm fw-normal font-Inter leading-tight text-black-text-800">03/2008 – 07/2011</span>
                                                        <div className="flex-1">
                                                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">Axtra</p>
                                                            <h4 className="fw-bold font-Syne leading-normal text-2xl text-dark">BA Business Management</h4>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Skills Tab Content */}
                                        <div id="skills_tab" className="tab-pane fade">
                                            <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">Skills</h4>
                                            <div className="skills-tab-contents">
                                                {[
                                                    { img: '/images/skills/vs-code.png', name: 'React JS', percentage: '90' },
                                                    { img: '/images/skills/figma.png', name: 'Figma', percentage: '70' },
                                                    { img: '/images/skills/framer.png', name: 'Framer', percentage: '80' },
                                                    { img: '/images/skills/framer.png', name: 'Framer', percentage: '80' },
                                                    { img: '/images/skills/framer.png', name: 'Framer', percentage: '80' },
                                                    { img: '/images/skills/framer.png', name: 'Framer', percentage: '80' },
                                                ].map((skill, index) => (
                                                    <div key={index} className="d-flex flex-wrap gap-4 align-items-start skills-tab-item">
                                                        {/* Using Image component for skill icons */}
                                                        <Image className="items-start" src={skill.img} alt="icons" width={50} height={50} />
                                                        <div className="flex flex-wrap gap-1 flex-1 flex-col">
                                                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">{skill.name}</h4>
                                                            <p className="text-sm fw-normal font-Inter leading-none text-dark">({skill.percentage}%)</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Awards Tab Content */}
                                        <div id="awards_tab" className="tab-pane fade">
                                            <h4 className="text-dark text-2xl based-in-german-title-tab fw-bold font-Syne">Awards</h4>
                                            <div className="awards-tab-contents">
                                                {[
                                                    { img: '/images/awards/w-dot.png' },
                                                    { img: '/images/awards/webby.png' },
                                                    { img: '/images/awards/fwa.png' },
                                                    { img: '/images/awards/wordpress.png' },
                                                ].map((award, index) => (
                                                    <div key={index} className="d-flex flex-wrap flex-column awards-tab-item">
                                                        <div className="d-flex align-items-start justify-content-between">
                                                            {/* Using Image component for award icons */}
                                                            <Image src={award.img} alt="icons" width={50} height={50} />
                                                            <span className="fw-normal text-sm font-Inter text-black-text-800">2018</span>
                                                        </div>
                                                        <div>
                                                            <p className="dot text-lg fw-normal font-sans leading-7 text-dark position-relative">Winner</p>
                                                            <h4 className="fw-bold font-Syne leading-normal text-xl text-dark">01X Developer Award</h4>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Tabs End */}


                    {/* Testimonial Section Start */}
                    <section className="bg-white py-120 testimonial" data-aos="fade-up">
                        <div className="testimonial-space-left px-8">
                            <div className="d-flex flex-column testimonial-gap flex-xl-row">
                                <div className="fw-bold font-Syne leading-none d-flex flex-wrap flex-column gap-y-2 mb-10 testimonial-title-section">
                                    <span className="text-warning text-xl">Testimonial</span>
                                    <h3 className="d-inline-block section-title text-dark">
                                        <span className="position-relative circle-shape testimonial-shape">Cl</span>ient
                                        <br className="hidden d-xl-inline-block" /> feedback
                                    </h3>
                                </div>

                                <div className="swiper w-100">
                                    <div className="swiper-wrapper">
                                        {/* Testimonial Slides (Repeated HTML for Swiper) */}
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="swiper-slide">
                                                <span className="d-inline-block qotation-icon">
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M21.75 13.5L21.75 30C21.7475 32.3862 20.7985 34.6739 19.1112 36.3612C17.4239 38.0485 15.1362 38.9975 12.75 39C12.3522 39 11.9706 38.842 11.6893 38.5607C11.408 38.2794 11.25 37.8978 11.25 37.5C11.25 37.1022 11.408 36.7206 11.6893 36.4393C11.9706 36.158 12.3522 36 12.75 36C14.3413 36 15.8674 35.3679 16.9926 34.2426C18.1179 33.1174 18.75 31.5913 18.75 30V28.5H7.5C6.70435 28.5 5.94129 28.1839 5.37868 27.6213C4.81607 27.0587 4.5 26.2956 4.5 25.5L4.5 13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5L18.75 10.5C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5ZM40.5 10.5H29.25C28.4544 10.5 27.6913 10.8161 27.1287 11.3787C26.5661 11.9413 26.25 12.7044 26.25 13.5L26.25 25.5C26.25 26.2956 26.5661 27.0587 27.1287 27.6213C27.6913 28.1839 28.4544 28.5 29.25 28.5H40.5V30C40.5 31.5913 39.8679 33.1174 38.7426 34.2426C37.6174 35.3679 36.0913 36 34.5 36C34.1022 36 33.7206 36.158 33.4393 36.4393C33.158 36.7206 33 37.1022 33 37.5C33 37.8978 33.158 38.2794 33.4393 38.5607C33.7206 38.842 34.1022 39 34.5 39C36.8862 38.9975 39.1739 38.0485 40.8612 36.3612C42.5485 34.6739 43.4975 32.3862 43.5 30V13.5C43.5 12.7044 43.1839 11.9413 42.6213 11.3787C42.0587 10.8161 41.2957 10.5 40.5 10.5Z"
                                                            fill="#080808" fillOpacity="0.9" />
                                                    </svg>
                                                </span>
                                                <p className="testimonial-texts fw-bold font-Syne">
                                                    “Energistically build alternative scenarios via cross-unit applications. Credibly exploit one-to-one strategic theme areas and clicks-and-mortar services”
                                                </p>
                                                <h4 className="d-flex flex-wrap align-items-center gap-4 text-dark testimonial-qotation-name font-Syne">
                                                    <span>
                                                        <svg width="48" height="2" viewBox="0 0 48 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 1H48" stroke="#080808" strokeOpacity="0.4" />
                                                        </svg>
                                                    </span> Jhon Smith
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Testimonial Section End */}

                    {/* Brand Section Start*/}
                    <div className="bg-white brandCarousel mb-120" data-aos="flip-down">
                        <div className="container">
                            <div className="swiper brand-carousel">
                                <div className="swiper-wrapper">
                                    {[1, 2, 3, 4, 5, 6, 3].map((i, index) => (
                                        <div key={index} className="swiper-slide">
                                            {/* Use map index for key since original array has duplicate values */}
                                            <Image
                                                className="mx-auto d-block"
                                                src={`/images/brand/logo${i}.svg`}
                                                alt="brandlogo"
                                                width={200}
                                                height={50}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Brand Section End*/}
                    {/* Main Content End */}

                </main>

                {/* Footer Start (Rendered by Footer component) */}
                <Footer />
            </>
        </div>
    );
}