import React, { type FormEvent, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || 'Failed to send inquiry.');
            }

            setFormData({ name: '', email: '', phone: '', message: '' });
            setStatus('success');
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send inquiry.');
        }
    };

    return (
        <div className="contact-page">
            <section className="page-hero bg-primary">
                <div className="container">
                    <h1>Get In Touch</h1>
                    <p>Partner with India’s leading nutraceutical ingredient supplier for premium solutions.</p>
                </div>
            </section>

            <section className="contact-details-section section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-form-container">
                            <div className="form-tabs">
                                <h2>Inquiry Form</h2>
                            </div>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" placeholder="Full Name" value={formData.name} onChange={handleChange('name')} required />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Email Address" value={formData.email} onChange={handleChange('email')} required />
                                </div>
                                <div className="form-group">
                                    <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange('phone')} />
                                </div>
                                <div className="form-group">
                                    <textarea placeholder="Tell us about your requirement..." rows={6} value={formData.message} onChange={handleChange('message')} required />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                                </button>
                            </form>

                            {status === 'success' && <p className="form-success">Your inquiry has been sent to info@bioryth.com.</p>}
                            {status === 'error' && <p className="form-error">{errorMessage}</p>}
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
                                <h3>WhatsApp / Call</h3>
                                <p>+91 99091 17959</p>
                            </div>
                            <div className="info-block">
                                <h3>Email</h3>
                                <p>info@bioryth.com</p>
                            </div>

                            <div className="newsletter-box">
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
        </div>
    );
};

export default ContactPage;
