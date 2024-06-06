import './ResearchPage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function researchPage() {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [pdfBlob, setPdfBlob] = useState(null);
    const [pdfImage, setImage] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}get_pdf_metadata.php`);
            console.log(response.data);
            setPdfFiles(response.data);
        } catch (error) {
            console.error("Error fetching download links:", error);
        }
        try {
            const imageResponse = await axios.get(`${apiBaseUrl}pdf_images.php`);
            console.log(imageResponse.data);
            setImage(imageResponse.data);
        } catch (error) {
            console.error("Error fetching pdf images:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getPdfDownloadLink = async (id, file_name) => {
        try {
            const response = await axios.get(`${apiBaseUrl}download_pdf.php?id=${id}`, { responseType: 'blob' });
            //const response = await axios.get(`http://localhost/download_pdf.php?id=${id}`, { responseType: 'blob' }); // For local Development
            setPdfBlob(response.data);
            // Create a temporary anchor element and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${file_name}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error retrieving download link", error);
        }
    }

    // Sorting pdfFiles
    // Step 1: Combine pdfFiles and pdfImage into a single array
    const combinedArray = pdfFiles.map((pdfFile, index) => ({
        ...pdfFile,
        pdfImage: pdfImage[index]
    }));

    // Step 2: Sort the combined array
    const sortedCombinedArray = combinedArray.slice().sort((a, b) => {
        const parseDate = (dateStr) => {
            if (!dateStr) return new Date(0); // Treat empty dates as the earliest date possible
            const parts = dateStr.split('/');
            if (parts.length !== 3) return new Date(0); // Treat invalid dates as the earliest date possible
            return new Date(parts.reverse().join('-'));
        };

        const dateA = parseDate(a.publicationDate);
        const dateB = parseDate(b.publicationDate);
        return dateB - dateA;
    });

    // Step 3: Extract sorted pdfFiles and pdfImage back from the sorted combined array
    const sortedPdfFiles = sortedCombinedArray.map(item => {
        const { pdfImage, ...pdfFile } = item;
        return pdfFile;
    });

    const sortedPdfImage = sortedCombinedArray.map(item => item.pdfImage);

    return (
        <div>
            <div>
                    {sortedPdfFiles.length > 0 && sortedPdfFiles.map((pdfFile, index) => (
                        <div className={`research-page-container ${index % 2 === 0 ? 'even' : 'odd'}`} key={index}>
                            <div className="right-text">
                                <div className="research-paper-text">
                                    <div className="paper-title">{pdfFile.study_title}</div>
                                    <div className="paper-abstract">{pdfFile.abstract}</div>
                                </div>
                            </div>
                            <div className="research-paper-card-container">
                                <div className='research-paper-card-background'>
                                    {pdfImage[index] && (
                                        <img src={`data:image/jpeg;base64,${sortedPdfImage[index]}`} alt="Example" className='pdf-image-1' />
                                    )}
                                    <button className="pdf-download" onClick={() => getPdfDownloadLink(pdfFile.id, pdfFile.file_name)}>
                                        Download {'>'}{/*  {pdfFile.file_name} */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

