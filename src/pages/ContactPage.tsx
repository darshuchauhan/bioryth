import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="contact-page">
            <section className="page-hero bg-primary">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>How can we help your brand grow?</p>
                </div>
            </section>

            <section className="contact-details-section section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-form-container">
                            <h2>Send Us a Message</h2>
                            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent!'); }}>
                                <div className="form-group">
                                    <input type="text" placeholder="Your Name" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Email Address" required />
                                </div>
                                <div className="form-group">
                                    <textarea placeholder="Your Message" rows={5} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send Inquiry</button>
                            </form>
                        </div>
                        <div className="contact-info-container">
                            <div className="info-block">
                                <h3>Corporate Office</h3>
                                <p>4th Floor, OZ House, GhodDod Rd,</p>
                                <p>near Umra Police Station,</p>
                                <p>opposite Kavi Narmad Central Library,</p>
                                <p>Maktampur, Athwa, Surat, Gujarat 395007</p>
                            </div>
                            <div className="info-block">
                                <h3>Call Us</h3>
                                <p>+91 9909117959</p>
                            </div>
                            <div className="info-block">
                                <h3>Email Us</h3>
                                <p>info@bioryth.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-placeholder">
                <div className="container">
                    <div className="map-box">
                        {/* Placeholder for Google Map */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.4365246837815!2d72.92276617401623!3d21.254181580000374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be045006da3b631%3A0xfb1bda90c0c410c2!2sBioryth%20Enterprise!5e0!3m2!1sen!2sin!4v1772036768016!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
