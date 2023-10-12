import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = ({ index }) => {
  console.log("index", index);
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
    height: "50vh",
    borderRadius: "5%",
  };

  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   const cookies = new Cookies();
  useEffect(() => {
    const ifameData = document.getElementById("iframeId");
    ifameData.src = `https://maps.google.com/maps?q=${address?.geo?.lat},${address?.geo?.lng}&hl=es;&output=embed`;
  });
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("user")));
    setAddress(JSON.parse(localStorage.getItem("user")).address);
  }, []);

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
        <div className=" m-7 h-[10vh] w-[90%] rounded-3xl flex justify-between">
          <div className="mt-[3%] font-semibold font-sans text-3xl text-gray-500">
            {index === 1
              ? "Posts"
              : index === 2
              ? "Gallery"
              : index === 3
              ? "ToDo"
              : "Profile"}
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ListItem>
                  <Avatar alt={data.name} src={data.profilepicture} /> <br />
                  <ListItemText primary={data.name} /> <br />
                  <ListItemText primary={data.email} />
                </ListItem>
                <Divider />
                {/* <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography> */}
              </Box>
            </Modal>
          </div>
          <div>
            <List sx={style} component="nav" aria-label="mailbox folders">
              <ListItem button onClick={handleOpen}>
                <Avatar alt={data.name} src={data.profilepicture} /> &nbsp;
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
                Username : {data?.username} <br />
                email : {data?.email} <br />
                Phone : {data?.phone} <br />
                Website : {data?.website} <br />
              </div>
              <div
                style={{
                  border: "1px solid lightgrey",
                  width: "90%",
                }}
              ></div>
              <h3>Company</h3>
              <div className="text-start">
                Name : {data?.company?.name} <br />
                catchphrase : {data?.company?.catchPhrase} <br />
                bs : {data?.company?.bs} <br />
              </div>
            </div>

            <div className=" h-[55vh] w-[70%] border-l-2 border-l-lightgrey-500 mt-5 text-start pl-[10%] ">
              <div>
                Address : <br />
              </div>
              Street : {address?.street} <br />
              Suite : {address?.suite} <br />
              City : {address?.city} <br />
              Zipcode : {address?.zipcode} <br />
            </div>
            <div className="absolute top-[50%] ml-[20%] ">
              <iframe
                id="iframeId"
                height="300px"
                width="200%"
                className="rounded-3xl "
              ></iframe>
              <small className="flex ml-[140%] w-[90%]">
                Lat : {address?.geo?.lat} &nbsp; Long : {address?.geo?.lng}
              </small>
            </div>
          </div>
        ) : index === 2 ? (
          <img
            src="https://img.freepik.com/free-vector/coming-soon-background-with-focus-light-effect-design_1017-27277.jpg?w=740&t=st=1697021501~exp=1697022101~hmac=9728ed32e1f40d973e953be62a46180d8a7a21033bd3f2ff0ec93e58df08a325"
            alt="comingsoon"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Profile;
