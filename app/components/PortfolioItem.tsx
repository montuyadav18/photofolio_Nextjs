import React from 'react';

interface PortfolioItemProps {
  colClass: string;
  imgSrc: string;
  title: string;
  delay?: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ colClass, imgSrc, title, delay = '0' }) => {
  return (
    <div className={colClass} data-aos="fade-up" data-aos-delay={delay}>
      <div className="portfolio-item">
        <a href="#" className="d-block overflow-hidden">
          <img src={imgSrc} alt={title} className="w-100" />
        </a>
        <div className="portfolio-content mt-3">
          <h4 className="mb-0">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
