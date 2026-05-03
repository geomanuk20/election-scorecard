import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = '/api/data';

const Admin = () => {
    const [formData, setFormData] = useState({
        keralaTotal: 20,
        keralaSubtotal: 20,
        ldf: 0,
        udf: 0,
        nda: 0
    });
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API_URL);
                if (res.data) {
                    setFormData({
                        keralaTotal: res.data.keralaTotal ?? 20,
                        keralaSubtotal: res.data.keralaSubtotal ?? 20,
                        ldf: res.data.ldf ?? 0,
                        udf: res.data.udf ?? 0,
                        nda: res.data.nda ?? 0
                    });
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: parseInt(e.target.value) || 0
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, formData);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            console.error('Error saving data:', err);
            alert(`Failed to save data: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="container">
            <div className="admin-card">
                <h1 className="admin-title">Admin Panel</h1>
                
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="form-group">
                            <label>Kerala Total</label>
                            <input 
                                type="number" 
                                name="keralaTotal" 
                                value={formData.keralaTotal} 
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Kerala Seats</label>
                            <input 
                                type="number" 
                                name="keralaSubtotal" 
                                value={formData.keralaSubtotal} 
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ color: 'var(--ldf-bg)' }}>LDF Count</label>
                        <input 
                            type="number" 
                            name="ldf" 
                            value={formData.ldf} 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ color: 'var(--udf-bg)' }}>UDF Count</label>
                        <input 
                            type="number" 
                            name="udf" 
                            value={formData.udf} 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ color: 'var(--nda-bg)' }}>NDA Count</label>
                        <input 
                            type="number" 
                            name="nda" 
                            value={formData.nda} 
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">SAVE UPDATES</button>
                    <Link to="/" className="btn btn-secondary">VIEW SCOREBOARD</Link>
                </form>
            </div>

            {showToast && (
                <div className="success-toast">
                    Data Saved Successfully!
                </div>
            )}
        </div>
    );
};

export default Admin;
