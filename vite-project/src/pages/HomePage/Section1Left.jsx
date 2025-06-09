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

function Section1Left({ data }) {

    return (
        <div className='Section1LeftContext'>
            {/* <h2 className='Section1LeftHeading'> WHY COMPUTER SCIENCE?</h2>
            <p className='Section1LeftText'>We live in a world where computing is ubiquitous. Fundamental knowledge in computer science is needed to be an active and empowered citizen.  Furthermore, today’s big questions are multi-disciplinary and require computational solutions. These big questions require big thinkers who have diverse life experiences and represent all members of society. For the benefit of individuals and society at large, it is essential for computer science education to be equitable and inclusive.</p>
            <p className='Section1LeftText'>CS for Oregon is on a mission to increase access to and participation in high quality, scalable and sustainable computer science education shown to broaden participation in computer science. We want all students to see how computing knowledge can help them thrive in college, careers, and life.</p> */}
            <MarkdownWithClass text={data.heading} className='Section1LeftHeading' />
            <MarkdownWithClass text={data.content} className='Section1LeftText' />
        </div>
    );
};

export default Section1Left;