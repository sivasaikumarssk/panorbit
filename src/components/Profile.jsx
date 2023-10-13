import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Divider, Radio } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

// chat drawer constants
const drawerBleeding = 56;

// chat drawer css
const Root = styled("div")(({ theme }) => ({
  height: "100%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Profile = ({ index }, props) => {
  console.log("index", index);
  const { window } = props;
  const [openChat, setOpenChat] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenChat(newOpen);
  };

  const handleChatOpen = (e) => {
    e.target.tagName == "P" && setOpenChat(!openChat);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const styles = {
    width: "100%",
    maxWidth: 280,
    bgcolor: "background.paper",
    height: "50vh",
    borderRadius: "5%",
    marginTop: "10%",
    marginLeft: "65%",
    overflow: "hidden",
  };
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [address, setAddress] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cookies = new Cookies();
  const ifameData = document.getElementById("iframeId");
  const lat = 1.305385;
  const lon = 30.923029;
  // useEffect(() => {
  //   googleMapsFunction();
  // }, [address]);
  const googleMapsFunction = () => {
    ifameData.src = `https://maps.google.com/maps?q=${
      address?.geo ? address?.geo?.lat : lat
    },${address?.geo ? address?.geo?.lng : lon}&hl=es;&output=embed`;
  };
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("user")));
    setAddress(JSON.parse(localStorage.getItem("user"))?.address);
    axios
      .get("https://panorbit.in/api/users.json?_limit=2")
      .then((res) => {
        console.log("usersList", res.data.users);
        setUsersList(res.data?.users);
      })
      .catch((err) => console.log("error", err));
  }, [open]);
  const handleChangeUser = (e) => {
    localStorage.setItem("user", JSON.stringify(usersList[e - 1]));
    cookies.set("user", usersList[e - 1]);
    setOpen(false);
  };
  const handleSignout = () => {
    cookies.remove("user");
    localStorage.removeItem("user");

    navigate("/");
  };

  //   const handleClick = (e) => {
  //     console.log("click", data[e - 1]);
  //     // localStorage.setItem("user", JSON.stringify(data[e - 1]));
  //     cookies.set("user", data[e - 1], { path: "/" });
  //     console.log("cookies value", cookies.get("user"));
  //   };
  //   const ListItems = ["Profile", "Posts", "Gallery", "ToDo"];

  console.log("dta", data);
  return (
    <div className="flex ">
      {/*<div className="border-2 border-indigo-500/100 w-[20%] h-[80vh] mt-[5%] rounded-3xl bg-blue-600 text-stone-400">
         <div className="mt-[70%]">
          {ListItems.map((el) => {
            return (
              <div key={el}>
                <ListItem button>
                  <ListItemText primary={el} className=" hover:text-white" />
                </ListItem>
                <Divider />
              </div>
            );
          })}
          
        </div> 
         <VerticalTabs /> 
      </div>*/}
      <div className=" w-[90%] h-[90vh] rounded-3xl">
        <div
          className={" m-7 h-[10vh] w-[90%] rounded-3xl flex justify-between"}
        >
          {/* Profile heading */}
          <div className="mt-[3%] font-semibold font-sans text-3xl text-gray-500">
            {index === 2
              ? "Posts"
              : index === 4
              ? "Gallery"
              : index === 6
              ? "ToDo"
              : "Profile"}
          </div>
          {/* Logout and users profile change modal */}
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styles}>
                <div className="ml-[30%]">
                  <Avatar
                    alt={data?.name}
                    src={data?.profilepicture}
                    className="ml-[20%]"
                  />
                  <strong>{data?.name}</strong> <br />
                  <small className="text-gray-500">{data?.email}</small>
                </div>
                <Divider />
                {/* userslist on the modal */}
                <div className="h-[5vh]">
                  {usersList
                    ?.filter((el) => {
                      if (el.id !== data.id) return true;
                      else return false;
                    })
                    .map((ele) => {
                      return (
                        <div key={ele.id} className="h-[85px]">
                          <List component="nav" aria-label="mailbox folders">
                            <ListItem
                              button
                              onClick={() => handleChangeUser(ele.id)}
                            >
                              <Avatar alt={ele.name} src={ele.profilepicture} />{" "}
                              &nbsp;
                              <ListItemText primary={ele.name} />
                            </ListItem>
                            <Divider />
                          </List>
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={handleSignout}
                  className="bg-red-500 text-white p-[2%] w-[40%] rounded-3xl relative left-[30%] top-[55%]"
                >
                  Sign out
                </button>
              </Box>
            </Modal>
          </div>
          {/* user image and logout  */}
          <div>
            <List component="nav" aria-label="mailbox folders">
              <ListItem button onClick={handleOpen}>
                <Avatar alt={data.name} src={data?.profilepicture} /> &nbsp;
                <ListItemText primary={data.name} />
              </ListItem>
            </List>
          </div>
        </div>
        <div
          style={{
            border: "1px solid lightgrey",
            width: "90%",
            margin: "auto",
          }}
        ></div>
        {/* user profile details  */}
        {index === 0 ? (
          <div className="flex justify-around">
            <div className="border-0 border-none-500/100 h-[55vh] w-[40%] rounded-3xl ml-[8%]">
              <Avatar
                alt="profile"
                src={data?.profilepicture}
                sx={{ width: "60%", height: "50%", marginLeft: "10%" }}
              />{" "}
              <br />
              <strong className="mr-[20%]">{data.name}</strong>
              <div className="text-start">
                Username : <strong>{data?.username}</strong> <br />
                email : <strong>{data?.email}</strong> <br />
                Phone : <strong>{data?.phone}</strong> <br />
                Website : <strong>{data?.website}</strong> <br />
              </div>
              <div
                style={{
                  border: "1px solid lightgrey",
                  width: "90%",
                }}
              ></div>
              <h3>Company</h3>
              <div className="text-start">
                Name : <strong>{data?.company?.name}</strong> <br />
                catchphrase : <strong>{data?.company?.catchPhrase}</strong>
                <br />
                bs : <strong>{data?.company?.bs}</strong> <br />
              </div>
            </div>

            <div className=" h-[55vh] w-[70%] border-l-2 border-l-lightgrey-500 mt-5 text-start pl-[10%] ">
              <div>
                Address : <br />
              </div>
              Street : <strong>{address?.street} </strong> <br />
              Suite : <strong>{address?.suite} </strong> <br />
              City : <strong>{address?.city} </strong> <br />
              Zipcode : <strong>{address?.zipcode} </strong> <br />
            </div>
            {/* google map based on lat and lng */}
            <div className="absolute top-[50%] ml-[20%] ">
              <iframe
                id="iframeId"
                height="300px"
                width="200%"
                className="rounded-3xl "
                title="map"
              ></iframe>
              <small className="flex ml-[140%] w-[90%]">
                Lat : {address?.geo?.lat} &nbsp; Long : {address?.geo?.lng}
              </small>
            </div>
          </div>
        ) : (
          <img
            className="h-[70vh] w-[1000px]"
            src="https://imgs.search.brave.com/og-WbxXrIXYBqXFzIv122yibGRx7ITot-TA9DVW6GjM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC8yNy8xNS9j/b21pbmctc29vbi1z/aWduLWlzb2xhdGVk/LW9uLXdoaXRlLWJh/Y2tncm91bmQtdmVj/dG9yLTIwMjUyNzE1/LmpwZw"
            alt="comingsoon"
          />
        )}
      </div>
      {/* chat drawer */}
      <div className="w-[10%]">
        <Root>
          <CssBaseline />
          <Global
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: "visible",
                width: "18%",
                marginLeft: "80%",
              },
            }}
          />

          <SwipeableDrawer
            allowSwipeInChildren={handleChatOpen}
            container={container}
            anchor="bottom"
            open={openChat}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
            onClick={handleChatOpen}
          >
            <StyledBox
              sx={{
                backgroundColor: "blue",
                color: "white",
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  p: 2,
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Chats <span className="absolute top-5 right-5"> ^</span>
              </Typography>
            </StyledBox>
            <StyledBox
              sx={{
                px: 2,
                pb: 2,
                height: "100%",
                overflow: "auto",
                width: "100%",
              }}
            >
              {usersList
                ?.filter((el) => {
                  if (el.id !== data.id) return true;
                  else return false;
                })
                .map((ele) => {
                  return (
                    <div key={ele.id} className="h-[85px]">
                      <List component="nav" aria-label="mailbox folders">
                        <ListItem>
                          <Avatar alt={ele.name} src={ele.profilepicture} />{" "}
                          &nbsp;
                          <ListItemText primary={ele.name} />
                          &nbsp;
                          <Radio
                            color="success"
                            readOnly={true}
                            checked={
                              ele.id % 2 === 0 || ele.id === 3 ? true : false
                            }
                          />
                        </ListItem>
                        <Divider />
                      </List>
                    </div>
                  );
                })}
              {/* <Skeleton variant="rectangular" height="100%" /> */}
            </StyledBox>
          </SwipeableDrawer>
        </Root>
      </div>
    </div>
  );
};

export default Profile;
