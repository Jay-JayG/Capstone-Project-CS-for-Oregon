import "./ResearchAndPolicy.css"
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';


export default function Checkbox({ header, content, mark }) {
    return (

        <div className="Card">
            <div className="innerTextContainer">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer">
                                {props.children}
                            </a>
                        ),
                        p: ({ node, ...props }) => (
                            <div className="CardHeader" {...props} />
                        )
                    }}>
                    {header}
                </ReactMarkdown>
                <div className="BoxContent2">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            a: ({ node, ...props }) => (
                                <a {...props} target="_blank" rel="noopener noreferrer">
                                    {props.children}
                                </a>
                            ),
                            p: ({ node, ...props }) => (
                                <p className="BoxContent2" {...props} />
                            )
                        }}>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
            {mark}
        </div>
    );
}


