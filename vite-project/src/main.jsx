import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/NewHome';
import About from './pages/aboutPage/About';
import Educators from './pages/educatorsPage/Educators';
import SummerOfCS from './pages/SummerOfCS/SummerOfCS';
import ResearchAndPolicy from './pages/ResearchAndPolicyPage/ResearchAndPolicy';
import AdminPage from './pages/Admin/Admin';
import NewsAndFeaturesPage from './pages/NewsAndFeatures/NewsAndFeatures';
import EventsPage from './pages/NewsAndFeatures/EventsPage/EventsPage';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import DataPage from './pages/DataPage/DataPage';
import SpotlightPage from './pages/NewsAndFeatures/SpotlighPage/SpotligPage';
import Policy from './pages/PolicyPage/Policy';
import './styles.css';
import ResearchPage from './pages/ResearchPage.jsx/ResearchPage';
import PdfPage from './pages/Admin/Admin_pdf';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/educators" element={<Educators />} />
        <Route path="/summerOfCS" element={<SummerOfCS />} />
        <Route path="/researchAndPolicy" element={<ResearchAndPolicy />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/adminPage/pdfPage" element={<PdfPage />} />
        <Route path="/news" element={<NewsAndFeaturesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/spotlight" element={<SpotlightPage />} />
        <Route path="/dataPage" element={<DataPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/research" element={<ResearchPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
);