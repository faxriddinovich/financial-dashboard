import './App.css';
import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import CurrencyConverter from "./components/CurrencyConverter";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Currencies from "./components/Currencies";

function tabsProps(index) {
  return {
    id: `tab${index}`,
    'aria-controls': `tab${index}`,
  }
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
          {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(Number(localStorage.getItem('activeTab')) || 0);
  const [balance, setBalance] = useState(Number(localStorage.getItem('balance')) || 0);
  const [currentCurrency, setCurrentCurrency] = useState('USD');

  const handleChangeTab = (event, newTab) => {
    setActiveTab(newTab);
    localStorage.setItem('activeTab', newTab);
  }

  const updateBalance = (val) => {
    console.log(val);
    setBalance(val);
    localStorage.setItem('balance', val);
  }
  return (
   <div className={'container'}>
     <div className="row">
       <div className="col-12">
         <Tabs value={activeTab} onChange={handleChangeTab} variant="fullWidth">
           <Tab label={"Valyutalar"} {...tabsProps(0)} wrapped />
           <Tab label={"Tranzaksiyalar"} {...tabsProps(1)} />
           <Tab label={"Konverter"} {...tabsProps(2)} />
           <Tab label={"Dashboard"} {...tabsProps(3)} />
         </Tabs>
         <CustomTabPanel value={activeTab} index={0}>
           <Currencies />
         </CustomTabPanel>
         <CustomTabPanel value={activeTab} index={1}>
           <Transactions balance={balance} currentCurrency={currentCurrency} updateBalance={updateBalance} />
         </CustomTabPanel>
         <CustomTabPanel value={activeTab} index={2}>
           <CurrencyConverter />
         </CustomTabPanel>
         <CustomTabPanel value={activeTab} index={3}>
           <Dashboard currentCurrency={currentCurrency} balance={balance}/>
         </CustomTabPanel>
       </div>
     </div>
   </div>
  );
}

export default App;
