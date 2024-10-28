import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/NewHome';
import About from './pages/aboutPage/About';
import Educators from './pages/EducatorsPage/Educators';
import SummerOfCS from './pages/SummerOfCS/SummerOfCS';
import ResearchAndPolicy from './pages/ResearchAndPolicyPage/ResearchAndPolicy';
import NewsAndFeaturesPage from './pages/NewsAndFeatures/NewsPage/NewsPage';
import EventsAdminPage from './pages/AdminPage/EventsAdminPage/EventsPage';
import EventsPage from './pages/NewsAndFeatures/EventsPage/EventsPage';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import SpotlightPage from './pages/NewsAndFeatures/SpotlighPage/SpotligPage';
import Policy from './pages/PolicyPage/Policy';
import './styles.css';
import './main.css';
import ResearchPage from './pages/ResearchPage.jsx/ResearchPage';
import PdfPage from './pages/AdminPage/ResearchPaperAdminPage/Admin_pdf';
import AdminHome from './pages/AdminHomePage/AdminHomePage';
import NewsAdminPage from './pages/AdminPage/NewsAdminPage/NewsAdminPage';
import BannerAdminPage from './pages/AdminPage/BannerAdminPage/BannerAdminPage';
import { BannerProvider } from './BannerContext';
import MajorEventsAdminPage from './pages/AdminPage/MajorEventsAdminPage/MajorEventsAdminPage';
import MajorEventsAdminPage2 from './MajorEventsAdminPage2';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <BannerProvider>
        <Header />
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/educators" element={<Educators />} />
          <Route path="/summerOfCS" element={<SummerOfCS />} />
          <Route path="/researchAndPolicy" element={<ResearchAndPolicy />} />
          <Route path="/EventsAdminPage" element={<EventsAdminPage />} />
          <Route path="/pdfPage" element={<PdfPage />} />
          <Route path="/news" element={<NewsAndFeaturesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/spotlight" element={<SpotlightPage />} />
          {/* <Route path="/policy" element={<Policy />} /> */}
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/NewsAdminPage" element={<NewsAdminPage />} />
          <Route path="/BannerAdminPage" element={<BannerAdminPage />} />
          <Route path="/MajorEventsAdminPage" element={<MajorEventsAdminPage />} />
          <Route path="/MajorEventsAdminPage2" element={<MajorEventsAdminPage2 />} />
        </Routes>
        <Footer />
      </BannerProvider>
    </BrowserRouter>
  </React.StrictMode>,
);