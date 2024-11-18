import { useContext } from 'react';
import './Header.css';
import { BannerContext } from './BannerContext';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Header() {

    const { bannerData, globalData } = useContext(BannerContext);
    console.log(globalData);
    return (

        <>
            {globalData?.show_banner === "1" && bannerData.banner_text && (
                <header className="header">
                    <h1>
                        {bannerData.banner_text}
                        <a href={bannerData.banner_link} className="HeaderLink">
                            {bannerData.banner_link_text}
                        </a>
                    </h1>
                </header>
            )}
        </>
    );
}

export default Header;