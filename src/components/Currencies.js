import {useEffect, useState} from "react";
import {TransitionGroup} from "react-transition-group";
import Slide from '@mui/material/Slide';

import '../assets/styles/currencies-responsive.css'

function Currencies(){
    const [rates, setRates] = useState([]);

    useEffect(() => {
        const fetchRates = async () => {
            const response = await fetch("https://open.er-api.com/v6/latest/USD");
            const data = await response.json();
            const requiredRates = [
                { currency: "UZS", rate: data.rates.UZS },
                { currency: "RUB", rate: data.rates.RUB },
                { currency: "EUR", rate: data.rates.EUR },
            ];
            setRates(requiredRates);
        };

        fetchRates();
    }, []);
    return (
        <>
            <h3 className={'text-center my-3 currency-title'}>Valyutalarning dollarga nisbatan kurslari</h3>
            <ul className="list-group currency-list">
                <TransitionGroup>
                    {rates?.map((rate, index) => (
                        <Slide key={index} direction={"up"} in={true} mountOnEnter unmountOnExit timeout={300 + 500 * index}>
                            <li className="d-flex align-items-center justify-content-between list-group-item">
                                <b>{rate.currency}</b>
                                <p className="m-0">{rate.rate}</p>
                            </li>
                        </Slide>
                    ))}
                </TransitionGroup>
            </ul>
        </>
    )
}

export default Currencies