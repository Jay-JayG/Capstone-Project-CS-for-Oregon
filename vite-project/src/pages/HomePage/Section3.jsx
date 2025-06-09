import Section3Info from './Section3Info';
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

function Section3({ data }) {
    return (
        <div className='Section3'>
            {/* <Section3Info /> */}

            <div className='Section3Container'>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{
                    a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline" }}>
                            {props.children}
                        </a>
                    ),
                }}
                    className="Section3-text">
                    {data.doe}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default Section3;