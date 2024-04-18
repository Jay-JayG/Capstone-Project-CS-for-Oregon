import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ pdfFile }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        // Load the PDF document
        const loadingTask = pdfjs.getDocument(pdfFile);
        loadingTask.promise.then((pdf) => {
            setNumPages(pdf.numPages);
        });
    }, [pdfFile]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const calculateWidthPercentage = () => {
        // Calculate the percentage of viewport width you want to use for the PDF viewer
        const viewportWidthPercentage = 80; // Adjust as needed (e.g., 80% of viewport width)
        return `${viewportWidthPercentage}vw`;
    };

    return (
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false} // Disable textLayer
                    renderAnnotationLayer={false}
                    width={100}
                />
            </Document>
    );
};

export default PdfViewer;
