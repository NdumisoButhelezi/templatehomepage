

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-400 mb-4">YourBrand</h3>
            <p className="mb-4">
              A modern starter template with a clean design using black, gold, and silver gray colors.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <address className="not-italic">
              <p>123 Main Street</p>
              <p>Anytown, USA 12345</p>
              <p className="mt-2">info@yourbrand.com</p>
              <p>(123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;