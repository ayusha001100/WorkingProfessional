import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, MapPin, CreditCard, ShoppingBag, Truck, Check } from 'lucide-react';

export default function HardcopyCheckout({ onBack, studentName, userEmail, certificateTitle, certificateImage }) {
    const [formData, setFormData] = useState({
        fullName: studentName || '',
        email: userEmail || '',
        phone: '',
        street: '',
        city: '',
        pincode: '',
        state: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = () => {
        // Redirect to Razorpay Payment Page
        window.location.href = "https://pages.razorpay.com/pl_SCqgLKTEMjr5oX/view";
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        fontSize: '0.95rem',
        color: '#0f172a',
        transition: 'all 0.2s',
        outline: 'none',
        marginBottom: '1rem'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: '#64748b',
        marginBottom: '6px'
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{
                width: '100%',
                maxWidth: '1100px',
                margin: '0 auto',
                background: '#fff',
                padding: '2rem 1rem'
            }}
        >
            <button
                onClick={onBack}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginBottom: '2rem'
                }}
            >
                <ArrowLeft size={18} /> Back to Certificate
            </button>

            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>Get Your Hardcopy</h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Official certificate delivered straight to your doorstep.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '4rem' }}>
                {/* Left Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ff5722' }}>
                            <User size={20} />
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Contact Info</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                            <div>
                                <label style={labelStyle}>Full Name</label>
                                <input
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Phone Number</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ff5722' }}>
                            <MapPin size={20} />
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Shipping Address</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                            <div>
                                <label style={labelStyle}>Street Address</label>
                                <textarea
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    placeholder="House No, Building, Street, Area"
                                    style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={labelStyle}>City</label>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="City"
                                        style={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Pincode</label>
                                    <input
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        placeholder="6 Digits"
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>State</label>
                                <input
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    placeholder="State"
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Summary */}
                <div style={{ position: 'sticky', top: '2rem' }}>
                    <div style={{
                        background: '#f8fafc',
                        borderRadius: '32px',
                        padding: '2.5rem',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                    }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <ShoppingBag size={22} /> Order Summary
                        </h3>

                        <div style={{ display: 'flex', gap: '15px', marginBottom: '2rem' }}>
                            <div style={{
                                width: '100px',
                                height: '70px',
                                background: '#fff',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                overflow: 'hidden',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                            }}>
                                <img src={certificateImage || "/assets/certificate_placeholder.png"} alt="Certificate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Hardcopy Certificate</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>{certificateTitle}</p>
                                <p style={{ margin: '4px 0 0', fontWeight: 700, color: '#ff5722' }}>₹399</p>
                            </div>
                        </div>

                        <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '1.5rem' }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '1rem' }}>
                                <span>Subtotal</span>
                                <span>₹399</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontSize: '1rem', fontWeight: 600 }}>
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f172a', fontSize: '1.4rem', fontWeight: 900, marginTop: '8px' }}>
                                <span>Total</span>
                                <span>₹399</span>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(255, 138, 80, 0.08)',
                            padding: '1rem',
                            borderRadius: '16px',
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '2rem',
                            border: '1px dashed rgba(255, 87, 34, 0.3)'
                        }}>
                            <CreditCard size={20} color="#ff5722" />
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#9a3412', lineHeight: 1.5 }}>
                                Includes high-quality printing, protective casing, and tracked shipping.
                            </p>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            style={{
                                width: '100%',
                                background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                color: '#fff',
                                border: 'none',
                                padding: '1.4rem',
                                borderRadius: '18px',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                boxShadow: '0 15px 30px rgba(255, 87, 34, 0.3)',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Pay ₹399 & Place Order
                        </button>
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', opacity: 0.5 }}>
                        <Truck size={24} />
                        <div style={{ width: '1px', height: '20px', background: '#cbd5e1' }} />
                        <Check size={24} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
