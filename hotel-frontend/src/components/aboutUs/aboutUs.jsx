import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './aboutUs.css';
import hotel from '../../images/hotel.webp'

const stats = [
    { number: '24/7', label: 'Concierge Service' },
    { number: '30+', label: 'Luxury Rooms' },
    { number: '5★', label: 'Rated Experience' },
    { number: '100%', label: 'Guest Satisfaction' },
];

const features = [
    { icon: '🌊', title: 'Sea View Rooms', desc: 'Wake up to breathtaking views of the Adriatic every morning.' },
    { icon: '🍽️', title: 'Fine Dining', desc: 'Savor exquisite Mediterranean cuisine crafted by our top chefs.' },
    { icon: '💆', title: 'Spa & Wellness', desc: 'Rejuvenate your body and mind at our full-service spa.' },
    { icon: '🏊', title: 'Infinity Pool', desc: 'Dive into luxury with our stunning rooftop infinity pool.' },
    { icon: '🅿️', title: 'Free Parking', desc: 'Complimentary secure parking available for all guests.' },
    { icon: '📶', title: 'Free Wi-Fi', desc: 'High-speed internet throughout the entire property.' },
];

const About = () => {
    return (
        <section className="about-section">
            <Container>

                {/* TOP — tekst + foto */}
                <Row className="align-items-center mb-5 pb-5">
                    <Col lg={6} className="mb-5 mb-lg-0">
                        <p className="about-label">Who We Are</p>
                        <h2 className="about-heading">A Brand New Standard of Luxury</h2>
                        <div className="about-divider" />
                        <p className="about-desc">
                            ELMare Hotel is the newest luxury destination on the Albanian Riviera.
                            Born from a passion for elegance and hospitality, we offer an unparalleled
                            experience where the beauty of the Adriatic Sea meets world-class comfort.
                        </p>
                        <p className="about-desc">
                            Every detail at ELMare has been carefully crafted — from our designer
                            interiors to our personalized service — to ensure your stay is nothing
                            short of extraordinary. Whether you're here for a romantic escape,
                            a family holiday, or a business retreat, we welcome you home.
                        </p>

                        {/* STATS */}
                        <Row className="about-stats pt-4 mt-4">
                            {stats.map((s, i) => (
                                <Col xs={6} md={3} key={i} className="stat-item mb-3">
                                    <span className="stat-number">{s.number}</span>
                                    <span className="stat-label">{s.label}</span>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    <Col lg={6}>
                        <div className="about-image-wrap">
                            {/* VENDOS FOTON KETU — zëvendëso div me img kur ke foton */}
                            <div className="about-img-placeholder">
                                <img src={hotel} alt="ELMare Hotel" className="about-img" />
                            </div>
                            <div className="about-img-badge">
                                <span>Est. 2025</span>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* FEATURES */}
                <Row className="pt-5 border-top border-secondary">
                    <Col xs={12} className="text-center mb-5">
                        <p className="about-label">What We Offer</p>
                        <h2 className="about-heading">Everything You Need</h2>
                    </Col>

                    {features.map((f, i) => (
                        <Col md={6} lg={4} key={i} className="mb-4">
                            <Card className="feature-card h-100">
                                <Card.Body>
                                    <span className="feature-icon">{f.icon}</span>
                                    <Card.Title className="feature-title">{f.title}</Card.Title>
                                    <Card.Text className="feature-desc">{f.desc}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </Container>
        </section>
    );
};

export default About;