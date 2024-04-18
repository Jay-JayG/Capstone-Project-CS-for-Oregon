//import PdfViewer from './PdfViewer';
import './ResearchPage.css';
import pdfFile from '../../../src/assets/Distributed debugging.pdf';
import pdfFile1 from '../../../src/assets/Distributed debugging-1.png';


export default function researchPage() {

    return (
        <div>
            {/* <div className="research-page-container ">
                <div className="right-text">
                    <div className="research-paper-text">
                        <div className="paper-title">Distributed debugging with electronic textiles: understanding high school student pai' problem solving strategies, practices, and perspectives on repairing physical computing projects</div>
                        <div className="paper-abstract">Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! </div>
                    </div>
                </div>
                <div className="research-paper-card-container">
                    <div className='research-paper-card-background'>
                        <div className='paper-pdf-image'>
                            <PdfViewer pdfFile={pdfFile} />
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="research-page-container ">
                <div className="right-text">
                    <div className="research-paper-text">
                        <div className="paper-title">Distributed debugging with electronic textiles: understanding high school student pai' problem solving strategies, practices, and perspectives on repairing physical computing projects</div>
                        <div className="paper-abstract">Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! </div>
                    </div>
                </div>
                <div className="research-paper-card-container">
                    <div className='research-paper-card-background'>
                    <img src={pdfFile1} alt="Example" className='pdf-image-1'/>
                    <div className='pdf-download'>Download {'>'}</div>
                    </div>
                </div>
            </div>
            <div className="research-page-container ">
                <div className="right-text">
                    <div className="research-paper-text">
                        <div className="paper-title">Distributed debugging with electronic textiles: understanding high school student pai' problem solving strategies, practices, and perspectives on repairing physical computing projects</div>
                        <div className="paper-abstract">Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! Here is info about this research paper, this is filler text! This paper is really cool and snazzy and cool! </div>
                    </div>
                </div>
                <div className="research-paper-card-container">
                    <div className='research-paper-card-background'>
                    <img src={pdfFile1} alt="Example" className='pdf-image-1'/>
                    <div className='pdf-download'>Download {'>'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}