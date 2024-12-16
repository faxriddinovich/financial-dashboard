import {List, ListItem, ListItemIcon, ListItemText, Slide, Tooltip, Typography} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React from "react";
import Fade from "@mui/material/Fade";
import {TransitionGroup} from "react-transition-group";

function HistoryList({transactions,categories}){
    return (
        <div className="transaction-list w-100 overflow-y-auto">
            {transactions.length === 0 ? (<div className={'centered-text'}>
                <p className={'p-0 m-0 color-grey'}>Hech qanday tranzaksiya topilmadi...</p>
            </div>) : (<List dense={false}>
                <TransitionGroup>
                    {transactions.map((transaction, index) => (
                        <Slide key={index} direction={"up"} in={true} mountOnEnter unmountOnExit timeout={300 + 500 * index}>
                            <ListItem key={index} className={'border-bottom'}>
                                <ListItemIcon>
                                    {transaction.type === 'inc' ? <ArrowDownwardIcon color={"success"}/> :
                                        <ArrowUpwardIcon color={"error"}/>}
                                </ListItemIcon>
                                <ListItemText
                                    primary={transaction.amount + " " + transaction.currency}
                                    secondary={
                                        <React.Fragment>
                                            <Typography component={"span"}>
                                                <Tooltip
                                                    title={"Kategoriya"}
                                                    arrow={true}
                                                    slots={{transition: Fade,}}
                                                    slotProps={{transition: {timeout: 600},}}
                                                >
                                                    <span>{categories.find((item) => item.value === transaction.category).name}</span>
                                                </Tooltip> /
                                                <Tooltip
                                                    title={"Tranzaksiya sanasi"}
                                                    arrow={true}
                                                    slots={{transition: Fade,}}
                                                    slotProps={{transition: {timeout: 600},}}
                                                >
                                                    <span>{transaction.date}</span>
                                                </Tooltip> /
                                                <Tooltip
                                                    title={"Tranzaksiya izohi"}
                                                    arrow={true}
                                                    slots={{transition: Fade,}}
                                                    slotProps={{transition: {timeout: 600},}}
                                                >
                                                    <span>{transaction.description}</span>
                                                </Tooltip>
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </Slide>
                    ))}
                </TransitionGroup>
            </List>)}
        </div>
    )
}

export default HistoryList;