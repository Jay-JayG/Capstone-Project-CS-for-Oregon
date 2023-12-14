import React from 'react';
import BannerImage from './BannerImage.jsx';
import ThumbnailImage from './ThumbnailImage.jsx';
import SubHeading from './SubHeading.jsx';
import ContextStats from './ContextText.jsx';
import StatsText from './StatsText.jsx';
import FirstSection from './FirstSection.jsx'
import SecondSection from './SecondSection.jsx';

function Home() {
    return(
        <>
            <BannerImage />
            <ThumbnailImage />
            <FirstSection />
            <SecondSection />
            <SubHeading />
            <div className='ContextStats'>
                <ContextStats />
                <StatsText />
            </div>
            
        </>
    );
}

export default Home;