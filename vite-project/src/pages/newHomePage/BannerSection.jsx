import banner from '/src/assets/OR-Statewide-CS-Implementation-Plan.png';
import logo from '/src/assets/logo.webp';

function BannerSection() {
  return (
    <div className='BannerSection'>
      <img className="BannerImage" src={banner} alt="Banner Image" />
      <img className="home-logo-image" src={logo} alt="logo" />
      <div className='text-overlay'>
        <h1>
            CS FOR OREGON IS GUIDING, SUPPORTING, AND PROMOTING RESEARCH-BASED, EQUITABLE, AND INCLUSIVE K-12 COMPUTER SCIENCE EDUCATION THROUGHOUT OREGON
        </h1>
      </div>
    </div>
  );
}

export default BannerSection;
