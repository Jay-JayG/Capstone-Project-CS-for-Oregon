import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin_pdf() {
    const [formData, setFormData] = useState({
        fileName: '',
        studyTitle: '',
        abstract: '',
        firstPage: null,
        pdfFile: null
    });
    const [pdfFiles, setPdfFiles] = useState([]);
    const [pdfBlob, setPdfBlob] = useState([]);
    const [pdfImage, setImage] = useState([]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value
        }));
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/get_pdf_metadata.php'); // For Local Development
            console.log(response.data);
            setPdfFiles(response.data);
        } catch (error) {
            console.error("Error fetching download links:", error);
        }
        try {
            const imageResponse = await axios.get('http://localhost/download_pdf_images.php');
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
            const response = await axios.get(`http://localhost/download_pdf.php?id=${id}`, { responseType: 'blob' }); // For local Development
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

    const deletePdf = async (id) => {
        try {
            const response = await axios.delete(`http://localhost/pdf_upload.php?id=${id}`); // For local Development
            console.log(response.data);
        } catch (error) {
            console.log('Error posting object', error);
        }
        fetchData();
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('fileName', formData.fileName);
            formDataToSend.append('studyTitle', formData.studyTitle);
            formDataToSend.append('abstract', formData.abstract);
            formDataToSend.append('firstPage', formData.firstPage);
            formDataToSend.append('pdfFile', formData.pdfFile);
            //const response = await axios.post('/api/pdf_upload', formDataToSend);
            const response = await axios.post("http://localhost/pdf_upload.php", formDataToSend);
            console.log(response.data);
        } catch (error) {
            console.log('Error posting object', error);
        }
    }

    return (
        <div>
            <h2>Upload PDF File</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fileName">File Name:</label>
                <input
                    type="text"
                    id="fileName"
                    name="fileName"
                    value={formData.fileName}
                    onChange={handleChange}
                />
                <label htmlFor="studyTitle">Study Title:</label>
                <input
                    type="text"
                    id="studyTitle"
                    name="studyTitle"
                    value={formData.studyTitle}
                    onChange={handleChange}
                />
                <label htmlFor="abstract">Abstract Content:</label>
                <input
                    type="text"
                    id="abstract"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                />
                <label htmlFor="firstPage">JPG Image of first page of pdf file (use online converter if needed) </label>
                <input
                    type="file"
                    id="firstPage"
                    name="firstPage"
                    onChange={handleChange}
                    accept=".jpg"
                />
                <label htmlFor="pdfFile">Choose a PDF file: </label>
                <input
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    onChange={handleChange}
                    accept=".pdf"
                />
                <button type="submit">Upload PDF</button>
            </form>
            <div>
                <ul>
                    {pdfFiles && pdfFiles.map((pdfFile, index) => (
                        <div className={`research-page-container ${index % 2 === 0 ? 'even' : 'odd'}`} key={index}>
                            <div className="right-text">
                                <div className="research-paper-text">
                                    <div className="paper-title">{pdfFile.study_title}</div>
                                    <div className="paper-abstract">{pdfFile.abstract}</div>
                                    <button onClick={() => getPdfDownloadLink(pdfFile.id, pdfFile.file_name)}>
                                        Download: {pdfFile.file_name}
                                    </button>
                                    <button onClick={() => deletePdf(pdfFile.id)}>
                                        Delete Entry
                                    </button>
                                </div>
                            </div>
                            <div className="research-paper-card-container">
                                <div className='research-paper-card-background'>
                                    {pdfImage[index] && (
                                        <img src={`data:image/jpeg;base64,${pdfImage[index]}`} alt="Example" className='pdf-image-1' />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                </ul>
            </div>
        </div>
    );
}