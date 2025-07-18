import { useEffect, useState } from 'react';
import axios from 'axios';
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
import HomepageImageManager from './components/HomepageImageManager';
import Footer from './components/Footer';
import API_BASE from './config';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/is_admin`, {
          withCredentials: true,
        });
        setIsAdmin(res.data.admin);
      } catch (err) {
        console.error('Admin check failed:', err);
      }
    };

    checkAdmin();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      {isAdmin && <HomepageImageManager />} 
      <Services />
      <Gallery />
      <Testimonial />
      <TestimonialForm onSuccess={() => window.location.reload()} />
      <AboutUs />
      <ContactSection />
      {isAdmin && <AdminTestimonials />}
      <Footer />
    </>
  );
}

export default App;
