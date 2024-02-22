import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Home from './pages/newHomePage/NewHome';
import About from './pages/aboutPage/About';
import Educators from './pages/educatorsPage/Educators';
import SummerOfCS from './pages/SummerOfCS/SummerOfCS';
import ResearchAndPolicy from './pages/ResearchAndPolicyPage/ResearchAndPolicy';
import AdminPage from './pages/Admin/Admin';
import NewsAndFeaturesPage from './pages/NewsAndFeatures/NewsAndFeatures';
//import './styles.css';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="Educators" element={<Educators />} />
    <Route path="SummerOfCS/" element={<SummerOfCS />} />
    <Route path="ResearchAndPolicy" element={<ResearchAndPolicy />} />
    <Route path="AdminPage" element={<AdminPage />} />
    <Route path="News" element={<NewsAndFeaturesPage />} />
  </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);