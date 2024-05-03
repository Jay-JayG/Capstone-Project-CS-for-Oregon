import { useState } from 'react';
import axios from 'axios';

export default function Admin_pdf() {
    const [formData, setFormData] = useState({
        fileName: '',
        pdfFile: null
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        setFormData({
            ...formData,
            [name]: name === 'pdfFile' ? files[0] : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('fileName', formData.fileName);
            formDataToSend.append('pdfFile', formData.pdfFile);
            ///const response = await axios.post('/api/pdf_upload', formDataToSend);
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
                <label for="pdf_file">Choose a PDF file:</label>
                <label htmlFor="fileName">File Name:</label>
                <input
                    type="text"
                    id="fileName"
                    name="fileName"
                    value={formData.fileName}
                    onChange={handleChange}
                />
                <label htmlFor="pdfFile">Choose a PDF file:</label>
                <input
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    onChange={handleChange}
                    accept=".pdf"
                />
                <button type="submit">Upload PDF</button>
            </form>
        </div>
    );
}