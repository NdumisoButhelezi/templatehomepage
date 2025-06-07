import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navItems: string[] = ['Home', 'About', 'Services', 'Contact'];

  return (
    <header className="bg-black dark:bg-gray-900 text-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gold-400 hover:text-gold-300 transition-colors duration-300">
            YourBrand
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="hover:text-gold-400 transition-all duration-300 hover:scale-110 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <DarkModeToggle />

            <button 
              className="md:hidden text-white hover:text-gold-400 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <nav className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
          <ul className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="block hover:text-gold-400 transition-colors duration-300 hover:pl-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;