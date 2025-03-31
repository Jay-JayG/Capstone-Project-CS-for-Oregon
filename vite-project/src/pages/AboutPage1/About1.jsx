import AboutBoxes from "./AboutBoxes1.jsx";
import WebsiteDevelopers from "./WebsiteDevelopers1.jsx";
import './About.css';
import Carousel from './SpotlightCarousel.jsx';
import jack from '/src/assets/headshot.webp';
import joel from '/src/assets/headshotjoel.jpg';
import anna from '/src/assets/headshotanna.webp';
import testImage from '/src/assets/SIPsandEnvisionShoreline.webp';

const slides = [
  {
    image: testImage,
    text: "This is the testImage's description or text content"
  },
  {
    image: jack,
    text: "This is Jack's description or text content"
  },
  {
    image: joel,
    text: "This is Joel's description or text content"
  },
  {
    image: anna,
    text: "This is Anna's description or text content"
  }
];

function About1() {
  return (
    <div id="main-content">

      <div>
        <Carousel slides={slides} />
      </div>

      <div className="AboutSectionBackRound">
        <div className='AboutSectionBox'>
          <p className="AboutSectionHeader"> Our Mission</p>
          <div className="AboutSectionText">
            CS for Oregon is a coalition of K12 educators and state educational leaders who believe that research, data and classroom experience are critical in ensuring that all Oregon students engage with high-quality CS education.<br /><br />
            We advocate for long-term systemic change that is sustainable and scalable to ensure that all educators across our state are equipped to teach CS.
          </div>
        </div>
      </div>

      <div>
        <div className='OurValuesBox'>
          <p className="AboutSectionHeader"> Our Values</p>
          <ul className='OurValuesText'>
            <li><span className="OurValuesHeader"> Inclusive:</span> We prioritize the meaningful inclusion of diverse perspectives to design learning experiences that embrace those historically marginalized in computing.</li>
            <li><span className="OurValuesHeader"> Community-oriented:</span> We create collaborative spaces for community and cultivate relationships to form authentic partnerships.</li>
            <li><span className="OurValuesHeader"> Evidence-based:</span> We conduct research for and with educators to inform action.</li>
            <li><span className="OurValuesHeader"> Impactful:</span> We drive systems-level change by advocating for policies and practices that support inclusive computing education.</li>
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

export default About1;