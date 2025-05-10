import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import About from "./components/About";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import ScrollToTop from "./components/ScrollToTop";
import Projects from "./components/Projects";
import NotFound from "./components/NotFound";
// @ts-ignore
import { Helmet } from "react-helmet";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Helmet>
        <title>YourBrand | Modern Web Solutions</title>
        <meta name="description" content="Portfolio and web solutions by Ndumiso Buthelezi. Explore projects, services, and contact info." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;