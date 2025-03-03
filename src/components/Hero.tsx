

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to <span className="text-amber-400">YourBrand</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          A modern and elegant starter template with a clean design using black, gold, and silver gray colors.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 px-6 rounded-md transition-colors">
            Get Started
          </button>
          <button className="bg-transparent hover:bg-gray-800 text-white border border-gray-400 font-bold py-3 px-6 rounded-md transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;