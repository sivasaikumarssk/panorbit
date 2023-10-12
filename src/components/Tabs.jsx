import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Profile from "./Profile";
// import ComingSoon from "./Comingsoon";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const styles = {
  color: "red",
  width: "70%",
  marginLeft: "12%",
};

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log("new", newValue);
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "rgb(37 99 235 / var(--tw-bg-opacity))",
        display: "flex",
        height: 224,
        padding: "2%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          // borderColor: "divider",
          height: "80vh",
          paddingTop: "10%",
        }}
        className="border-2 border-indigo-500/100 w-[20%] h-[80vh] rounded-3xl bg-blue-600 text-stone-400 mt-[5%]"
      >
        <Tab
          style={{
            color: "white",
          }}
          label="Profile"
          {...a11yProps(0)}
        />
        <Divider style={styles} />
        <Tab
          style={{
            color: "white",
          }}
          label="Posts"
          {...a11yProps(1)}
        />
        <Divider style={styles} />
        <Tab
          style={{
            color: "white",
          }}
          label="Gallery"
          {...a11yProps(2)}
        />
        <Divider style={styles} />
        <Tab
          style={{
            color: "white",
          }}
          label="ToDo"
          {...a11yProps(3)}
        />
      </Tabs>
      <TabPanel
        value={value}
        index={0}
        className="w-[100%] h-[90vh] rounded-3xl"
      >
        <Profile index={0} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Profile index={1} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Profile index={2} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Profile index={3} />
      </TabPanel>
    </Box>
  );
}
