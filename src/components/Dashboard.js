import { PieChart } from '@mui/x-charts/PieChart';
import {useEffect, useState} from "react";

const ExpenseChart = ({currentCurrency,balance}) => {

    const [rates, setRates] = useState({});

    const data = JSON.parse(localStorage.getItem('transactions')) || [];

    const convert = (amount,fromCurrency) => {
        const rate = rates["USD"] / rates[fromCurrency];
        return (amount * rate).toFixed(2);
    };

    const foodIncome = data.reduce((acc, cur) => {
        let sum=acc;
        if (cur.category === 'food' && cur.type === 'inc') {
            sum = acc + convert(cur.amount,cur.currency)
        }
        return sum
    },0)

    const foodOutcome = data.reduce((acc, cur) => {
        let sum=acc;
        if (cur.category === 'food' && cur.type === 'outc') {
            sum = acc + convert(cur.amount,cur.currency)
        }
        return sum
    },0)

    const transportIncome = data.reduce((acc, cur) => {
        let sum=acc;
        if (cur.category === 'transport' && cur.type === 'inc') {
            sum = acc + convert(cur.amount,cur.currency)
        }
        return sum
    },0)

    const transportOutcome = data.reduce((acc, cur) => {
        let sum=acc;
        if (cur.category === 'transport' && cur.type === 'outc') {
            sum = acc + convert(cur.amount,cur.currency)
        }
        return sum
    },0)

    const entertainmentIncome = data.reduce((acc, cur) => {
        let sum=acc;
        if (cur.category === 'entertainment' && cur.type === 'inc') {
            sum = acc + convert(cur.amount,cur.currency)
        }
        return sum
    },0)

    const entertainmentOutcome = data.reduce((acc, cur) => {
        let sum=acc;
        if (cur.category === 'entertainment' && cur.type === 'outc') {
            sum = acc + convert(cur.amount,cur.currency)
        }
        return sum
    },0)

    const incomes = [
        {id: 1, value: foodIncome,label: 'Oziq-ovqat'},
        {id: 2, value: transportIncome,label: 'Transport'},
        {id: 3, value: entertainmentIncome,label: "Ko'ngilochar"},
    ]
    const outcomes = [
        {id: 1, value: foodOutcome,label: 'Oziq-ovqat'},
        {id: 2, value: transportOutcome,label: 'Transport'},
        {id: 3, value: entertainmentOutcome,label: "Ko'ngilochar"},
    ]

    const income = incomes.reduce((acc, item) => acc+Number(item.value),0)
    const outcome = outcomes.reduce((acc, item) => acc+Number(item.value),0)

    useEffect(() => {
        fetch('https://open.er-api.com/v6/latest/USD')
            .then(res => res.json())
            .then(data => setRates(data.rates));
    }, []);
    return (
        <>
            <div className={'d-flex justify-content-center my-2'}>
                <div className={'mb-3'}>
                    <p className={'m-0'}>Sizning balansingiz:</p>
                    <h3 className={'m-0'}>{balance.toFixed(2) + " " + currentCurrency}</h3>
                </div>
            </div>
            <div className={'w-100 d-flex align-items-center mt-3'}>
                <div className="outcomes w-50 border-right px-2">
                    <p className={'m-0'}>Sizning umumiy xarajatlaringiz:</p>
                    <h4 className={'text-danger'}>{outcome + " " + currentCurrency}</h4>

                    {outcomes.some(outcome => outcome.value > 0) ? (<PieChart
                        series={[
                            {
                                data: outcomes,
                            },
                        ]}
                        cx={100}
                        height={350}
                    />) : (<b className={'text-center'}>Sizda tranzaksiyalar mavjud emas...</b>)}
                </div>
                <div className="incomes w-50 px-3">
                    <div className={'ml-3'}>
                        <p className={'m-0'}>Sizning umumiy daromadlaringiz:</p>
                        <h4 className={'text-success'}>{income + " " + currentCurrency}</h4>
                    </div>
                    {incomes.some(income => income.value > 0) ? (<PieChart
                        series={[
                            {
                                data: incomes,
                            },
                        ]}
                        cx={100}
                        height={350}
                    />) : (<b className={'text-center'}>Sizda tranzaksiyalar mavjud emas...</b>)}
                </div>
            </div>
        </>
    )
};

export default ExpenseChart;