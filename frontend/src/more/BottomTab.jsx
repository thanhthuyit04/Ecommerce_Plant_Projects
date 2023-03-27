  // eslint-disable-next-line
  import React from "react";
  import "./BottomTabs.css";
  import { Link } from "react-router-dom";
//   import { useSelector } from "react-redux";
  import {AiFillHome} from "react-icons/ai";
  import {AiOutlineSearch} from "react-icons/ai";
  import {AiFillMail} from "react-icons/ai";
  import {MdFavoriteBorder} from "react-icons/md";
  import {BsFillPersonFill} from "react-icons/bs";
  import {MdDehaze} from "react-icons/md";
  
  const BottomTab = () => {

    // const { cartItems } = useSelector((state) => state.cart);
    // const { favouriteItems } = useSelector((state) => state.favourite);

    return (
      <>
      <div className="bottomOption">
        <Link to="/">
          <AiFillHome
          style={{
            color:"#000",
            fontSize:"35px",
            margin:"5px",
            opacity:".8"
          }}
          />
        </Link>
        <Link to="/search">
         <AiOutlineSearch 
         style={{
          color:"#000",
          fontSize:"35px",
          margin:"5px"
        }}
         />
        </Link>
        <Link to="/cart">
          <div style={{
            position:"relative"
          }}>
          <AiFillMail 
           style={{
            color:"#000",
            fontSize:"35px",
            margin:"5px",
            opacity:".8"
          }} 
          />
          
           <span style={{
            position:"absolute",
            bottom:"70%",
            left:"10%",
            height:"20px",
            width:"20px",
            border:"none",
            background:"tomato",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:"50%",
            color:"#fff",
            fontWeight:"700"
        //   }}>{cartItems.length}</span>
           }}>10</span>
          </div>
        </Link>
        <Link to="/favourites">
          <div style={{
            position:"relative"
          }}>
          <MdFavoriteBorder 
          style={{
            color:"#000",
            fontSize:"35px",
            margin:"5px",
            opacity:".8",
          }} 
          />
           <span style={{
            position:"absolute",
            bottom:"70%",
            left:"10%",
            height:"20px",
            width:"20px",
            border:"none",
            background:"tomato",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:"50%",
            color:"#fff",
            fontWeight:"400",
        //   }}>{favouriteItems.length}</span>
          }}>6</span>
          </div>
        </Link>
        <Link to="/me">
        <BsFillPersonFill 
         style={{
          color:"#000",
          fontSize:"35px",
          margin:"5px",
          opacity:".8"
        }}
        />
        </Link>
        <Link to="/more">
          <MdDehaze style={{
            color:"#000",
            fontSize:"35px",
            margin:"5px",
            opacity:".8"
          }} />
        </Link>
      </div>
      </>
    );
  };
  
  export default BottomTab;
  