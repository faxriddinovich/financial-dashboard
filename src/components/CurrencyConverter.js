import React, { useState, useEffect } from 'react';
import {Grow, Slide} from "@mui/material";

const CurrencyConverter = () => {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        fetch('https://open.er-api.com/v6/latest/USD')
            .then(res => res.json())
            .then(data => setRates(data.rates));
    }, []);

    const convert = () => {
        const rate = rates[toCurrency] / rates[fromCurrency];
        setConvertedAmount((amount * rate).toFixed(2));
    };

    return (
        <div className={'w-100 h-100 p-2'}>
            <h3>Valyuta Konvertori</h3>
            <Slide direction={"right"} in={true} mountOnEnter unmountOnExit timeout={800}>
                <div className={'d-flex align-items-center gap-2 my-2'}>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={'form-control'}
                    />
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}
                            className={'form-control'}>
                        {Object.keys(rates).map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </Slide>
            <hr/>
            <Slide direction={"left"} in={true} mountOnEnter unmountOnExit timeout={800}>
                <div className={'align-items-center d-flex gap-2'}>
                    <input type="text" className={'form-control'} value={convertedAmount} readOnly/>
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}
                            className={'form-control'}>
                        {Object.keys(rates).map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </Slide>
            <Grow in={true} timeout={800}>
                <button onClick={convert} className={'btn btn-outline-primary my-2 btn-sm'}>Konvertatsiya qilish</button>
            </Grow>
        </div>
    );
};

export default CurrencyConverter;