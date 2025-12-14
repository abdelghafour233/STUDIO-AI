import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Admin from './pages/Admin';

// Handle scroll reset and Pixel PageView tracking
const RouteHandler = () => {
  const { pathname } = useLocation();
  const initialized = useRef(false);
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Simple visitor counter (Increment on first load of session)
    if (!initialized.current) {
        // Just increment on every refresh for this demo, or use sessionStorage to limit to 1 per session
        const currentVisits = localStorage.getItem('site_visits');
        const newVisits = currentVisits ? parseInt(currentVisits) + 1 : 1;
        localStorage.setItem('site_visits', newVisits.toString());
        initialized.current = true;
    }
    
    // 1. Facebook Pixel PageView
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    // 2. Google Analytics PageView (GA4 usually handles history changes, but explicit calls help in HashRouter)
    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: pathname,
      });
    }

    // 3. TikTok Pixel PageView
    if ((window as any).ttq) {
      (window as any).ttq.page();
    }

  }, [pathname]);
  
  return null;
};

const App = () => {
  return (
    <Router>
      <RouteHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;