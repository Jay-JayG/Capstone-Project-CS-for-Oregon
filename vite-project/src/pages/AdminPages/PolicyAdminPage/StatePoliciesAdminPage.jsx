import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import Card from '../../ResearchAndPolicyPage/checkbox'
import "../../ResearchAndPolicyPage/ResearchAndPolicy.css"
import Check from '/src/assets/Check.webp';
import X from '/src/assets/Xmark.webp';
import idkwtf from '/src/assets/idkwtf.webp';
import background from '/src/assets/greentored.webp';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Modal = React.memo(({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <button className="modal-close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
});

export default function StatePolicyAdminPage() {


    function getMarkIcon(implementation) {
        switch (implementation) {
            case "1":
                return <img src={Check} alt="Check mark" className="MarkIconCheck" />;
            case "2":
                return <img src={idkwtf} alt="idk mark" className="MarkIconIdk" />;
            case "3":
                return <img src={X} alt="X mark" className="MarkIconX" />;
            default:
                return null; // Or a fallback icon/message
        }
    }

    const [Policies, setPolicies] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Edit policy box open/close variable

    const [newPolicy, setNewPolicy] = useState({
        title: '',
        text: '',
        implementation: 1
    });

    const [editPolicy, setEditPolicy] = useState({
        title: '',
        text: '',
        implementation: 1
    });

    const getStatePolicies = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}state_policies.php?timestamp=${new Date().getTime()}`);
            console.log('Retrieved:', res.data);
            setPolicies(res.data);
        } catch (error) {
            console.error('Error retrieving state policies:', error);
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}state_policies.php`, newPolicy);
            console.log('Uploaded:', res.data);
            setNewPolicy({ title: '', text: '', implementation: '' });
            getStatePolicies();  // Refresh profiles after upload
            setStatusMessage("Submitted successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`${apiBaseUrl}state_policies.php`, editPolicy);
            console.log('Uploaded:', res.data);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
            setEditPolicy({ title: '', text: '', implementation: 1 });
            setIsModalOpen(false);
            getStatePolicies();
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditPolicy({ title: '', text: '', implementation: 1 });
    };

    const handleEdit = (item) => {
        setEditPolicy(item);
        setIsModalOpen(true);
    };



    useEffect(() => {
        getStatePolicies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, "name", value, "value");
        if (name === "title") {
            setNewPolicy(prev => ({
                ...prev,
                [name]: value
            }));
        } else if (name === "text") {
            setNewPolicy(prev => ({
                ...prev,
                [name]: value
            }));
        } else if (name === "implementation") {
            setNewPolicy(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditPolicy(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleDelete = async (id) => {
        console.log("id", id);
        const userConfirmed = window.confirm("Are you sure you want to delete this Policy?");
        if (!userConfirmed) {
            return; // Exit if the user cancels
        }
        try {
            const res = await axios.delete(`${apiBaseUrl}state_policies.php?id=${id}`);
            if (res.status === 200) {
                // Update local state immediately to remove the item
                setPolicies(prevPolicies => prevPolicies.filter(Policies => Policies.id !== id));
            } else {
                console.error(`Failed to delete the Policies. Status code: ${res.status}`);
            }
        } catch (error) {
            console.log(`Error deleting Policies ${id}:`, error);
        }
    }

    return (



        <div className='AdminPageContainer'>
            <Link to="/admin" className="admin-home-button">
                Go Back
            </Link>

            <div className='AdminPageFormContainer'>
                <form onSubmit={handleSubmit} className="major-events-form">
                    <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    Policy Title:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="title"
                            value={newPolicy.title}
                            onChange={handleChange}
                            required
                            rows={2}
                            cols={100}
                        />
                    </label>
                    Policy Text:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="text"
                            value={newPolicy.text}
                            onChange={handleChange}
                            required
                            rows={2}
                            cols={100}
                        />
                    </label>
                    implementation Status:
                    <label>
                        <select
                            className='major-events-form-field'
                            name="implementation"
                            value={newPolicy.implementation}
                            onChange={handleChange}
                            required
                        >
                            <option value={1}>Implemented</option>
                            <option value={2}>In Progress</option>
                            <option value={3}>Not Implemented</option>
                        </select>
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>
            </div>

            <div className="CardsContainer">
                {Policies.length > 0 && Array.isArray(Policies) ? (
                    Policies.map((policy) => (<div key={policy.id}>
                        <Card

                            header={policy.title}
                            content={
                                <>
                                    {policy.text}
                                </>
                            }
                            mark={
                                <div className="MarkContainer">
                                    <img src={background} alt="position" className="MarkBackground" />
                                    {getMarkIcon(policy.implementation)}
                                </div>
                            }
                        />
                        <br />
                        <button onClick={() => handleDelete(policy.id)}>Delete</button>
                        <button onClick={() => handleEdit(policy)}>Edit</button>
                    </div>
                    ))) : (<p>No Resources available.</p>)}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {editPolicy && (
                    <div className='modal-container'>
                        <h2>Edit Profile</h2>
                        <Card
                            key={editPolicy.id}
                            header={editPolicy.title}
                            content={
                                <>
                                    {editPolicy.text}
                                </>
                            }
                            mark={
                                <div className="MarkContainer">
                                    <img src={background} alt="position" className="MarkBackground" />
                                    {getMarkIcon(editPolicy.implementation)}
                                </div>
                            }
                        />
                    </div>
                )}
                <form onSubmit={handleEditSubmit} className="major-events-form">
                    <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    Policy Title:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="title"
                            value={editPolicy.title}
                            onChange={handleEditChange}
                            required
                            rows={2}
                            cols={100}
                        />
                    </label>
                    Policy Text:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="text"
                            value={editPolicy.text}
                            onChange={handleEditChange}
                            required
                            rows={2}
                            cols={100}
                        />
                    </label>
                    implementation Status:
                    <label>
                        <select
                            className='major-events-form-field'
                            name="implementation"
                            value={editPolicy.implementation}
                            onChange={handleEditChange}
                            required
                        >
                            <option value={1}>Implemented</option>
                            <option value={2}>In Progress</option>
                            <option value={3}>Not Implemented</option>
                        </select>
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>
            </Modal >
        </div>

    );
}