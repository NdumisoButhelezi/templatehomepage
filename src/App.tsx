import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import About from "./components/About";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import ScrollToTop from "./components/ScrollToTop";
import Projects from "./components/Projects";
import NotFound from "./components/NotFound";
import { Helmet } from "react-helmet";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Helmet>
        <title>M.Mazibuko | Modern Web Solutions</title>
        <meta name="description" content="Portfolio and web solutions by M.Mazibuko. Explore projects, services, and contact info." />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <main className="flex-grow pt-20" aria-label="Main content">
          <Routes>
            <Route path="/" element={<><Hero /><Features /></>} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;