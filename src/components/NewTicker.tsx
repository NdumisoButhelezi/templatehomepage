import React, { useState, useEffect } from 'react';

const NewsTicker = () => {
  const newsItems = [
    "New feature released! Check out our latest update.",
    "Special promotion: 20% off all services this week.",
    "We're hiring! Join our team of talented developers."
  ];
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((prev) => (prev + 1) % newsItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 text-amber-400 py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="animate-[slideLeft_15s_linear_infinite] whitespace-nowrap">
          {newsItems[currentItem]}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;