

const Navbar = () => {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-amber-400">planet 09 ai</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-amber-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;