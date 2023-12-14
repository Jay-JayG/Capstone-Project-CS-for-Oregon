import React from 'react';
import HomeBanner from './HomeBanner.jsx';
import ThumbnailImage from './ThumbnailImage.jsx';
import SubHeading from './SubHeading.jsx';
import ContextStats from './ContextStats.jsx';


function Home() {
    return(
        <>
            <HomeBanner />
            <ThumbnailImage />
            <SubHeading />
            <ContextStats />
        </>
    );
}

export default Home;