import './Policy.css';
import PolicySection from './PolicySection';
import ExampleDownload from './exampledownload.webp';


function Policy() {
    return (
    <div id="main-content">
        <div className={'Background'}>
            <div className={'TopPageBox'}>
            <p className="PolicyHeader"> Oregon Policy</p>
                <div className={'TopPageText'}> Text area about research and how important it is to helping CS education in Oregon</div>
                <br /> 
                
            </div>
            
        </div>
        <div className={'Background2'}>
            <PolicySection
                headerText="Distributed debugging with electronic textiles:
                understanding high school student pairs’ problem solving strategies, practices, and perspectives on
                repairing physical computing projects"
                footerText="Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! "
                imageSrc= {ExampleDownload}
                imageAlt="Image"
            />
        </div>
        <div className={'Background'}>
            <PolicySection
                headerText="Evidence-Based Affordances of E-textiles
                in Exploring Computer Science"
                footerText="Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! "
                imageSrc= {ExampleDownload}
                imageAlt="Image"
            />
        </div>
        <div className={'Background2'}>
            <PolicySection
                headerText="Understanding growth mindset practices in an
                introductory physical computing classroom: high school students’ engagement with debugging by
                design activities"
                footerText="Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! "
                imageSrc= {ExampleDownload}
                imageAlt="Image"
            />
        </div>
        <div className={'Background'}>
            <PolicySection
                headerText="Computational thinking in a bilingual kindergarten
                classroom: Emergent ideas for teaching across content
               areas"
                footerText="Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! "
                imageSrc= {ExampleDownload}
                imageAlt="Image"
            />
        </div>
    </div>
    );
  }
  
  export default Policy;