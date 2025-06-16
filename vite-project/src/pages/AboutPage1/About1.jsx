import AboutBoxes from "./AboutBoxes.jsx";
import WebsiteDevelopers from "./WebsiteDevelopers1.jsx";
import './About.css';
import './SpotlightCarousel.css'
import jack from '/src/assets/headshot.webp';
import joel from '/src/assets/headshotjoel.jpg';
import anna from '/src/assets/headshotanna.webp';
import testImage from '/src/assets/SIPsandEnvisionShoreline.webp';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import React from 'react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import { SpotlightPopupWindow } from "../AdminPages/TeacherSpotlightAdminPage/SpotlightPopupWindow.jsx";
import { useSpotlights } from '../../SpotlightContext.jsx';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function About() {

  const { spotlights, setSpotlights } = useSpotlights([]);


  // About Us Page text variables and functions

  const [ourMissionText, setOurMissionText] = useState("");
  const [ourValuesText, setOurValuesText] = useState("");


  useEffect(() => {
    const getSpotlights = async () => {
      if (!spotlights) {
        try {
          const response = await axios.get(`${apiBaseUrl}spotlight.php`);
          setSpotlights(response.data);
        } catch (error) {
          console.error("Error fetching spotlight dropdowns:", error);
        }
      }
    };
    const getAboutUsText = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}about_us_our_mission.php?timestamp=${new Date().getTime()}`);
        console.log(response.data);
        setOurMissionText(response.data.our_mission);
        setOurValuesText(response.data.our_values);
      } catch (error) {
        console.log('Error retrieving about us text', error.response?.data || error.message)
      }
    }
    getAboutUsText();
    getSpotlights();
  }, [spotlights, setSpotlights]);

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [currentSlideId, setCurrentSlideId] = useState('');

  const OpenSpotlightWindow = (id) => {
    setIsDialogVisible(true);
    setCurrentSlideId(id);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };



  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={className} >
        <AiOutlineArrowRight className="arrows" style={{ color: "white" }} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick} className={className} >
        <AiOutlineArrowLeft className="arrows" style={{ color: "white" }} />
      </div>
    );
  }

  const SimpleSlider = () => {

    var settings = {
      dots: true,
      infinite: true,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      centerPadding: '1000px',
      className: "inner-slide",
      pauseOnHover: true,
      nextArrow: <SampleNextArrow to="next" />,
      prevArrow: <SamplePrevArrow to="prev" />,
      // autoplay: true,
      speed: 2000,
      autoplaySpeed: 10000,
      cssEase: "linear"
    };

    return (
      <div className="slider-outer-container">
        <Slider {...settings} >
          {spotlights && spotlights.length > 0 && Array.isArray(spotlights) ? (spotlights.map((slide) => (
            <div key={slide.id} >
              <div className="slider-container">
                <img src={`data:image/jpeg;base64,${slide.image}`} alt={slide.title} className="slider-image" />
                <div className="slide-content-container">
                  <div className="slide-title" ><ReactMarkdown rehypePlugins={[rehypeRaw]}>{slide.title}</ReactMarkdown></div>
                  <button onClick={() => { OpenSpotlightWindow(slide.id) }} className="spotlight-button">Click Here To Read Their Teacher Profile</button>
                </div>
              </div>
            </div>
          ))) : (<p>Loading Spotlights.</p>)}
        </Slider>
      </div>
    );
  }

  return (
    <div id="main-content">

      <div >
        <SimpleSlider />
      </div>

      <div>{isDialogVisible && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeDialog} className='admin-edit-button'>Close</button>
            <SpotlightPopupWindow event={currentSlideId} />
          </div>
        </div>
      )}</div>

      <div className="AboutSectionBackRound">
        <div className='AboutSectionBox'>
          <p className="AboutSectionHeader"> Our Mission</p>
          <div className="AboutSectionText">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer">
                    {props.children}
                  </a>
                ),
              }}
            >
              {ourMissionText}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div>
        <div className='OurValuesBox'>
          <p className="AboutSectionHeader"> Our Values</p>
          <ul className='OurValuesText'>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer">
                    {props.children}
                  </a>
                ),
              }}
            >
              {ourValuesText}
            </ReactMarkdown>
          </ul>
        </div>
      </div>

      <div>
        <p className="AboutSectionHeader"> Who We Are</p>
        <AboutBoxes />
      </div>

      <div>
        <p className="AboutSectionHeader"> Website Developers</p>
        <WebsiteDevelopers />
      </div>



    </div>
  );
};

export default About;