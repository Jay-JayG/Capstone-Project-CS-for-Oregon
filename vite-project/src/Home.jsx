import React from 'react';
import BannerImage from './BannerImage.jsx';
import BannerVideo from './BannerVideo.jsx';
import ThumbnailImage from './ThumbnailImage.jsx';


function Home() {
    return(
        <>
            <BannerImage />
            <ThumbnailImage />
            <BannerVideo />
        </>
    );
}

export default Home;