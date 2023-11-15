import banner from './assets/banner.webp';

function BannerImage(){
    
    return (
        <div>
            <img className="banner-image" src={banner} alt="banner" />
        </div>
    );
};

export default BannerImage;