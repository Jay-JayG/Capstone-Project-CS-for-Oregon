import React from 'react';
import BannerImage from './BannerImage.jsx';
import ThumbnailImage from './ThumbnailImage.jsx';
import SubHeading from './SubHeading.jsx';
import ContextStats from './ContextStats.jsx';


function Home() {
    return(
        <>
            <BannerImage />
            <ThumbnailImage />
            <SubHeading />
            <ContextStats />
        </>
    );
}

export default Home;