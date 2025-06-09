function BannerSection({ data }) {
  return (
    <div className='banner-container'>
      <div className='text-overlay'>
        <h1>
          {data.banner_text}
        </h1>
        {/* <h1>
          CS FOR OREGON IS GUIDING, SUPPORTING, AND PROMOTING RESEARCH-BASED, EQUITABLE, AND INCLUSIVE K-12 COMPUTER SCIENCE EDUCATION THROUGHOUT OREGON
        </h1> */}
      </div>
      <span className="visually-hidden">
        Banner image of diverse students coding.
      </span>
    </div>
  );
}

export default BannerSection;
