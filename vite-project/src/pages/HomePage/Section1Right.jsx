import Section1RightSubsection1 from "./Section1RightSubsection1";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const MarkdownWithClass = ({ text, className }) => (
    <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
            p: ({ node, children }) => <p className={className}>{children}</p>,
        }}
    >
        {text}
    </ReactMarkdown>
);
function Section1Right({ data }) {

    return (
        <div className='Section1RightStats'>
            {/* <div className="Section1RightStatsHeadingsContainer">
                <h2 className='Section1RightHeading' >ACCESS VS PARTICIPATION</h2>
                <p className='Section1RightSubHeading' >Oregon has a participation problem in CS education, particularly among girls and students of color.</p>
            </div>
            <Section1RightSubsection1 />
            <div className="Asterisk">*Based on 2021-22 school district data</div> */}
            <div className="Section1RightStatsHeadingsContainer">
                <MarkdownWithClass text={data.heading1} className='Section1RightHeading' />
                <MarkdownWithClass text={data.content1} className='Section1RightSubHeading' />
            </div>
            <div className='Section1RightSubsection1'>
                <MarkdownWithClass text={data.heading2} className="Section1RightSubsection1Heading" />
                <div className="Section1RightSubsection1Container">
                    <div className="LeftPercentContainer">
                        <MarkdownWithClass text={data.largeNumber1} className="LeftPercentNumber" />
                        <MarkdownWithClass text={data.largeNumber1context} className="LeftPercentText" />
                    </div>
                    <div className="RightPercentContainer">
                        <MarkdownWithClass text={data.largeNumber2} className="RightPercentNumber" />
                        <MarkdownWithClass text={data.largeNumber2context} className="RightPercentText" />
                    </div>
                </div>
            </div>
            <MarkdownWithClass text={data.asteriskText} className="Asterisk" />
        </div>
    );
};

export default Section1Right;