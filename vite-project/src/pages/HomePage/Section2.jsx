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

function Section2({ data }) {

    return (
        <div className='Section2'>
            {/* <p className='Section2Quote'>
                “Computer science has so much room for creativity. I learned so much about how I could make my ideas into reality. It taught me how to break things into smaller pieces and then build up to create the bigger picture. I find that really appealing.”
            </p>
            <p className='Section2Attribution'>
                - 12th Grade Student at West Albany High School
            </p> */}
            
            <MarkdownWithClass text={data.quote} className="Section2Quote" />
            <p className="Section2Attribution">
                {data.quoteAttribution}
            </p>
        </div>
    );
};

export default Section2;