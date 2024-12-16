import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, InputLabel, MenuItem, Select, Slide, Snackbar,
    TextField
} from "@mui/material";
import HistoryList from "./HistoryList";
import AppBar from "./AppBar";

function Transactions({balance,currentCurrency,updateBalance}) {

    const categories = [
        {name: 'Oziq-ovqat', value: 'food'},
        {name: 'Transport', value: 'transport'},
        {name: "Ko'ngilochar", value: 'entertainment'}
    ];

    const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem('transactions')) || []);
    const [rates, setRates] = useState({});
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date() || '');
    const [selectedRate, setSelectedRate] = useState('USD');
    const [selectedType, setSelectedType] = useState('');
    const [transactionHistory, setTransactionHistory] = useState('all');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isAmountError, setAmountError] = useState(false);
    const [snackState, setSnackState] = useState({
        open: false,
        vertical:'top',
        horizontal:'bottom',
    });
    const [filterCategory, setFilterCategory] = useState('');
    const [filterValues, setFilterValues] = useState({
        type:'all',
        category: 'all',
        startDate: null,
        endDate: null,
    });

    const {open, vertical, horizontal} = snackState;

    const convert = () => {
        const rate = rates[currentCurrency] / rates[selectedRate];
        return (transactionAmount * rate).toFixed(2);
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setTransactionAmount(0);
        setSelectedDate(new Date());
        setSelectedType('')
        setCategory('')
        setDescription('')
    }

    const toggleSnack = () => {
        setSnackState({ ...snackState, open: !open });
    }

    const handleCategoryChange = (e) => {
        setFilterCategory(e.target.value);
    }

    const handleAmountChange = (e) => {
        if (e.target.value <1){
            setAmountError(true)
        }
        else {
            setAmountError(false)
            setTransactionAmount(e.target.value)
        }
    }

    const handleFilterChange=(event,filterType)=>{
        let updatedFilters = { ...filterValues };

        if (filterType === 'type') {
            updatedFilters.type = event.target.value;
        } else if (filterType === 'category') {
            updatedFilters.category = event.target.value;
        } else if (filterType === 'date-range') {
            updatedFilters.startDate = event.startDate;
            updatedFilters.endDate = event.endDate;
        }

        setFilterValues(updatedFilters);

        const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

        const filteredTransactions = allTransactions.filter((transaction) => {

            const matchesType = updatedFilters.type!=='all'
                ? transaction.type === updatedFilters.type
                : true;

            const matchesCategory = updatedFilters.category!=='all'
                ? transaction.category === updatedFilters.category
                : true;

            const matchesDateRange = updatedFilters.startDate && updatedFilters.endDate
                ? new Date(transaction.date) >= new Date(updatedFilters.startDate) &&
                new Date(transaction.date) <= new Date(new Date(updatedFilters.endDate).setDate(new Date(updatedFilters.endDate).getDate() + 1))
                : true;

            return matchesType && matchesCategory && matchesDateRange;
        });

        setTransactions(filteredTransactions);
    }

    const handleHistoryChange = (e) => {
        setTransactionHistory(e.target.value)
        const value = e.target.value;
        const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        if (value==="all") {
            setTransactions(allTransactions);
        }
        else {
            setTransactions(allTransactions.filter(item=>item.type===value));
        }
    }

    const handleSubmit = () => {
        const transactionObject = {
            amount: transactionAmount,
            currency: selectedRate,
            date: selectedDate,
            type: selectedType,
            category: category,
            description: description,
        }

        if (selectedType==="inc"){
            updateBalance(Number(balance)+Number(convert()));
        }
        else if (selectedType==="outc"){
           if (Number(balance)<Number(convert())) {
                toggleSnack();
                return;
           }
           else updateBalance(Number(balance)-Number(convert()));
        }

        const tempArray = transactions
        tempArray.push(transactionObject)
        setTransactions(tempArray)
        localStorage.setItem('transactions', JSON.stringify(tempArray))

        toggleModal()
    }

    useEffect(() => {
        fetch('https://open.er-api.com/v6/latest/USD')
            .then(res => res.json())
            .then(data => setRates(data.rates));
    }, []);
    return (
        <div>
            <p className={'m-0 p-0'}>Sizning balansingiz:</p>
            <h1 className={'m-0'}>{balance.toFixed(2)} {currentCurrency}</h1>

            <AppBar
                handleHistoryChange={handleHistoryChange}
                transactionHistory={transactionHistory}
                toggleModal={toggleModal}
                categories={categories}
                category={filterCategory}
                filterValues={filterValues}
                handleFilterChange={handleFilterChange}
                handleCategoryChange={handleCategoryChange}
            />

            <HistoryList categories={categories} transactions={transactions} />

            <Dialog
                open={isOpen}
                onClose={toggleModal}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleSubmit()
                    },
                }}>
                <DialogTitle>Tranzaksiya yaratish</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tranzaksiya yaratish uchun quyidagi maydonlarni to'ldirib chiqing va saqlash tugmasini bosing!
                    </DialogContentText>
                    <FormControl className={'my-2 w-50 px-1'}>
                        <TextField
                            required
                            name="amount"
                            id="amount"
                            type="number"
                            label="Tranzaksiya miqdori"
                            fullWidth
                            variant={'outlined'}
                            value={transactionAmount}
                            onChange={handleAmountChange}
                            error={isAmountError}
                        />
                        {isAmountError && (<p className={'text-danger m-0 p-0 small'}>Tranzaksiya miqdori 0 dan katta bo'lishi lozim.</p>)}
                    </FormControl>

                    <FormControl className={'my-2 w-50 px-1'}>
                        <InputLabel id={'valyuta'}>Valyuta</InputLabel>
                        <Select
                            variant={'outlined'}
                            required
                            labelId={'valyuta'}
                            label={'Valyuta'}
                            value={selectedRate}
                            onChange={(e) => setSelectedRate(e.target.value)}
                        >
                            {Object.keys(rates).map(currency => (
                                <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={'my-2 w-50 px-1'}>
                        <InputLabel id={'rate-type'}>Turi</InputLabel>
                        <Select
                            variant={'outlined'}
                            required
                            labelId={'rate-type'}
                            label={'Turi'}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <MenuItem value={'inc'}>Kirim</MenuItem>
                            <MenuItem value={'outc'}>Chiqim</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={'my-2 w-50 px-1'}>
                        <InputLabel id="select-category-label">Kategoriya</InputLabel>
                        <Select
                            variant={'outlined'}
                            labelId="select-category-label"
                            id="select-category"
                            label="Kategoriya"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            required
                        >
                            {categories.map((category,categoryIndex) => (
                                <MenuItem value={category.value} key={categoryIndex}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className={'my-2'}>
                        <label htmlFor={'transaction-date'}>Tranzaksiya sanasi:</label>
                        <input type="date" id={'transaction-date'} className={'form-control'} required value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth className={'my-2'}>
                        <label htmlFor="description">Izoh:</label>
                        <textarea
                            name="description"
                            cols="30"
                            rows="3"
                            className={'form-control'}
                            placeholder={'Tranzaksiyaga izoh...'}
                            onChange={(e)=>setDescription(e.target.value)}
                            value={description}></textarea>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal}>Bekor qilish</Button>
                    <Button type="submit">Yaratish</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={5000}
                onClose={toggleSnack}
                message="Hisobingizda mablag' yetarli emas!"
                key={vertical + horizontal}
                TransitionComponent={Slide}
            />
        </div>
    )
}

export default Transactions;
