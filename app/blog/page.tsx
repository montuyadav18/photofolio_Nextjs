// import { useEffect } from 'react';
"use client";

import React, { useEffect } from 'react';
import Image from "next/image";
import Header from "../components/Header"; // Ensure path is correct
import Footer from "../components/Footer"; // Ensure path is correct
// import PortfolioSection from "../components/PortfolioSection"; 
import Meta from "../components/Meta";

import AOS from 'aos';
import 'aos/dist/aos.css';

// --- TypeScript Interface for Props ---
interface BlogItemProps {
    src: string;
    alt: string;
    category: string;
    date: string;
    title: string;
    delay: string;
}

// --- Reusable BlogItem Component ---
// Note: SVG paths are kept as they were in the original HTML.
// Correctly typing the functional component with the defined interface
const BlogItem: React.FC<BlogItemProps> = ({ src, alt, category, date, title, delay }) => (
    <div className="blog-item" data-aos="zoom-in-up" data-aos-delay={delay}>
        <div className="rounded-20 overflow-hidden mb-6">
            <Image
                className="w-100"
                src={src}
                alt={alt}
                width={500} // Placeholder width for Next/Image optimization
                height={300} // Placeholder height for Next/Image optimization
                objectFit="cover" // Adjust as needed
            />
        </div>
        <div className="d-flex flex-wrap flex-column gap-3">
            <ul className="d-flex flex-wrap text-sm fw-normal font-Inter leading-tight p-0 list-unstyled m-0">
                <li className="blog-meta-item">
                    <a href="#">{category}</a>
                </li>
                <li className="blog-meta-item">
                    <a href="#">{date}</a>
                </li>
            </ul>
            <div className="d-flex justify-content-between align-items-end text-dark blog-title-section">
                <h4 className="fw-bold font-Syne transition-all leading-8 blog-title">
                    <a href="/blog-details">{title}</a>
                </h4>
                <a className="animate-arrow-up" href="/blog-details">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z" fill="currentColor" fillOpacity="0.9" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z" fill="currentColor" fillOpacity="0.9" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
);

// --- Main Blog Component ---
export default function Blog() {
    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({
            duration: 1000, // Example duration
            once: true,    // Example to animate only once
        });
        AOS.refresh(); // Recalculate positions on component mount
    }, []);

    // Note: Updated image paths to use the typical Next.js public directory prefix /images/
    const blogPosts = [
        { src: "/images/blog/blog1.png", alt: "Blog 1", category: "UI Design", date: "03 May 2019", title: "Right-lo-left behind development in mobile web design", delay: "600" },
        { src: "/images/blog/blog2.png", alt: "Blog 2", category: "UI Design", date: "03 May 2019", title: "Connect craft: Reading the smart experience", delay: "800" },
        { src: "/images/blog/blog3.png", alt: "Blog 3", category: "UI Design", date: "03 May 2019", title: "Ecoglow: Sustainable skincare a brighter tomorrow", delay: "1000" },
        { src: "/images/blog/blog4.png", alt: "Blog 4", category: "UI Design", date: "03 May 2019", title: "Right-lo-left behind development in mobile web design", delay: "1200" },
        { src: "/images/blog/blog1.png", alt: "Blog 5", category: "UI Design", date: "03 May 2019", title: "Right-lo-left behind development in mobile web design", delay: "400" },
        { src: "/images/blog/blog2.png", alt: "Blog 6", category: "UI Design", date: "03 May 2019", title: "Connect craft: Reading the smart experience", delay: "600" },
        { src: "/images/blog/blog3.png", alt: "Blog 7", category: "UI Design", date: "03 May 2019", title: "Ecoglow: Sustainable skincare a brighter tomorrow", delay: "800" },
        { src: "/images/blog/blog4.png", alt: "Blog 8", category: "UI Design", date: "03 May 2019", title: "Right-lo-left behind development in mobile web design", delay: "1000" },
    ];


    return (
        <div className="overflow-x-hidden">
            <>
                <Meta
                    title="Blog | Sajjat Mujawar Portfolio"
                    description="Read the latest articles and insights from Sajjat Mujawar, Senior Creative Designer, about design, branding, and creative projects."
                    image="/images/blog/blog-og.png"
                    url="https://www.yourwebsite.com/blog"
                />
                {/* Header Start */}
                <Header />
                <main className="pt-[80px]">
                    {/* Blog Section Start - Converted from HTML */}
                    <section className="bg-white pt-20 pb-120">
                        <div className="container">
                            {/* Blog Section Header */}
                            <div className="row">
                                <div className="col-12" data-aos="flip-down" data-aos-delay="400">
                                    <div className="fw-bold font-Syne text-center leading-none flex flex-wrap flex-column gap-y-2 mb-10">
                                        <span className="text-warning text-xl">Blog</span>
                                        <h3 className="section-title text-dark">
                                            My blog
                                            <span className="position-relative circle-shape blog-shape-inner">po</span>st
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Blog Grid */}
                            <div className="blog-grid">
                                {blogPosts.map((post, index) => (
                                    <BlogItem
                                        key={index}
                                        src={post.src}
                                        alt={post.alt}
                                        category={post.category}
                                        date={post.date}
                                        title={post.title}
                                        delay={post.delay}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* Blog Section End */}
                </main>
                {/* Footer Start */}
                <Footer />
            </>
        </div>
    );
}