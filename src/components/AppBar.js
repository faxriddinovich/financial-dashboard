import {Button, NativeSelect} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import CustomDateRangePicker from "./CustomDateRangePicker";

function AppBar({handleHistoryChange,transactionHistory,toggleModal,filterValues,handleCategoryChange,categories,handleFilterChange}) {
    return (
        <div className={'d-flex align-items-center app-bar justify-content-between'}>
            <h6 className={'m-0'}>Tranzaksiyalar tarixi</h6>
            <div className="buttons-list d-flex gap-2 align-items-center">
                <NativeSelect
                    defaultValue={filterValues.type}
                    variant={'outlined'}
                    className={'mx-1'}
                    size={'small'}
                    onChange={(event)=>handleFilterChange(event,'type')}
                >
                    <option value={'all'}>Hammasi</option>
                    <option value={'inc'}>Kirimlar</option>
                    <option value={'outc'}>Chiqimlar</option>
                </NativeSelect>
                <CustomDateRangePicker handleFilterChange={handleFilterChange} />

                <NativeSelect
                    defaultValue={null}
                    size={'small'}
                    onChange={(event)=>handleFilterChange(event,'category')}
                >
                    <option value={'all'}>Hammasi</option>
                    {categories.map((category,categoryIndex) => (
                        <option value={category.value} key={categoryIndex}>{category.name}</option>
                    ))}
                </NativeSelect>

                <Button variant={'outlined'} onClick={toggleModal} size={'small'}>
                    <AddIcon/> Qo'shish
                </Button>
            </div>
        </div>
    )
}

export default AppBar;