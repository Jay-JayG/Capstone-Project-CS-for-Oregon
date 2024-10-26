import './AdminHomePage.css';
import { Link } from "react-router-dom";
export default function AdminHomePage() {
    return (
        <div className='admin-home-page-container'>
            <div className='links-container'>
                <Link to={`/adminPage`} className='link-to-page'>Events</Link>
                <Link to={`/pdfPage`} className='link-to-page'>PDF Research Papers</Link>
                <Link to={`/NewsAdminPage`} className='link-to-page'>News</Link>
                <Link to={`/BannerAdminPage`} className='link-to-page'>Banner</Link>
                <Link to={`/MajorEventsAdminPage`} className='link-to-page'>MajorEventsAdminPage</Link>
            </div>
        </div>
    );
}