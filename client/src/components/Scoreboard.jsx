import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = '/api/data';

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
                        <span className="total-red">{data.keralaTotal}</span>
                        <div className="separator"></div>
                        <span className="sub-total-black">{data.keralaSubtotal}</span>
                    </div>
                </div>

                {/* LDF */}
                <div className="column">
                    <div className="header ldf-header">LDF</div>
                    <div className="content">
                        <span className="number">{data.ldf}</span>
                    </div>
                </div>

                {/* UDF */}
                <div className="column">
                    <div className="header udf-header">UDF</div>
                    <div className="content">
                        <span className="number">{data.udf}</span>
                    </div>
                </div>

                {/* NDA */}
                <div className="column">
                    <div className="header nda-header">NDA</div>
                    <div className="content">
                        <span className="number">{data.nda}</span>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Scoreboard;
