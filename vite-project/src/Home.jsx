import React from 'react';
import BannerImage from './BannerImage.jsx';
import ThumbnailImage from './ThumbnailImage.jsx';
import SubHeading from './SubHeading.jsx';
import ContextStats from './ContextText.jsx';
import StatsText from './StatsText.jsx';

function Home() {
    return(
        <>
            <BannerImage />
            <ThumbnailImage />
            <SubHeading />
            <div className='ContextStats'>
                <ContextStats />
                <StatsText />
            </div>
            
        </>
    );
}

export default Home;