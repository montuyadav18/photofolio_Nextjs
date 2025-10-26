// import { useEffect, useRef } from 'react';
"use client";

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import Header from "../components/Header"; // Ensure path is correct
import Footer from "../components/Footer"; // Ensure path is correct
import Meta from "../components/Meta";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Project() {
    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({
            duration: 1000, // Example duration
            once: true, // Example to animate only once
        });
        AOS.refresh(); // Recalculate positions on component mount
    }, []);

    const projectImage1 = "/images/blog-details/post1.png"; // Replace with actual paths
    const projectImage2 = "/images/blog-details/post2.png"; // Replace with actual paths
    const bannerImage = "/images/blog-details/banner.png"; // Replace with actual paths
    const relatedProject3 = "/images/projects/project3.png"; // Replace with actual paths
    const relatedProject4 = "/images/projects/project4.png"; // Replace with actual paths

    return (
        <div className="overflow-x-hidden">
            <>
                <Meta
                    title="Brand Identity Design | Sajjat Mujawar Portfolio"
                    description="Full branding and visual identity project by Sajjat Mujawar, Senior Creative Designer."
                    image="/images/projects/brand-identity.png"
                    url="https://www.yourwebsite.com/project-details"
                />
                {/* Header Start */}
                <Header />
                <main className="pt-[80px]">

                    {/* Hero Section Start */}
                    <section className="bg-secondary pt-20">
                        <div className="max-w-1075 mx-auto banner-contents" data-aos="flip-down" data-aos-delay="300">
                            <div className="row pb-12">
                                {/* Left Column: Meta & Title */}
                                <div className="col-12 col-lg-6 mb-10">
                                    <ul className="d-flex flex-wrap text-sm fw-normal font-Inter leading-tight p-0 list-unstyled m-0">
                                        <li className="blog-meta-item">
                                            <a href="#">UI Design</a>
                                        </li>
                                        <li className="blog-meta-item">
                                            <a href="#">03 May 2019</a>
                                        </li>
                                    </ul>
                                    <h4 className="text-dark fw-bold font-Syne leading-snug banner-title">
                                        Mendero fintech dashboard design
                                    </h4>
                                </div>

                                {/* Right Column: Client Info */}
                                <div className="col-12 col-lg-6">
                                    <ul className="d-flex flex-wrap gap-y-6 gy-lg-0 clients-info">
                                        <li className="d-flex flex-wrap flex-column gap-2 clients-info-item">
                                            <span className="clients-info-text text-sm fw-normal font-Inter leading-tight">Client</span>
                                            <h2 className="text-dark text-15 fw-bold font-sans leading-none">
                                                Mashorom
                                            </h2>
                                        </li>
                                        <li className="d-flex flex-wrap flex-column gap-2 clients-info-item">
                                            <span className="clients-info-text text-sm fw-normal font-Inter leading-tight">Category</span>
                                            <h4 className="text-dark text-15 fw-bold font-sans leading-none">User Experience</h4>
                                        </li>
                                        <li className="d-flex flex-wrap flex-column gap-2 clients-info-item">
                                            <span className="clients-info-text text-sm fw-normal font-Inter leading-tight">Tools</span>
                                            <h4 className="text-dark text-15 fw-bold font-sans leading-none">
                                                Figma, Webflow
                                            </h4>
                                        </li>
                                        <li className="d-flex flex-wrap flex-column gap-2 clients-info-item">
                                            <span className="clients-info-text text-sm fw-normal font-Inter leading-tight">Start date</span>
                                            <h4 className="text-dark text-15 fw-bold font-sans leading-none">
                                                09/01/ 2020
                                            </h4>
                                        </li>
                                        <li className="d-flex flex-wrap flex-column gap-2 clients-info-item">
                                            <span className="clients-info-text text-sm fw-normal font-Inter leading-tight">End date</span>
                                            <h4 className="text-dark text-15 fw-bold font-sans leading-none">
                                                09/01/ 2020
                                            </h4>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Banner Image */}
                            <div className="row mb-12">
                                <div className="col-12">
                                    <div className="w-full rounded-20 overflow-hidden">
                                        <Image
                                            src={bannerImage}
                                            alt="Project Banner"
                                            width={1075} // Set width based on max-w-1075
                                            height={600} // Set an appropriate height
                                            layout="responsive" // Use responsive layout
                                            objectFit="cover" // Ensure image covers the area
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Hero Section End */}

                    {/* Project Details Section Start */}
                    <section className="bg-white pb-120 project-details-section">
                        <div className="max-w-1075 mx-auto banner-contents">
                            <div className="grid grid-cols-1">
                                {/* Overview */}
                                <h3 className="text-32 fw-bold font-Syne leading-10 mb-4">Overview</h3>
                                <p className="paragraph mb-12">Minimalism combined with elements of french typography and brutalism helped us to realize the site exactly as we imagined with the client at the beginning: visually restrained, but stylish. Informative and pleasant to use, with an elegant aftertaste of a serious financial institution. Combined with elements of french typography and visually restrained, but stylish. Informative and pleasant to use, with an elegant aftertaste of a serious financial institutional client, and close collaboration.</p>
                                <p className="paragraph mb-12">That is where I come in. A lover of words, a wrangler of copy. Here to create copy that not only reflects who you are and what you stand for, but words that truly land with those that read them, calling your audience in and making them want more.</p>

                                {/* List */}
                                <ul className="list-style-squre text-dark text-xl fw-bold font-Syne mb-12 list-unstyled">
                                    <li>Advantage</li>
                                    <li>Accomplished</li>
                                    <li>Marketplace startups</li>
                                    <li>SaaS startups</li>
                                </ul>

                                {/* Typography */}
                                <h3 className="text-32 fw-bold font-Syne leading-10 mb-4">Typography</h3>
                                <p className="paragraph mb-12">
                                    The basic idea was to find a balance between the thin, wispy sans-serif used to indicate a ‘futuristic‘ tone, and a bold, masculine font synonymous with ‘construction‘. We came up with something in the middle, leaning towards lighter-weighted fonts, but still with a hint of that blocky ‘construction’ vibe. We use Chaney for general display and when we want to drive attention to the content, and the technical and geometric Sora font for the body copy and paste overall hierachy.
                                </p>
                            </div>

                            {/* Post Images */}
                            <div className="row gy-6 mb-12">
                                <div className="col-12 col-sm-5">
                                    <div className="w-100 h-100 rounded-20 overflow-hidden">
                                        <Image
                                            src={projectImage1}
                                            alt="post image 1"
                                            width={400} // Example width
                                            height={600} // Example height
                                            layout="responsive"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-7">
                                    <div className="w-100 h-100 rounded-20 overflow-hidden">
                                        <Image
                                            src={projectImage2}
                                            alt="post image 2"
                                            width={650} // Example width
                                            height={600} // Example height
                                            layout="responsive"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1">
                                <h3 className="text-32 fw-bold font-Syne leading-10 mb-4">Conclusion</h3>
                            </div>

                            {/* Conclusion Text */}
                            <div className="row mb-n6">
                                <div className="col-12 col-lg-6 mb-6">
                                    <p className="paragraph">The basic idea was to find a balance between the thin, wispy sans-serif used to indicate a ‘futuristic‘ tone, and a bold, masculine font synonymous with ‘construction‘. We came up with something in the middle, leaning towards lighter-weighted fonts, but still with a hint of that blocky ‘construction’ vibe. We use Chaney for general display and when we want to drive attention to the content, and the technical and geometric Sora font for the body copy and paste overall hierachy.</p>
                                </div>
                                <div className="col-12 col-lg-6 mb-6">
                                    <p className="paragraph">
                                        The basic idea was to find a balance between the thin, wispy sans-serif used to indicate a ‘futuristic‘ tone, and a bold, masculine font synonymous with ‘construction‘. We came up with something in the middle, leaning towards lighter-weighted fonts, but still with a hint of that blocky ‘construction’ vibe.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Project Details Section End */}

                    {/* Related Project Section Start */}
                    <section className="bg-white pb-120">
                        <div className="container">
                            <div className="row mb-n6">
                                {/* Section Header */}
                                <div className="col-12" data-aos="flip-down" data-aos-delay="400">
                                    <div className="fw-bold font-Syne text-center leading-none d-flex flex-wrap flex-column gap-y-2 mb-10">
                                        <span className="text-warning text-xl">Portfolio</span>
                                        <h3 className="section-title text-dark">
                                            Related <span className="position-relative circle-shape portfolio-shape">wo</span>rk
                                        </h3>
                                    </div>
                                </div>

                                {/* Project Item 1 */}
                                <div className="col-12 col-md-6 mb-6" data-aos="flip-down">
                                    <div className="rounded-20 overflow-hidden mb-6">
                                        <Image
                                            src={relatedProject3}
                                            alt="project 1"
                                            width={500} // Example width
                                            height={500} // Example height
                                            layout="responsive"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="d-flex flex-wrap flex-column gap-3">
                                        <div className="d-flex flex-wrap gap-2">
                                            <a className="text-xs fw-medium font-Inter leading-none px-4 rounded-40 portfolio-tag-link" href="/projects">APP</a>
                                            <a className="text-xs fw-medium font-Inter leading-none px-4 rounded-40 portfolio-tag-link" href="/projects">DEVELOPMENT</a>
                                        </div>
                                        <div className="d-flex flex-wrap align-items-center justify-content-between text-dark portfolio-title">
                                            <h4 className="fw-bold font-Syne text-center leading-10 portfolio-link">
                                                <a className="transition-all" href="/project-details">Basinik Finance App</a>
                                            </h4>
                                            <a className="animate-arrow-up" href="/project-details">
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z" fill="currentColor" fillOpacity="0.9" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z" fill="currentColor" fillOpacity="0.9" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Item 2 */}
                                <div className="col-12 col-md-6 mb-6" data-aos="flip-down" data-aos-delay="300">
                                    <div className="rounded-20 overflow-hidden mb-6">
                                        <Image
                                            src={relatedProject4}
                                            alt="project 2"
                                            width={500} // Example width
                                            height={500} // Example height
                                            layout="responsive"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="d-flex flex-wrap flex-column gap-3">
                                        <div className="d-flex flex-wrap gap-2">
                                            <a className="text-xs fw-medium font-Inter leading-none px-4 rounded-40 portfolio-tag-link" href="/projects">APP</a>
                                            <a className="text-xs fw-medium font-Inter leading-none px-4 rounded-40 portfolio-tag-link" href="/projects">DEVELOPMENT</a>
                                        </div>
                                        <div className="d-flex flex-wrap align-items-center justify-content-between text-dark portfolio-title">
                                            <h4 className="fw-bold font-Syne text-center leading-10 portfolio-link">
                                                <a className="transition-all" href="/project-details">Oxilex Dashboard design</a>
                                            </h4>
                                            <a className="animate-arrow-up" href="/project-details">
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z" fill="currentColor" fillOpacity="0.9" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z" fill="currentColor" fillOpacity="0.9" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Related Project Section End */}
                </main>
                <Footer />
            </>
        </div>
    );
}

// Helper function to convert 'kebab-case' to 'camelCase' for inline styles if needed
// function toCamelCase(str) {
//     return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
// }