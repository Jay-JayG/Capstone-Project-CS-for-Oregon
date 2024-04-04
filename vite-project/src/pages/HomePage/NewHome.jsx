import BannerSection from './BannerSection';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import './Home.css';

function NewHome() {

    return (
        <div>
            <div id="main-content">
                <BannerSection />
                <Section1 />
                <Section2 />
                <Section3 />
            </div>
        </div>
    );

};

export default NewHome;