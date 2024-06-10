import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/NewHome';
import About from './pages/aboutPage/About';
import Educators from './pages/EducatorsPage/Educators';
import SummerOfCS from './pages/SummerOfCS/SummerOfCS';
import ResearchAndPolicy from './pages/ResearchAndPolicyPage/ResearchAndPolicy';
import AdminPage from './pages/AdminPage/Admin';
import NewsAndFeaturesPage from './pages/NewsAndFeatures/NewsAndFeatures';
import EventsPage from './pages/NewsAndFeatures/EventsPage/EventsPage';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import SpotlightPage from './pages/NewsAndFeatures/SpotlighPage/SpotligPage';
import Policy from './pages/PolicyPage/Policy';
import './styles.css';
import ResearchPage from './pages/ResearchPage.jsx/ResearchPage';
import PdfPage from './pages/AdminPage/Admin_pdf';
import AdminHome from './pages/AdminHomePage/AdminHomePage';

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
        <Route path="/pdfPage" element={<PdfPage />} />
        <Route path="/news" element={<NewsAndFeaturesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/spotlight" element={<SpotlightPage />} />
        {/* <Route path="/policy" element={<Policy />} /> */}
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
);