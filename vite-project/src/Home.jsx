import React from 'react';
import HomeBanner from './HomeBanner.jsx';
import ThumbnailImage from './ThumbnailImage.jsx';
import SubHeading from './SubHeading.jsx';
import ContextStats from './ContextText.jsx';
import StatsText from './StatsText.jsx';
import FirstSection from './FirstSection.jsx'
import SecondSection from './SecondSection.jsx';
import SectionFour from './SectionFour.jsx';
import SectionFive from './SectionFive.jsx';

function Home() {
    return(
        <>
            <HomeBanner />
            <FirstSection />
            <SecondSection />
            <SubHeading />
            <div className='ContextStats'>
                <ContextStats />
                <StatsText />
            </div>
            <SectionFour />
            <SectionFive />
        </>
    );
}

export default Home;