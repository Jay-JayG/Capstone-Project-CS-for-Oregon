import { useState, useEffect } from "react";
import "./SpotlightCarousel.css";

const Carousel = ({ slides }) => {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const clonedSlides = [
        slides[slides.length - 1], // Clone last slide
        ...slides,                  // Original slides
        slides[0],                  // Clone first slide
    ];

    const nextSlide = () => {
    console.log(`nextSlide called, currentIndex: ${currentIndex}`); // Log current index
    
    if (currentIndex === clonedSlides.length - 1 || currentIndex === 0) {
        console.log("At cloned slide, skipping to next real slide.");
        
        setIsTransitioning(false); // Temporarily disable transition
        setCurrentIndex(1); // Skip to the real first slide (after the cloned last slide)
        
        setTimeout(() => {
            setIsTransitioning(true); // Re-enable transition after resetting
            console.log(`Jumped to real first slide, currentIndex: ${currentIndex}`);
        }, 50);
    } else {
        setIsTransitioning(true); // Allow normal transition for other slides
        setCurrentIndex(prevIndex => {
            console.log(`Moving to next slide, currentIndex: ${prevIndex + 1}`);
            return prevIndex + 1;
        });
    }
};

const prevSlide = () => {
    console.log(`prevSlide called, currentIndex: ${currentIndex}`); // Log current index

    if (currentIndex === 0) {
        console.log("At cloned slide, skipping to previous real slide.");
        
        setIsTransitioning(false); // Temporarily disable transition
        setCurrentIndex(clonedSlides.length - 2); // Jump to the real last slide (before the cloned first slide)
        
        setTimeout(() => {
            setIsTransitioning(true); // Re-enable transition after resetting
            console.log(`Jumped to real last slide, currentIndex: ${currentIndex}`);
        }, 50);
    } else {
        setIsTransitioning(true); // Allow normal transition for other slides
        setCurrentIndex(prevIndex => {
            console.log(`Moving to previous slide, currentIndex: ${prevIndex - 1}`);
            return prevIndex - 1;
        });
    }
};

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsPlaying(false); // Pause auto-slide when modal is open
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsPlaying(true); // Resume auto-slide when modal is closed
    };

    // Function to handle click on the indicator dots
    const handleDotClick = (index) => {
        setCurrentIndex(index + 1); // Set the clicked dot as active (adjusted for cloned array)
    };

    // Determine the real index based on currentIndex
    const getRealIndex = () => {
        if (currentIndex === 0) return slides.length - 1; // Wrap around to last real slide
        if (currentIndex === clonedSlides.length - 1) return 0; // Wrap around to first real slide
        return currentIndex - 1; // Otherwise, use the current index
    };

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval); // Cleanup on unmount or pause
    }, [isPlaying, currentIndex]); // Dependencies: isPlaying and currentIndex

    return (
        <div className="carousel">
            <div
                className="carousel-track"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                }}
            >
                {clonedSlides.map((slide, index) => (
                    <div key={index} className="carousel-slide">
                        <img
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="clickable-image"
                            onClick={openModal}
                        />
                        <div className="carousel-content">
                            <h2>Additional Info</h2>
                            <p>{slide.text}</p>
                            <button onClick={openModal}>More Info</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button onClick={prevSlide} className="carousel-button prev">❮</button>
            <button onClick={nextSlide} className="carousel-button next">❯</button>

            {/* Controls container (for Pause Button and Dots) */}
            <div className="carousel-controls">
                <button onClick={togglePlay} className="pause">
                    {isPlaying ? "Pause" : "Play"}
                </button>

                {/* Slide Indicator Bubbles */}
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`carousel-bubble ${getRealIndex() === index ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)} // Adjusted index to work with the cloned slides
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {
                isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>

                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <img src={slides[currentIndex].image} alt="Enlarged view" />
                            <div className="carousel-content">
                                <h2>Additional Info</h2>
                                <p>{slides[currentIndex].text}</p>
                                <button >More Info</button>
                            </div>
                            <button className="close-button" onClick={closeModal}>×</button>

                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Carousel;
