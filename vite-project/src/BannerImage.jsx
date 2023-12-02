import backround from './assets/backround.webp';

function BannerImage(){
    
    return (
        <div>
            <img style={{width: '100vw'}} className="backround-image" src={backround} alt="backround" />
            <div style={{color: 'grey', fontSize: '36px', fontWeight: '300' }}className="centered-text"> Some inspiring message about how CS is cool. we should also later change this into a video of young people making minecraft mods or something cool </div>
        </div>
    );

};

export default BannerImage;