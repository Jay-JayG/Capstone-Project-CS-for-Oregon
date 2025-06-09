import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import About1 from './pages/AboutPage1/About1';
import Educators from './pages/EducatorsPage/Educators';
import SummerOfCS from './pages/SummerOfCS/SummerOfCS';
import ResearchAndPolicy from './pages/ResearchAndPolicyPage/ResearchAndPolicy';
import NewsAndFeaturesPage from './pages/NewsAndFeatures/NewsPage/NewsPage';
import EventsAdminPage from './pages/AdminPages/EventsAdminPage/EventsPage';
import EventsPage from './pages/NewsAndFeatures/EventsPage/EventsPage';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import SpotlightPage from './pages/NewsAndFeatures/SpotlighPage/SpotligPage';
import Policy from './pages/PolicyPage/Policy';
import './styles.css';
import './main.css';
import ResearchPage from './pages/ResearchPage.jsx/ResearchPage';
import PdfPage from './pages/AdminPages/ResearchPaperAdminPage/Admin_pdf';
import AdminHome from './pages/AdminHomePage/AdminHomePage';
import NewsAdminPage from './pages/AdminPages/NewsAdminPage/NewsAdminPage';
import BannerAdminPage from './pages/AdminPages/BannerAdminPage/BannerAdminPage';
import { AppProviders  } from './Contexts';
import MajorEventsAdminPage from './pages/AdminPages/MajorEventsAdminPage/MajorEventsAdminPage';
import WinterOfCS from './pages/WinterEventpage/WinterOfCS';
import EcsHuddlePage from './pages/EcsHuddlePage/EcsHuddlePage';
import EventPage1 from './pages/EventPage1/EventPage1';
import EventPage2 from './pages/EventPage2/EventPage2';
import EventPage3 from './pages/EventPage3/EventPage3';
import PolicyAdminPage from './pages/AdminPages/PolicyAdminPage/PolicyAdminPage';
import AboutUsAdminPage from './pages/AdminPages/AboutUsAdminPage/AboutUsAdminPage';
import DropDownEventsAdminPage from './pages/AdminPages/DropDownEventsAdminPage/DropDownEventsAdminPage';
import ResourcesAdminPage from './pages/AdminPages/K12Res-EduAdminPage/ResourcesAdminPage';
import SpotlightAdminPage from './pages/AdminPages/TeacherSpotlightAdminPage/TeacherSpotlightAdminPage';
import TableauDashboardEmbedPage from './pages/TableauEmbedPage/TableauDashboardEmbedPage';
import HomePageAdminPage from './pages/AdminPages/HomePageAdminPage/HomePageAdminPage';
import FooterAdminPage from './pages/AdminPages/FooterAdminPage/FooterAdminpage';
import MarkdownEditor from './pages/MarkdownEditor/MarkdownEditor';
import StatePolicyAdminPage from './pages/AdminPages/PolicyAdminPage/StatePoliciesAdminPage';
import NavigationBarAdminPage from './pages/AdminPages/NavigationBarAdminPage/NavigationBarAdminPage';
import TemplateAdminPage from './Docs/TemplateAdminPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AppProviders>
        <Header />
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about1" element={<About />} /> */}
          <Route path="/about" element={<About1 />} />
          <Route path="/educators" element={<Educators />} />
          <Route path="/summerOfCS" element={<SummerOfCS />} />
          <Route path="/winterOfCS" element={<WinterOfCS />} />
          <Route path="/researchAndPolicy" element={<ResearchAndPolicy />} />
          <Route path="/PolicyAdminPage" element={<PolicyAdminPage />} />
          <Route path="/EventsAdminPage" element={<EventsAdminPage />} />
          <Route path="/pdfPage" element={<PdfPage />} />
          <Route path="/news" element={<NewsAndFeaturesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/spotlight" element={<SpotlightPage />} />
          <Route path="/TableauDashboardEmbed" element={<TableauDashboardEmbedPage />} />
          <Route path="/MarkdownEditor" element={<MarkdownEditor />} />
          {/* <Route path="/policy" element={<Policy />} /> */}
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/NewsAdminPage" element={<NewsAdminPage />} />
          <Route path="/BannerAdminPage" element={<BannerAdminPage />} />
          <Route path="/MajorEventsAdminPage" element={<MajorEventsAdminPage />} />
          <Route path="/ECS_Huddle" element={<EcsHuddlePage />} />
          <Route path="/EventPage1" element={<EventPage1 />} />
          <Route path="/EventPage2" element={<EventPage2 />} />
          <Route path="/EventPage3" element={<EventPage3 />} />
          <Route path="/AboutUsAdminPage" element={<AboutUsAdminPage />} />
          <Route path="/DropDownEventsAdminPage" element={<DropDownEventsAdminPage />} />
          <Route path="/ResourcesAdminPage" element={<ResourcesAdminPage />} />
          <Route path="/SpotlightAdminPage" element={<SpotlightAdminPage />} />
          <Route path="/HomePageAdminPage" element={<HomePageAdminPage />} />
          <Route path="/FooterAdminPage" element={<FooterAdminPage />} />
          <Route path="/StatePolicyAdminPage" element={<StatePolicyAdminPage />} />
          <Route path="/NavigationBarAdminPage" element={<NavigationBarAdminPage />} />
          <Route path="/TemplateAdminPage" element={<TemplateAdminPage />} />
        </Routes>
        <Footer />
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>,
);