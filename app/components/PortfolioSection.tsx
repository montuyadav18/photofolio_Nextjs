import React from 'react';
import PortfolioItem from './PortfolioItem'; 

// Define an interface for strong typing
interface PortfolioProject {
    colClass: string;
    imgSrc: string;
    title: string;
    delay: string;
}

const portfolioProjects: PortfolioProject[] = [
    {
        colClass: "col-12 col-md-6 col-lg-5",
        imgSrc: "images/portfolios/project1.png",
        title: "Oxilex Dashboard design",
        delay: "600"
    },
    {
        colClass: "col-12 col-md-6 col-lg-7",
        imgSrc: "images/portfolios/project6.png",
        title: "Oxilex Dashboard design",
        delay: "800"
    },
    {
        colClass: "col-12 col-md-6 col-lg-4",
        imgSrc: "images/portfolios/project3.png",
        title: "Oxilex Dashboard",
        delay: "1000"
    },
    {
        colClass: "col-12 col-md-6 col-lg-4",
        imgSrc: "images/portfolios/project4.png",
        title: "Oxilex Dashboard",
        delay: "1200"
    },
    {
        colClass: "col-12 col-md-6 col-lg-4",
        imgSrc: "images/portfolios/project5.png",
        title: "Oxilex Apps",
        delay: "1400"
    },
    {
        colClass: "col-12 col-md-6 col-lg-7",
        imgSrc: "images/portfolios/project6.png",
        title: "Oxilex Dashboard",
        delay: "0" 
    },
    {
        colClass: "col-12 col-md-6 col-lg-5",
        imgSrc: "images/portfolios/project7.png",
        title: "Oxilex Dashboard design",
        delay: "300"
    },
];

const PortfolioSection: React.FC = () => {
    return (
        <section className="bg-white pt-20 pb-120">
            <div className="container mx-auto">
                <div className="row">
                    <div className="col-12" data-aos="flip-down" data-aos-delay="400">
                        <div
                            className="fw-bold font-Syne text-center leading-none d-flex flex-wrap flex-column gap-y-2 mb-10">
                            <span className="text-warning text-xl">Portfolio</span>
                            <h3 className="section-title text-dark">
                                My recent <span
                                    className="position-relative circle-shape portfolio-shape">w</span>ork
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="row g-6">
                    {portfolioProjects.map((project, index) => (
                        <PortfolioItem
                            key={index}
                            colClass={project.colClass}
                            imgSrc={project.imgSrc}
                            title={project.title}
                            delay={project.delay}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
