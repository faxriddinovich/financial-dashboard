import * as React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useRef, useState} from "react";
import '../assets/styles/data-picker.css'

export default function CustomDateRangePicker({handleFilterChange}) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const prevStartDate = useRef(null);
    const prevEndDate = useRef(null);

    useEffect(() => {

        if (
            startDate !== prevStartDate.current ||
            endDate !== prevEndDate.current
        ) {
            if (startDate !== null && endDate !== null) {
                handleFilterChange({ startDate, endDate }, "date-range");
            }

            prevStartDate.current = startDate;
            prevEndDate.current = endDate;
        }
    }, [startDate, endDate, handleFilterChange]);

    const handleDateChange = (date, field) => {
        if (field === "startDate") {
            setStartDate(date);
        } else if (field === "endDate") {
            setEndDate(date);
        }
    };
    return (
        <>
            <DatePicker
                selected={startDate}
                onChange={(date)=>handleDateChange(date,'startDate')}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Boshlanish sanasi"
                dateFormat="dd.MM.yyyy"
                className={'form-control form-control-sm'}
             showMonthYearDropdown/>
            <DatePicker
                selected={endDate}
                onChange={(date)=>handleDateChange(date,'endDate')}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Tugash sanasi"
                dateFormat="dd.MM.yyyy"
                className={'form-control form-control-sm'}
             showMonthYearDropdown/>
        </>
    );
}