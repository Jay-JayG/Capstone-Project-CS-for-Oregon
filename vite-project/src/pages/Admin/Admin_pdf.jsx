import { useState, useEffect } from 'react';
import axios from 'axios';
import './admin_pdf.css';

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
    const [showTextEdit, setTextEdit] = useState(0);
    const [showAbstractEdit, setAbstractEdit] = useState(0);
    const [showFirstPageEdit, setFirstPageEdit] = useState(0);
    const [showPdfFileEdit, setPdfFileEdit] = useState(0);

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

    const displayEditField = (field_name) => {
        if (field_name === "title") {
            setTextEdit(1);
        }
        if (field_name === "abstract") {
            setAbstractEdit(1);
        }
        if (field_name === "firstPage") {
            setFirstPageEdit(1);
        }
        if (field_name === "pdfFile") {
            setPdfFileEdit(1);
        }
    }

    const submitEditField = (field_name) => {
        if (field_name === "title") {
            setTextEdit(0);
        }
        if (field_name === "abstract") {
            setAbstractEdit(0);
        }
        if (field_name === "firstPage") {
            setFirstPageEdit(0);
        }
        if (field_name === "pdfFile") {
            setPdfFileEdit(0);
        }
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

    const handleUpdate = async (event, fieldId, field_name) => {
        event.preventDefault();
        try {
            const formDataToSend = new FormData();

            // Add the fileId to identify which record to update
            formDataToSend.append('fileId', fieldId);

            // Conditionally add fields to the FormData object if they are present
            if (formData.fileName) {
                formDataToSend.append('fileName', formData.fileName);
            }
            if (formData.studyTitle) {
                formDataToSend.append('studyTitle', formData.studyTitle);
            }
            if (formData.abstract) {
                formDataToSend.append('abstract', formData.abstract);
            }
            if (formData.firstPage) {
                formDataToSend.append('firstPage', formData.firstPage);
            }
            if (formData.pdfFile) {
                formDataToSend.append('pdfFile', formData.pdfFile);
            }

            // Send the update request to the server
            const response = await axios.post("http://localhost/pdf_update.php", formDataToSend);
            console.log(response.data);
        } catch (error) {
            console.log('Error updating object', error);
        }
        fetchData();
        submitEditField(field_name);
    };

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
                        <div className={`research-page-container-admin ${index % 2 === 0 ? 'even' : 'odd'}`} key={index}>
                            <div>
                                <button onClick={() => deletePdf(pdfFile.id)}>
                                    Delete Entry
                                </button>
                            </div>
                            <div className='research-page-container-admin-container'>
                                <div className="right-text">
                                    <div className="research-paper-text">
                                        <div className="paper-title">{pdfFile.study_title}</div>
                                        {showTextEdit === 1 && (
                                            <form onSubmit={(event) => handleUpdate(event, pdfFile.id, "title")}>
                                                <input
                                                    type="text"
                                                    name="studyTitle"
                                                    value={formData.studyTitle}
                                                    onChange={e => setFormData({ ...formData, studyTitle: e.target.value })}
                                                />
                                                <button type="submit">Update</button>
                                            </form>
                                        )}
                                        {showTextEdit === 0 ? (
                                            <div>
                                                <button onClick={() => displayEditField("title")}>
                                                    Edit Title
                                                </button>
                                            </div>) : null}


                                        <div className="paper-abstract">{pdfFile.abstract}</div>
                                        {showAbstractEdit === 1 && (
                                            <form onSubmit={(event) => handleUpdate(event, pdfFile.id, "abstract")}>
                                                <input
                                                    type="text"
                                                    name="abstract"
                                                    value={formData.abstract}
                                                    onChange={e => setFormData({ ...formData, abstract: e.target.value })}
                                                />
                                                <button type="submit">Update</button>
                                            </form>
                                        )}
                                        {showAbstractEdit === 0 ? (
                                            <div>
                                                <button onClick={() => displayEditField("abstract")}>
                                                    Edit Abstract
                                                </button>
                                            </div>) : null}


                                        <button onClick={() => getPdfDownloadLink(pdfFile.id, pdfFile.file_name)}>
                                            Download: {pdfFile.file_name}
                                        </button>
                                        {showPdfFileEdit === 1 && (
                                            <form onSubmit={(event) => handleUpdate(event, pdfFile.id, "pdfFile")}>
                                                <input
                                                    type="file"
                                                    name="pdfFile"
                                                    onChange={handleChange}
                                                    accept=".pdf"
                                                />
                                                <button type="submit">Update</button>
                                            </form>
                                        )}
                                        {showPdfFileEdit === 0 ? (
                                            <div>
                                                <button onClick={() => displayEditField("pdfFile")}>
                                                    Edit Download File
                                                </button>
                                            </div>) : null}
                                    </div>
                                </div>
                                <div className="research-paper-card-container">
                                    <div className='research-paper-card-background'>
                                        {pdfImage[index] && (
                                            <img src={`data:image/jpeg;base64,${pdfImage[index]}`} alt="Example" className='pdf-image-1' />
                                        )}
                                        {showFirstPageEdit === 1 && (
                                            <form onSubmit={(event) => handleUpdate(event, pdfFile.id, "firstPage")}>
                                                <input
                                                    type="file"
                                                    name="firstPage"
                                                    onChange={handleChange}
                                                    accept=".jpg"
                                                />
                                                <button type="submit">Update</button>
                                            </form>
                                        )}
                                        {showFirstPageEdit === 0 ? (
                                            <div>
                                                <button onClick={() => displayEditField("firstPage")}>
                                                    Edit First Page
                                                </button>
                                            </div>) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            </div >
        </div >
    );
}