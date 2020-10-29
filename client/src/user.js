import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { TabPanel } from "./TabPanel";
import RentBook from "./RentBook";
import ReturnBook from "./ReturnBook";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const User = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const doLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("usertype");
    window.location.reload();
  };

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Rent Book" {...a11yProps(0)} />
          <Tab label="Return Book" {...a11yProps(1)} />
          <Button variant="contained" color="primary" onClick={doLogout}>
            Logout
          </Button>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <RentBook />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReturnBook />
      </TabPanel>
    </>
  );
};

export { User };
