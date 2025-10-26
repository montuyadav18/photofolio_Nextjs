// import { useEffect, useRef } from 'react';
"use client";

import React, { useEffect, useRef } from 'react';
import Meta from "../components/Meta";
import Header from "../components/Header"; // Ensure path is correct
import Footer from "../components/Footer"; // Ensure path is correct
import PortfolioSection from "../components/PortfolioSection"; // Import the Portfolio Section
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Project() {
    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({
            duration: 1000, // Example duration
            once: true,    // Example to animate only once
        });
        AOS.refresh(); // Recalculate positions on component mount
    }, []);

    return (
        <div className="overflow-x-hidden">
            <>
                <Meta
                    title="Projects | Sajjat Mujawar Portfolio"
                    description="Explore the creative projects by Sajjat Mujawar, including branding, UI/UX, and digital design work."
                    image="/images/portfolios/project1.png"
                    url="hhttps://sajjatmujawar.netlify.app/projects"
                />
                {/* Header Start */}
                <Header />
                <main className="pt-[120px]">


                    {/* Portfolio Section Start */}
                    <PortfolioSection />
                    {/* Portfolio Section End */}

                </main>
                {/* Footer Start */}
                <Footer />
            </>
        </div>
    );
}
