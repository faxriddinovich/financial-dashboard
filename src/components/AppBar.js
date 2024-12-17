import {Button, IconButton, NativeSelect, useMediaQuery} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import CustomDateRangePicker from "./CustomDateRangePicker";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function AppBar({toggleModal,filterValues,categories,handleFilterChange}) {
    const isLargeScreen = useMediaQuery("(min-width: 1200px)");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={'d-flex align-items-center app-bar justify-content-between app-bar-container'}>
            <h6 className={'m-0 app-bar-title'}>Tranzaksiyalar tarixi</h6>
            <div className="buttons-list d-flex gap-2 align-items-center">
                {isLargeScreen ? (
                    <>
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
                        <CustomDateRangePicker handleFilterChange={handleFilterChange} isLargeScreen />

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
                    </>
                ) : (<>
                    <IconButton onClick={handleClick} size={'small'}>
                        <MenuIcon />
                    </IconButton>
                </>)}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    PaperProps={{
                        style: {
                            width: '50%',
                        }
                    }}
                >
                    <MenuItem>
                        <NativeSelect
                            defaultValue={filterValues.type}
                            variant={'outlined'}
                            className={'mx-1'}
                            size={'small'}
                            fullWidth
                            onChange={(event)=>handleFilterChange(event,'type')}
                        >
                            <option value={'all'}>Hammasi</option>
                            <option value={'inc'}>Kirimlar</option>
                            <option value={'outc'}>Chiqimlar</option>
                        </NativeSelect>
                    </MenuItem>
                    <MenuItem>
                        <CustomDateRangePicker handleFilterChange={handleFilterChange} isLargeScreen />
                    </MenuItem>
                    <MenuItem>
                        <NativeSelect
                            defaultValue={null}
                            size={'small'}
                            fullWidth
                            onChange={(event)=>handleFilterChange(event,'category')}
                        >
                            <option value={'all'}>Hammasi</option>
                            {categories.map((category,categoryIndex) => (
                                <option value={category.value} key={categoryIndex}>{category.name}</option>
                            ))}
                        </NativeSelect>
                    </MenuItem>
                    <MenuItem>
                        <Button variant={'outlined'} onClick={toggleModal} size={'small'} fullWidth>
                            <AddIcon/> Qo'shish
                        </Button>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default AppBar;