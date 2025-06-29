import { useEffect, useState } from 'react';

export interface FeatureItem {
    title: string;
    description: string;
  }
  
  export interface Slide {
    title: string;
    description: string;
    image: string;
  }
  
  export interface Plan {
    name: string;
    price: string;
    features: string[];
    popular: boolean;
  }
  
  export interface FormData {
    name: string;
    email: string;
    message: string;
  }

const DARK_MODE_KEY = 'darkMode';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    return stored ? stored === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, String(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
};

export default useDarkMode;