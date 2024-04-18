//import PdfViewer from './PdfViewer';
import './ResearchPage.css';
import pdfFile from '../../../src/assets/Distributed debugging.pdf';
import pdfFile1 from '../../../src/assets/Understanding_growth_mindset.png'
import pdfFile2 from '../../../src/assets/Distributed debugging-1.png';
import pdfFile3 from '../../../src/assets/Computational_Thinking_in_a_Bilingual_Kindergarten_Classroom-1.png';
import pdfFile4 from '../../../src/assets/ECS_E-textiles_Curriculum_Research_publication_overview_2022-1.png';



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
                        <div className="paper-title">Understanding growth mindset practices in an introductory
                            physical computing classroom: high school students’
                            engagement with debugging by design activities
                        </div>
                        <div className="paper-abstract">ABSTRACT
                            Background and Context: While debugging is recognized as an

                            essential practice, for many students, encountering bugs can gen-
                            erate emotional responses such as fear and anxiety that can lead to

                            disengagement and the avoidance of computer programming.
                            Growth mindsets can support perseverance and learning in these
                            situations, yet few studies have investigated how growth mindsets

                            emerge in practice amongst K-12 computing students facing phy-
                            sical computing debugging challenges.
                        </div>
                    </div>
                </div>
                <div className="research-paper-card-container">
                    <div className='research-paper-card-background'>
                        <img src={pdfFile1} alt="Example" className='pdf-image-1' />
                        <a className='pdf-download' href='https://drive.usercontent.google.com/download?id=1rCsTC6YgLr-5OHB6atn8oIMDzKcU0FKe&export=download&authuser=0&confirm=t&uuid=d2b9f1f9-8ebb-491d-8314-d936af6b0bc4&at=APZUnTW6Go85UAwk9Wqu_qKn25Pj:1713470044298'>Download {'>'}</a>
                    </div>
                </div>
            </div>
            <div className="research-page-container ">
                <div className="right-text">
                    <div className="research-paper-text">
                        <div className="paper-title">
                            Distributed debugging with electronic textiles:

                            understanding high school student pairs’ problem-solving strategies, practices, and perspectives on

                            repairing physical computing projects
                        </div>
                        <div className="paper-abstract">ABSTRACT

                            Background and Context: Debugging is a challenging yet under-
                            studied practice within recent collaborative K-12 physical comput-
                            ing contexts. We examined think-aloud interviews and reflections

                            of seven high school student pairs who debugged researcher-
                            designed buggy electronic textile projects.
                        </div>
                    </div>
                </div>
                <div className="research-paper-card-container">
                    <div className='research-paper-card-background'>
                        <img src={pdfFile2} alt="Example" className='pdf-image-1' />
                        <div className='pdf-download'>Download {'>'}</div>
                    </div>
                </div>
            </div>
            <div className="research-page-container ">
                <div className="right-text">
                    <div className="research-paper-text">
                        <div className="paper-title">
                            Computational thinking in a bilingual kindergarten
                            classroom: Emergent ideas for teaching across content
                            areas
                        </div>
                        <div className="paper-abstract">
                            Abstract
                            Our study documents how a Spanish-English bilingual elementary teacher learned

                            computational thinking while working to incorporate it into mathematics and lan-
                            guage arts lessons in a bilingual classroom. We classified the elements of the teach-
                            er’s process into two practices: intentional and unintentional use of computational

                            thinking. Intentional use of computational thinking included the teacher’s explicit

                            incorporation of any of the four computational thinking elements (abstraction, al-
                            gorithms, decomposition, and patterns) into her teaching practice. The unintention-
                            al use of computational thinking included those instances where the teacher used

                            computational thinking as a means for teaching content not specifically oriented
                            toward computational thinking. In addition, our work identifies how this bilingual
                            teacher’s instructional dynamics integrated computational thinking and Spanish in a
                            nearly inseparable manner. With this work we intend to contribute to the emergent
                            scholarship committed to understanding the promotion of learning computing in
                            K-5 settings.
                        </div>
                    </div>
                </div>
                <div className="research-paper-card-container">
                    <div className='research-paper-card-background'>
                        <img src={pdfFile3} alt="Example" className='pdf-image-1' />
                        <div className='pdf-download'>Download {'>'}</div>
                    </div>
                </div>
            </div>
            <div className="research-page-container ">
                <div className="right-text">
                    <div className="research-paper-text">
                        <div className="paper-title">
                            Evidence-Based Affordances of E-textiles
                            in Exploring Computer Science
                        </div>
                        <div className="paper-abstract">
                            📕E-Textiles Exploring Computer Science Curriculum
                            Teaching Practices that make the E-textiles Curriculum Successful
                            🐞Debugging & Problem Solving Gains with E-Textiles
                        </div>
                    </div>
                </div>
                <div className="research-paper-card-container">
                    <div className='research-paper-card-background'>
                        <img src={pdfFile4} alt="Example" className='pdf-image-1' />
                        <div className='pdf-download'>Download {'>'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}