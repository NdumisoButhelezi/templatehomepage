import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-100 dark:bg-gray-800">
    <h1 className="text-6xl font-bold text-amber-400 mb-4">404</h1>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
    <p className="text-gray-700 dark:text-gray-300 mb-6">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded-md transition-all">Go Home</Link>
  </section>
);

export default NotFound;
