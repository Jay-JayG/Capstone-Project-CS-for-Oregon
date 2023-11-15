import video from './assets/video.mp4';

function BannerVideo(){
    
    return(
        <div>
        <video className="banner-video" autoPlay loop muted>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
    );
};

export default BannerVideo;