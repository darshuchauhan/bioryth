import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const BannerPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Show banner after 3 seconds on mount
    timerRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    // Schedule to show it again in 60 seconds (1 minute)
    timerRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, 60000);
  };

  return (
    <div className={`banner-overlay ${isOpen ? 'active' : ''}`} onClick={handleClose}>
      <div className="banner-container" onClick={(e) => e.stopPropagation()}>
        <button className="banner-close-btn" onClick={handleClose} aria-label="Close Banner">
          <X size={20} />
        </button>
        <div className="banner-image-wrapper">
          <img src="/expo-banner.png" alt="Expo Announcement" className="banner-img-popup" />
        </div>
      </div>
    </div>
  );
};

export default BannerPopup;
