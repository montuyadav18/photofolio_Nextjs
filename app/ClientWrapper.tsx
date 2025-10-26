"use client";

import React from 'react';
import useScrollToTop from '../components/elements/BackToTop'; // Assuming this is your hook

// You should implement the BackToTop button inside this wrapper 
// or in a similar client component if you want it to appear on all pages.

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // 💡 This hook is now safely called within a client component wrapper
  const { isVisible, scrollToTop } = useScrollToTop(100); 

  return (
    <>
      {children}
      
      {/* Example Back to Top Button: */}
      {isVisible && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-10 right-10 bg-black text-white p-3 rounded-full shadow-lg z-50"
        >
          ⬆️
        </button>
      )}
    </>
  );
}