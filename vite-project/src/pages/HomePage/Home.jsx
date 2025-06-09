import BannerSection from './BannerSection';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import './Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useProfiles } from '../../ProfileContext';
import { useSpotlights } from '../../SpotlightContext';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


const Home = () => {

  // About Page Content Preloading
  const { profiles, setProfiles } = useProfiles();
  const { spotlights, setSpotlights } = useSpotlights();
  const [homePageData, setHomePageData] = useState();

  const getHomePageData = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}homepage.php`);
      setHomePageData(res.data);
      console.log(homePageData);
    } catch (error) {
      console.error("Error fetching Home Page data:", error);
    }
  };

  useEffect(() => {
    getHomePageData();
    console.log(homePageData, "Home page data");
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!profiles) {
        const res = await axios.get(`${apiBaseUrl}about_us.php`);
        setProfiles(res.data);
      }
    };
    fetchProfiles();
  }, [profiles, setProfiles]);

  useEffect(() => {
    const getSpotlights = async () => {
      if (!profiles) {
        try {
          const response = await axios.get(`${apiBaseUrl}spotlight.php`);
          setSpotlights(response.data);
        } catch (error) {
          console.error("Error fetching spotlight dropdowns:", error);
        }
      }
    };
    getSpotlights();
  }, [spotlights, setSpotlights]);

  // About Page Content Preloading End


  return (
    <div>
      <div id="main-content">
        {homePageData && <>
          <BannerSection data={homePageData} />
          <Section1 data={homePageData} />
          <Section2 data={homePageData} />
          <Section3 data={homePageData} />
        </>}
      </div>
    </div>
  );

};

export default Home;