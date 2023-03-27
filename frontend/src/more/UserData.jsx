import React, { useRef, useState } from "react";
import "./UserOption.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import {MdDashboard} from "react-icons/md";
import {FaShippingFast} from "react-icons/fa"
import {MdExitToApp} from "react-icons/md";
import {BsFillPersonFill} from "react-icons/bs";
import {FaRegListAlt} from "react-icons/fa";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {BiSupport} from "react-icons/bi";
import {AiOutlineHeart} from "react-icons/ai";
import {AiOutlineHome} from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useAlert } from "react-alert";
import { logout } from "../actions/userActions";


const UserData = ({ user }) => {
  
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const scrollEffect = useRef(null);

  window.addEventListener("scroll", () =>{
    if(window.pageYOffset > 100){
        document.querySelector(".speedDial").classList.add("active");
    }
    else{
      document.querySelector(".speedDial").classList.remove("active");
    }
  })

  // const alert = useAlert();

  const dispatch = useDispatch();

  const options = [
    { icon: <AiOutlineHome />, name: "Home", func: home },
    { icon: <FaRegListAlt />, name: "Orders", func: orders },
    {
      icon: (
        <AiOutlineShoppingCart
        style={{
         color: 
          "tomato",
        }}
        />
      ),
      name: "Cart",
      func: cart,
    },
    {
      icon:
        <AiOutlineHeart />,
      name:
      `Favourite`,
      func: favourite,
    },
    { icon: <BsFillPersonFill />, name: "Profile", func: account },
    { icon: <BiSupport />, name: "Report us", func: report },
    { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  if (user.role === "Creator") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  if (user.role === "shipper") {
    options.unshift({
      icon: <FaShippingFast />,
      name: "Shipper",
      func: shipper,
    });
  }

  function dashboard() {
    history.push("/dashboard");
  }
  function shipper() {
    history.push("/shipper");
  }
  function home() {
    history.push("/");
  }
  function orders() {
    history.push("/orders");
  }
  function cart() {
    history.push("/cart");
  }
  function favourite() {
    history.push("/favourites");
  }
  function account() {
    history.push("/me");
  }

  function report() {
    history.push("/support");
  }

  function logoutUser() {
    dispatch(logout());
    alert("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        useRef={scrollEffect}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : ("/profile.png")}
            alt="Profile"
            style={{
              position:"fixed"
            }}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserData;