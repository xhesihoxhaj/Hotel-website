import Carousel from 'react-bootstrap/Carousel';
import './carousel.css';

import room1 from '../../images/room1.jpg';
import room2 from '../../images/room2.jpg';
import room3 from '../../images/room3.jpg';
import room4 from '../../images/room4.jpg';

const HeroCarousel = () => {
    return (
        <Carousel fade controls={true} indicators={true} interval={5000} pause={false}>

            <Carousel.Item>
                <img src={room1} alt="ELMare Hotel" className="hero-img" />
                <div className="hero-overlay" />
                <Carousel.Caption className="hero-caption">
                    <p className="hero-sub">Welcome to</p>
                    <h1 className="hero-title">EL<span>Mare</span></h1>
                    <p className="hero-tagline">Where the Adriatic meets luxury</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img src={room2} alt="ELMare Pool" className="hero-img" />
                <div className="hero-overlay" />
                <Carousel.Caption className="hero-caption">
                    <p className="hero-sub">Relax &amp; Unwind</p>
                    <h1 className="hero-title">EL<span>Mare</span></h1>
                    <p className="hero-tagline">Luxury pool overlooking the sea</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img src={room3} alt="ELMare Rooms" className="hero-img" />
                <div className="hero-overlay" />
                <Carousel.Caption className="hero-caption">
                    <p className="hero-sub">Stay With Us</p>
                    <h1 className="hero-title">EL<span>Mare</span></h1>
                    <p className="hero-tagline">Elegant rooms with sea views</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img src={room4} alt="ELMare Luxury" className="hero-img" />
                <div className="hero-overlay" />
                <Carousel.Caption className="hero-caption">
                    <p className="hero-sub">Experience Luxury</p>
                    <h1 className="hero-title">EL<span>Mare</span></h1>
                    <p className="hero-tagline">Your perfect escape by the sea</p>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    );
};

export default HeroCarousel;