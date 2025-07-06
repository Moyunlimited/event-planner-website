import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonial from './components/Testimonial';
import TestimonialForm from './components/TestimonialForm';
import AboutUs from './components/AboutUS';
import ContactSection from './components/ContactSection';
import AdminTestimonials from './components/AdminTestimonials';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Testimonial />
      <TestimonialForm onSuccess={() => window.location.reload()} />
      <AboutUs />
      <ContactSection />
      <AdminTestimonials />
      <Footer />
    </>
  );
}

export default App;