import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:5050/api/data';

const Scoreboard = () => {
    const [data, setData] = useState({
        keralaTotal: 20,
        keralaSubtotal: 20,
        ldf: 0,
        udf: 0,
        nda: 0
    });

    const fetchData = async () => {
        try {
            const res = await axios.get(API_URL);
            if (res.data) {
                setData(res.data);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <div className="scoreboard">
                {/* Kerala */}
                <div className="column">
                    <div className="header kerala-header">KERALA</div>
                    <div className="content kerala-content">
                        <span key={`total-${data.keralaTotal}`} className="total-red animate-fade">
                            {data.keralaTotal}
                        </span>
                        <div className="separator"></div>
                        <span key={`sub-${data.keralaSubtotal}`} className="sub-total-black animate-fade">
                            {data.keralaSubtotal}
                        </span>
                    </div>
                </div>

                {/* LDF */}
                <div className="column">
                    <div className="header ldf-header">LDF</div>
                    <div className="content">
                        <span key={`ldf-${data.ldf}`} className="number animate-fade">
                            {data.ldf}
                        </span>
                    </div>
                </div>

                {/* UDF */}
                <div className="column">
                    <div className="header udf-header">UDF</div>
                    <div className="content">
                        <span key={`udf-${data.udf}`} className="number animate-fade">
                            {data.udf}
                        </span>
                    </div>
                </div>

                {/* NDA */}
                <div className="column">
                    <div className="header nda-header">NDA</div>
                    <div className="content">
                        <span key={`nda-${data.nda}`} className="number animate-fade">
                            {data.nda}
                        </span>
                    </div>
                </div>
            </div>

            <Link to="/admin" style={{ 
                position: 'fixed', 
                bottom: '20px', 
                right: '20px', 
                color: '#999', 
                textDecoration: 'none', 
                fontSize: '0.8rem', 
                opacity: 0.5 
            }}>Admin Panel</Link>
        </div>
    );
};

export default Scoreboard;
