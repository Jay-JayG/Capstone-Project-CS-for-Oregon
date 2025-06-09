import React, { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Link } from 'react-router-dom';
import './MarkdownEditor.css';
export default function MarkdownEditor() {

    const textareaRef = useRef(null);
    const [customColor, setCustomColor] = useState('');
    const [text, setText] = useState('');
    const [customFontSize, setCustomFontSize] = useState('3.1vh');

    const applyWrapperFormatting = (openTag, closeTag) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = text.slice(start, end);

        // New text with the selected part wrapped
        const newText =
            text.slice(0, start) +
            openTag + selected + closeTag +
            text.slice(end);

        setText(newText);

        // After formatting, move cursor to cover the selected text again
        setTimeout(() => {
            textarea.setSelectionRange(
                start + openTag.length,
                end + openTag.length
            );
            textarea.focus();
        }, 0);
    };

    const applyLinePrefix = (prefix) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const lines = text.split('\n');

        // Get indexes of affected lines
        let charCount = 0;
        let firstLineIndex = 0;
        let lastLineIndex = 0;

        for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length + 1; // +1 for '\n'

            if (start >= charCount && start < charCount + lineLength) {
                firstLineIndex = i;
            }

            if (end >= charCount && end <= charCount + lineLength) {
                lastLineIndex = i;
                break;
            }

            charCount += lineLength;
        }

        // Modify each line in range
        for (let i = firstLineIndex; i <= lastLineIndex; i++) {
            if (!lines[i].startsWith(prefix)) {
                lines[i] = prefix + lines[i];
            }
        }

        const newText = lines.join('\n');
        setText(newText);

        // Reposition the cursor/selection roughly where it was
        setTimeout(() => {
            textarea.focus();
            // (Optional) recompute new selectionStart and selectionEnd if needed
        }, 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "colors") {
            setCustomColor(value);
        } else if (name === "font") {
            setCustomFontSize(value);
        }

    }

    return (
        <>
            <Link to="/admin" className="admin-home-button">
                Go Back
            </Link>
            <div className='MD-Text-Container'>

                <div className='MD-Editor'>
                    <button onClick={() => applyWrapperFormatting('**', '**')}><span className="md-bold" >Bold</span> **</button>
                    <button onClick={() => applyWrapperFormatting('*', '*')}><span className="md-italic" >Italic</span> *</button>
                    <button onClick={() => applyWrapperFormatting('_', '_')}><span className="md-italic" >Italic</span> _</button>
                    <button onClick={() => applyWrapperFormatting('"', '"')}>"Quotes"</button>
                    <button onClick={() => applyWrapperFormatting('<span style="text-decoration: underline;">', '</span>')} className='md-underline'>
                        Underline Text
                    </button>
                    <button onClick={() => applyLinePrefix('> ')}>Blockquote {`>`}</button>
                    <button onClick={() => applyLinePrefix('# ')}>Heading 1 #</button>
                    <button onClick={() => applyLinePrefix('## ')}>Heading 2 ##</button>
                    <button onClick={() => applyWrapperFormatting('<br>', '')}>Line Break/Wrap {`\<br\>`}</button>

                    <br />

                    <button onClick={() => applyWrapperFormatting('	', '')}>Indent</button>
                    <button onClick={() => applyWrapperFormatting('<span style="color:red">', '</span>')}>
                        Text Color (Red)
                    </button>
                    <button onClick={() => applyWrapperFormatting('<span style="color:blue">', '</span>')}>
                        Text Color (Blue)
                    </button>
                    <button onClick={() => applyWrapperFormatting(`<span style="color:${customColor}">`, '</span>')}>
                        Custom Text Color
                    </button>

                    <br />

                    <button onClick={() => applyWrapperFormatting('<center>', '</center>')}>
                        Align Text Center
                    </button>
                    <button onClick={() => applyWrapperFormatting('<p style="text-align: right;">', '</p>')}>
                        Align Text Right
                    </button>
                    <button onClick={() => applyWrapperFormatting(`<p style="font-size: ${customFontSize}">`, '</p>')}>
                        Font Size:
                    </button>
                    <input
                        value={customFontSize}
                        onChange={handleChange}
                        name="font"
                    />

                    <br />

                    <button onClick={() => applyWrapperFormatting(`<a href="https://!!!LINK GOES HERE!!!" style="color:${customColor}; text-decoration-color:${customColor};">`, '</span>')}>
                        Custom Colored Link HTML (Opens in New Tab)
                    </button>
                    <button onClick={() => applyWrapperFormatting('[', '](place link here)')}>
                        Simple Markdown Link (Opens in New Tab)
                    </button>
                    <br />
                    Custom or CSFO Site Color:
                    <input
                        type="color"
                        list="colors"
                        name="colors"
                        value={customColor}
                        onChange={handleChange}
                        autofocus={true}
                    />
                    <datalist id="colors">
                        <option value="#E8805E">CSFO Orange</option>
                        <option value="#4D6485">CSFO Blue</option>
                        <option value="#008000">CSFO Green</option>
                    </datalist>
                    <br />
                    <textarea
                        ref={textareaRef}
                        rows="10"
                        cols="100"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className='MD-Editor-Preview-Container'>
                    <p className='MD-Editor-Preview-text'>Preview:</p>
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            a: ({ node, ...props }) => (
                                <a {...props} target="_blank" rel="noopener noreferrer">
                                    {props.children}
                                </a>
                            ),
                        }}
                        className="Section1Text"
                    >
                        {text}
                    </ReactMarkdown>
                </div>
            </div>
        </>
    );
}

