import backround from './assets/backround.webp';

function BannerImage(){
    
    return (
        <div>
            <img style={{width: '100vw'}} className="backround-image" src={backround} alt="backround" />
        </div>
    );

};

export default BannerImage;