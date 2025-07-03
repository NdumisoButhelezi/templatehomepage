import { useState, useEffect } from 'react';

// Modal component for event-driven UI
const Modal: React.FC<{ open: boolean; onClose: () => void; message: string }> = ({ open, onClose, message }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <p className="mb-4 text-lg text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded-md transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

interface Slide {
  title: string;
  description: string;
  image: string;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [greeting, setGreeting] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Dynamic greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const slides: Slide[] = [
    {
      title: "Welcome  to  M.Mazibuko",
      description: "Precision. Speed. Core Technical Strength.",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=1920&h=1080"
    },
    {
      title: "Modern  Design",
      description: "Built with the latest technologies and best practices for modern web development.",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=1920&h=1080"
    },
    {
      title: "Responsive  Layout",
      description: "Perfectly optimized for all devices and screen sizes.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920&h=1080"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} message="Welcome! This is a custom event-driven modal." />
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
        </div>
      ))}

      <div className="relative h-full">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">
              <span className={
                `block text-2xl md:text-3xl font-medium text-amber-400 mb-2 transition-opacity duration-700 ${greeting ? 'opacity-100 animate-[bounceIn_1s_ease-out_forwards]' : 'opacity-0'}`
              }>
                {greeting || ' '},
              </span>
              {slides[currentSlide].title.split(' ').map((word, index) => (
                <span
                  key={index}
                  className="inline-block hover:animate-bounce hover:text-amber-400 transition-colors duration-300"
                >
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 animate-[slideUp_1s_ease-in_0.5s_forwards]">
              {slides[currentSlide].description}
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 px-6 rounded-md transition-all duration-300 hover:scale-105 transform hover:animate-bounce"
                onClick={() => setModalOpen(true)}
              >
                Get Started
              </button>
              <button className="bg-transparent hover:bg-gray-800 text-white border border-gray-400 font-bold py-3 px-6 rounded-md transition-all duration-300 hover:border-amber-400 hover:animate-bounce">
                Learn More
              </button>
            </div>

            <div className="absolute bottom-8 left-1 right-0 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentSlide
                      ? 'bg-amber-400 w-6'
                      : 'bg-gray-400 hover:bg-amber-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;