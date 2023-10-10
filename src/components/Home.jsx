import first from "../Images/9495457.png";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Cookies from "universal-cookie";
import ProfilePage from "./ProfilePage";

const cookies = new Cookies();

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

export const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://panorbit.in/api/users.json")
      .then((res) => {
        console.log("res", res.data.users);
        setData(res.data.users);
      })
      .catch((err) => console.log("error", err));
  }, []);

  const handleClick = (e) => {
    console.log("click", data[e - 1]);
    // localStorage.setItem("user", JSON.stringify(data[e - 1]));
    cookies.set("user", data[e - 1], { path: "/" });
    console.log("cookies value", cookies.get("user"));
  };
  return (
    <>
      <div>
        <img className="h-[110vh] w-[100%] static" src={first} alt="main" />
        <div className="absolute top-[25%] left-[38%] h-[80vh] w-[23%] overflow-scroll rounded-2xl">
          <div className="bg-white p-[5%]">
            <h3>Select an Account</h3>
          </div>
          {data.map((ele) => {
            return (
              <div key={ele.id}>
                <List sx={style} component="nav" aria-label="mailbox folders">
                  <ListItem button onClick={() => handleClick(ele.id)}>
                    <Avatar alt={ele.name} src={ele.profilepicture} /> &nbsp;
                    <ListItemText primary={ele.name} />
                  </ListItem>
                  <Divider />
                </List>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
