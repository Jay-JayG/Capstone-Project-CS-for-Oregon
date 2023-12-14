import React from 'react';
import BannerImage from './BannerImage.jsx';
import SubHeading from './SubHeading.jsx';
import ContextStats from './ContextText.jsx';
import StatsText from './StatsText.jsx';
import FirstSection from './FirstSection.jsx'
import SecondSection from './SecondSection.jsx';
import SectionFour from './SectionFour.jsx';

function Home() {
    return(
        <>
            <BannerImage />
            <FirstSection />
            <SecondSection />
            <SubHeading />
            <div className='ContextStats'>
                <ContextStats />
                <StatsText />
            </div>
            <SectionFour />
        </>
    );
}

export default Home;