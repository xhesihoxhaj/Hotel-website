import './about.css';

const AboutPage = () => {
    return (
        <div className="about-page">

            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-overlay" />
                <div className="about-hero-content">
                    <span className="about-eyebrow">Potam, Himarë</span>
                    <h1>A New Standard<br />of Luxury</h1>
                    <p>Where the Albanian Riviera meets refined hospitality</p>
                </div>
            </section>

            {/* Story */}
            <section className="about-story">
                <div className="about-story-inner">
                    <div className="about-story-text">
                        <span className="section-label">Our Story</span>
                        <h2>Born from a Love<br />for the Riviera</h2>
                        <p>
                            Nestled along the pristine shores of Potam Beach in Himarë, our hotel was founded
                            with a single vision — to offer an intimate, luxurious retreat where the natural
                            beauty of the Albanian Riviera takes center stage.
                        </p>
                        <p>
                            We are a new hotel, built with passion and attention to every detail. From the
                            hand-selected furnishings to the locally inspired cuisine, every element of your
                            stay has been carefully crafted to exceed expectations.
                        </p>
                        <div className="about-stats">
                            <div className="stat">
                                <span className="stat-number">20+</span>
                                <span className="stat-label">Luxury Rooms</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">300m</span>
                                <span className="stat-label">From the Beach</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">5★</span>
                                <span className="stat-label">Experience</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-story-image">
                        <div className="image-frame" />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="about-values">
                <span className="section-label centered">What We Offer</span>
                <h2 className="values-title">The ELMare Experience</h2>
                <div className="values-grid">
                    {[
                        { icon: '🌊', title: 'Beachfront Location', desc: 'Steps away from the crystal-clear waters of Potam Beach, one of Albania\'s hidden gems.' },
                        { icon: '🛏️', title: 'Luxury Rooms', desc: 'Spacious, elegantly designed rooms with sea views, premium bedding and modern amenities.' },
                        { icon: '🍽️', title: 'Local Cuisine', desc: 'Fresh Mediterranean flavors inspired by the Albanian coast, served with warm hospitality.' },
                        { icon: '🌅', title: 'Breathtaking Views', desc: 'Wake up to panoramic views of the Ionian Sea and the mountains of Himarë.' },
                        { icon: '🅿️', title: 'Free Parking', desc: 'Complimentary secure parking available for all our guests throughout their stay.' },
                        { icon: '📶', title: 'Free WiFi', desc: 'High-speed internet throughout the property, so you stay connected when you need to.' },
                    ].map((item, i) => (
                        <div className="value-card" key={i}>
                            <span className="value-icon">{item.icon}</span>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default AboutPage;