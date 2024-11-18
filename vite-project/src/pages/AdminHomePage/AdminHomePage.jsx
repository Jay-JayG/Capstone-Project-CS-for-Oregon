import './AdminHomePage.css';
import { Link } from "react-router-dom";
export default function AdminHomePage() {
    return (
        <div className='admin-home-page-container'>
            <div className='links-container'>
                <Link to={`/EventsAdminPage`} className='link-to-page'>Event Card</Link>
                <Link to={`/pdfPage`} className='link-to-page'>PDF Research Paper</Link>
                <Link to={`/NewsAdminPage`} className='link-to-page'>News</Link>
                <Link to={`/BannerAdminPage`} className='link-to-page'>Banner</Link>
                <Link to={`/MajorEventsAdminPage`} className='link-to-page'>Event Page</Link>
            </div>
        </div>
    );
}