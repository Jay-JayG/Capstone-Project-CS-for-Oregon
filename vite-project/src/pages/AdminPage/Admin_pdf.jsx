import { useState, useEffect } from 'react';
import axios from 'axios';
import './admin_pdf.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function Admin_pdf() {
    const [formData, setFormData] = useState({
        fileName: '',
        studyTitle: '',
        abstract: '',
        publicationDate: '',
        firstPage: null,
        pdfFile: null
    });
    const [pdfFiles, setPdfFiles] = useState([]);
    const [pdfBlob, setPdfBlob] = useState([]);
    const [pdfImage, setImage] = useState([]);
    const [showTextEdit, setTextEdit] = useState(0);
    const [showFileNameEdit, setFileNameEdit] = useState(0);
    const [showAbstractEdit, setAbstractEdit] = useState(0);
    const [showFirstPageEdit, setFirstPageEdit] = useState(0);
    const [showPdfFileEdit, setPdfFileEdit] = useState(0);
    const [showPublicationDateEdit, setPublicationDateEdit] = useState(0);
    const fieldSetters = {
        title: setTextEdit,
        abstract: setAbstractEdit,
        publicationDate: setPublicationDateEdit,
        firstPage: setFirstPageEdit,
        pdfFile: setPdfFileEdit,
        fileName: setFileNameEdit
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value
        }));
    };

    const clearFields = () => {
        setFormData({
            fileName: '',
            studyTitle: '',
            abstract: '',
            publicationDate: '',
        });
        document.getElementById('firstPage').value = ''; // Clear the firstPage input
        document.getElementById('pdfFile').value = ''; // Clear the pdfFile input
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}get_pdf_metadata.php`);
            // const response = await axios.get('http://localhost/get_pdf_metadata.php'); // For Local Development
            console.log(response.data);
            setPdfFiles(response.data);
        } catch (error) {
            console.error("Error fetching download links:", error);
        }
        try {
            const imageResponse = await axios.get(`${apiBaseUrl}pdf_images.php`);
            // const imageResponse = await axios.get('http://localhost/pdf_images.php'); // For Local Development
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
            // const response = await axios.get(`http://localhost/download_pdf.php?id=${id}`, { responseType: 'blob' }); // For local Development
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
            const response = await axios.delete(`${apiBaseUrl}pdf_upload.php?id=${id}`);
            // const response = await axios.delete(`http://localhost/pdf_upload.php?id=${id}`); // For local Development
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
        if (field_name === "publicationDate") {
            setPublicationDateEdit(1);
        }
        if (field_name === "firstPage") {
            setFirstPageEdit(1);
        }
        if (field_name === "pdfFile") {
            setPdfFileEdit(1);
        }
        if (field_name === "fileName") {
            setFileNameEdit(1);
        }
    }

    const submitEditField = (field_name) => {
        if (field_name === "title") {
            setTextEdit(0);
        }
        if (field_name === "abstract") {
            setAbstractEdit(0);
        }
        if (field_name === "publicationDate") {
            setPublicationDateEdit(0);
        }
        if (field_name === "firstPage") {
            setFirstPageEdit(0);
        }
        if (field_name === "pdfFile") {
            setPdfFileEdit(0);
        }
        if (field_name === "fileName") {
            setFileNameEdit(0);
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('fileName', formData.fileName);
            formDataToSend.append('studyTitle', formData.studyTitle);
            formDataToSend.append('abstract', formData.abstract);
            formDataToSend.append('publicationDate', formData.publicationDate);
            formDataToSend.append('firstPage', formData.firstPage);
            formDataToSend.append('pdfFile', formData.pdfFile);
            const response = await axios.post(`${apiBaseUrl}pdf_upload.php`, formDataToSend);
            clearFields();
            console.log(response.data);
        } catch (error) {
            console.log('Error posting object', error);
        }
        
        console.log(formData);
        fetchData();
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
            if (formData.publicationDate) {
                formDataToSend.append('publicationDate', formData.publicationDate);
            }
            if (formData.firstPage) {
                formDataToSend.append('firstPage', formData.firstPage);
            }
            if (formData.pdfFile) {
                formDataToSend.append('pdfFile', formData.pdfFile);
            }

            // Send the update request to the server
            const response = await axios.post(`${apiBaseUrl}pdf_update.php`, formDataToSend);
            // const response = await axios.post("http://localhost/pdf_update.php", formDataToSend); // For local development
            console.log(response.data);
            clearFields();
            console.log(formData);
        } catch (error) {
            console.log('Error updating object', error);
        }
        fetchData();
        submitEditField(field_name);
    };

    // Sorted pdfFiles
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

    console.log("Unsorted: ", pdfFiles);
    console.log("Sorted: ", sortedPdfFiles);

    return (
        <div>
            <div className='pdf-admin-submit'>
                <h2 className='pdf-upload-title'>Upload PDF File</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="studyTitle">Study Title:</label>
                        <input
                            type="text"
                            id="studyTitle"
                            name="studyTitle"
                            value={formData.studyTitle}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="abstract">Abstract Content:</label>
                        <input
                            type="text"
                            id="abstract"
                            name="abstract"
                            value={formData.abstract}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="publicationDate">Publication Date:</label>
                        <input
                            type="text"
                            id="publicationDate"
                            name="publicationDate"
                            value={formData.publicationDate}
                            onChange={handleChange}
                            placeholder="DD/MM/YYYY"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstPage">JPG Image of first page of pdf file (use online converter if needed) </label>
                        <input
                            type="file"
                            id="firstPage"
                            name="firstPage"
                            onChange={handleChange}
                            accept=".jpg"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pdfFile">Choose a PDF file: </label>
                        <input
                            type="file"
                            id="pdfFile"
                            name="pdfFile"
                            onChange={handleChange}
                            accept=".pdf"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fileName">File Name When Downloaded:</label>
                        <input
                            type="text"
                            id="fileName"
                            name="fileName"
                            value={formData.fileName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Upload PDF</button>
                    </div>
                </form>
                <div className="form-group">
                    <button onClick={() => clearFields()}>
                        Reset Fields
                    </button>
                </div>
            </div>
            <div>
                <ul>
                    {Array.isArray(sortedPdfFiles) && sortedPdfFiles.length > 0 && sortedPdfFiles.map((pdfFile, index) => (
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
                                            </div>) : (<div>
                                                <button onClick={() => submitEditField("title")}>
                                                    Cancel Edit Title
                                                </button>
                                            </div>)}


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
                                            </div>) : (<div>
                                                <button onClick={() => submitEditField("abstract")}>
                                                    Cancel Edit Abstract
                                                </button>
                                            </div>)}

                                        <div className="publication-date">{pdfFile.publicationDate}</div>
                                        {showPublicationDateEdit === 1 && (
                                            <form onSubmit={(event) => handleUpdate(event, pdfFile.id, "publicationDate")}>
                                                <input
                                                    type="text"
                                                    name="publicationDate"
                                                    value={formData.publicationDate}
                                                    onChange={e => setFormData({ ...formData, publicationDate: e.target.value })}
                                                    placeholder="DD/MM/YYYY"
                                                />
                                                <button type="submit">Update</button>
                                            </form>
                                        )}
                                        {showPublicationDateEdit === 0 ? (
                                            <div>
                                                <button onClick={() => displayEditField("publicationDate")}>
                                                    Edit Publication Date
                                                </button>
                                            </div>) : (<div>
                                                <button onClick={() => submitEditField("publicationDate")}>
                                                    Cancel Edit Publication Date
                                                </button>
                                            </div>)}

                                        <button onClick={() => getPdfDownloadLink(pdfFile.id, pdfFile.file_name)}>
                                            Download: {pdfFile.file_name}
                                        </button>
                                        {showFileNameEdit === 1 && (
                                            <form onSubmit={(event) => handleUpdate(event, pdfFile.id, "fileName")}>
                                                <input
                                                    type="text"
                                                    name="fileName"
                                                    value={formData.fileName}
                                                    onChange={e => setFormData({ ...formData, fileName: e.target.value })}
                                                />
                                                <button type="submit">Update</button>
                                            </form>
                                        )}
                                        {showFileNameEdit === 0 ? (
                                            <div>
                                                <button onClick={() => displayEditField("fileName")}>
                                                    Edit File Name
                                                </button>
                                            </div>) : (<div>
                                                <button onClick={() => submitEditField("fileName")}>
                                                    Cancel Edit File Name
                                                </button>
                                            </div>)}

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
                                            </div>) : (<div>
                                                <button onClick={() => submitEditField("pdfFile")}>
                                                    Cancel Edit Download File
                                                </button>
                                            </div>)}
                                    </div>
                                </div>
                                <div className="research-paper-card-container">
                                    <div className='research-paper-card-background'>
                                        {pdfImage[index] && (
                                            <img src={`data:image/jpeg;base64,${sortedPdfImage[index]}`} alt="Example" className='pdf-image-1' />
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
                                            </div>) : (<div>
                                                <button onClick={() => submitEditField("firstPage")}>
                                                    Cancel Edit First Page
                                                </button>
                                            </div>)}
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