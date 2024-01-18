

function About() {
    return (
      <>
      <div className="AboutSectionBackRound">
        <div className='AboutSectionBox'> 
        <p className="AboutSectionHeader"> Our Mission</p>
        <div className="AboutSectionText"> 
          CS for Oregon is a coalition of K12 educators, nonprofit organizations, higher education, and industry leaders who believe that research, data and classroom experience are critical in ensuring that all Oregon students engage with high-quality CS education.<br /><br /> 
        </div>
        <div className="AboutSectionText"> 
          We advocate for long-term systemic change that is sustainable and scalable to ensure that all educators across our state are equipped to teach CS.
        </div>
      
        </div>
      </div>

      <div style={{margin: '20px'}}>
        <div className= 'OurValuesBox'>
          <p className="AboutSectionHeader"> Our Values</p>
          <ul class='OurValuesText'>
            <li><span class="OurValuesHeader">• Inclusive:</span> We prioritize the meaningful inclusion of diverse perspectives to design learning experiences that embrace those historically marginalized in computing.</li>
            <li><span class="OurValuesHeader">• Community-oriented:</span> We create collaborative spaces for community and cultivate relationships to form authentic partnerships.</li>
            <li><span class="OurValuesHeader">• Evidence-based:</span> We conduct research for and with educators to inform action.</li>
            <li><span class="OurValuesHeader">• Impactful:</span> We drive systems-level change by advocating for policies and practices that support inclusive computing education.</li>
          </ul>
        </div>
      </div>


      </>
    );
  }
  
  export default About;