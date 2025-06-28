import React from 'react';

interface FooterLink {
  name: string;
  path: string;
}

const Footer: React.FC = () => {
  const links: FooterLink[] = [
    { name: 'Home', path: '#' },
    { name: 'About', path: '#' },
    { name: 'Services', path: '#' },
    { name: 'Contact', path: '#' }
  ];

  const resources: FooterLink[] = [
    { name: 'Documentation', path: '#' },
    { name: 'Blog', path: '#' },
    { name: 'Support', path: '#' }
  ];

  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-400 mb-4 hover:text-amber-300 transition-colors duration-300">
              M.Mazibuko
            </h3>
            <p className="mb-4">
              M.Mazibuko offers modern, scalable, and user-centric digital solutions...
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="text-white font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="hover:text-amber-400 transition-colors duration-300 hover:pl-2">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a href={resource.path} className="hover:text-amber-400 transition-colors duration-300 hover:pl-2">
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <address className="not-italic space-y-2">
              <p>21 Bonamour Avenue</p>
              <p>Berea, Durban 4001</p>
              <p className="mt-2">melomazibuko8@gmail.com</p>
              <p>078 683 3492</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="hover:text-amber-400 transition-colors duration-300">
            &copy; {new Date().getFullYear()} M.Mazibuko. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;