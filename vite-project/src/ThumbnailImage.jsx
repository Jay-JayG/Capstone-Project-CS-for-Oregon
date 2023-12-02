import thumbnail from './assets/thumbnail.webp';

function ThumbnailImage(){
    
    return (
        <div className="container">
            
            <div className="textbox-home">
                <h3 style={{color: "#270F5A"}}>CS for All</h3> {/* Your header text here */}
                <p>Place holder text with a big ol paragraph talking about how cool cs for all in Oregon is yipppeeee. CS for All empowers our Nation’s students with computational thinking: CS courses enable students to develop skills and competencies in problem-solving, critical thinking, creativity and collaboration that will help them excel in today’s increasingly digital and computational world.</p>
            </div>
            <img className="thumbnail-image" src={thumbnail} alt="thumbnail" />
        </div>
    );

};

export default ThumbnailImage;