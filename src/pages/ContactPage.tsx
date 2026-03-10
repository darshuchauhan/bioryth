import React from 'react';
import { ChevronRight } from 'lucide-react';

const ContactPage: React.FC = () => {
    return (
        <div className="contact-page">
            <section className="page-hero bg-primary">
                <div className="container">
                    <h1 className="reveal">Get In Touch</h1>
                    <p>Partner with Bioryth for premium nutraceutical solutions.</p>
                </div>
            </section>

            <section className="contact-details-section section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-form-container reveal">
                            <div className="form-tabs">
                                <h2>Contact Us</h2>
                            </div>
                            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                                <div className="form-group">
                                    <input type="text" placeholder="Full Name" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Email Address" required />
                                </div>
                                <div className="form-group">
                                    <input type="tel" placeholder="Phone Number" />
                                </div>
                                <div className="form-group">
                                    <textarea placeholder="How can we help you?" rows={4} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </form>

                            <div className="sample-form-box reveal" style={{ marginTop: '4rem' }}>
                                <h2>Request a Sample</h2>
                                <p>Provide details about your project to receive a product sample.</p>
                                <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Sample request received!'); }}>
                                    <div className="form-group">
                                        <input type="text" placeholder="Ingredient Name" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Company Name" required />
                                    </div>
                                    <div className="form-group">
                                        <textarea placeholder="Application Details (e.g., Tablets, Powder)" rows={3}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-outline">Request Sample</button>
                                </form>
                            </div>
                        </div>

                        <div className="contact-info-container reveal">
                            <div className="info-block">
                                <h3>Corporate Office</h3>
                                <p>4th Floor, OZ House, GhodDod Rd,</p>
                                <p>near Umra Police Station,</p>
                                <p>opposite Kavi Narmad Central Library,</p>
                                <p>Maktampur, Athwa, Surat, Gujarat 395007</p>
                            </div>
                            <div className="info-block">
                                <h3>WhatsApp / Call</h3>
                                <p>+91 91041 33333</p>
                            </div>
                            <div className="info-block">
                                <h3>Email</h3>
                                <p>info@biorythenterprise.com</p>
                            </div>

                            <div className="newsletter-box reveal">
                                <h3>Newsletter</h3>
                                <p>Subscribe for market updates and new arrivals.</p>
                                <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                                    <input type="email" placeholder="Email Address" required />
                                    <button type="submit" className="btn-icon bg-primary"><ChevronRight size={20} /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-placeholder">
                <div className="container">
                    <div className="map-box" style={{ overflow: 'hidden', borderRadius: '30px' }}>
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
