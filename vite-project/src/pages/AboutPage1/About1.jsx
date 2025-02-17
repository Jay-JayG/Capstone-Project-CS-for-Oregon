import AboutBoxes from "./AboutBoxes1.jsx";
import WebsiteDevelopers from "./WebsiteDevelopers1.jsx";
import './About.css';

function About1() {
  return (
    <div id="main-content">
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