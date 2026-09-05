import './contact.css';

const ContactPage = () => {
    return (
        <div className="contact-page">

            {/* Hero */}
            <section className="contact-hero">
                <div className="contact-hero-overlay" />
                <div className="contact-hero-content">
                    <span className="contact-eyebrow">Get in Touch</span>
                    <h1>We'd Love<br />to Hear From You</h1>
                </div>
            </section>

            {/* Main */}
            <section className="contact-main">
                <div className="contact-inner">

                    {/* Info */}
                    <div className="contact-info">
                        <span className="section-label">Contact Details</span>
                        <h2>Visit Us in<br />Potam, Himarë</h2>
                        <p>We are located on the beautiful shores of Potam Beach, one of the most pristine beaches along the Albanian Riviera.</p>

                        <div className="contact-items">
                            <div className="contact-item">
                                <span className="contact-item-icon">📍</span>
                                <div>
                                    <span className="contact-item-label">Address</span>
                                    <span className="contact-item-value">Potam Beach, Himarë, Albania</span>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-item-icon">📞</span>
                                <div>
                                    <span className="contact-item-label">Phone</span>
                                    <a href="tel:+355691234567" className="contact-item-value">+355 69 123 4567</a>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-item-icon">✉️</span>
                                <div>
                                    <span className="contact-item-label">Email</span>
                                    <a href="mailto:info@elmare.al" className="contact-item-value">info@elmare.al</a>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-item-icon">🕐</span>
                                <div>
                                    <span className="contact-item-label">Reception Hours</span>
                                    <span className="contact-item-value">Open 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="contact-form-wrap">
                        <span className="section-label">Send a Message</span>
                        <form className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" placeholder="John" />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="tel" placeholder="+355 69 000 0000" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="How can we help you?" />
                            </div>
                            <button type="submit" className="contact-btn">Send Message</button>
                        </form>
                    </div>

                </div>

                {/* Map */}
                <div className="contact-map">
                    <iframe
                        title="ELMare Hotel Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3052.01867462623!2d19.75029687546646!3d40.09729657502007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b2fcfcc15e84b%3A0xab43c80629a68489!2sPotam!5e0!3m2!1sen!2s!4v1779964089656!5m2!1sen!2s"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

            </section>
        </div>
    );
};

export default ContactPage;