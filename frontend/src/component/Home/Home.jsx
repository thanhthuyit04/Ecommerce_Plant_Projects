import React, { useEffect } from 'react';
import "./Home.css";
import Header from './Header';
import Footer from './Footer';
import Carousel from "react-material-ui-carousel";
import background1 from "../../Assets/background1.jpg";
import background2 from "../../Assets/background2.jpg";
import ProductCard from '../Products/ProductCard';
import  {useDispatch, useSelector} from "react-redux"
import { clearErrors, getProduct } from "../../actions/ProductActions";
import MetaData from '../../more/Metadata';

const Home = () => {
  const dispatch = useDispatch();
  const { products,error } = useSelector(
    (state) => state.products
  );

   useEffect(() => {
    if(error){ 
      alert.error(error);
      dispatch(clearErrors());
 }
  dispatch(getProduct());
   }, [dispatch,error])

  return (
      <>
      <MetaData title="Home" />
      <Header />
        {/* Carousel */}
        <div className="banner">
               <Carousel>
                 <img src={background1} className="bgImg"/>
                 <img src={background2} className="bgImg"/>
               </Carousel>
             <div className="home__content">
               <div style={{
                 display:"flex",
                 alignItems:"center",
               }}>
               <h2 style={{
                 fontFamily: "Segoe Script",
                 fontSize: "3em",
                 fontWeight:"500"
               }}>Buy 2 Get</h2>
               <span style={{
                 padding:"10px",
                 backgroundColor:"#fff",
                 margin:"0px 10px",
                 textAlign:"center",
                 width:"150px",
                 height:"40px",
                 color: "#26c",
                 fontFamily: "Segoe Script",
                 fontSize: "2.4em",
                 display:"flex",
                 justifyContent:"center",
                 lineHeight:".7",
                 alignItems:"center"
               }}>1 Free</span>
               </div>
               <div>
                 <h2 style={{
                   fontSize:"4.5em",
                   fontFamily:"Poppins,sans-serif",
                   color:"#26c",
                 }}>Plants</h2>
               </div>
               <div>
                 <h2 style={{
                   fontSize:"4.5em",
                   fontWeight:"400",
                   fontFamily:"Poppins,sans-serif",
                   color:"#26c",
                   lineHeight:".7"
                 }}>Collection</h2>
               </div>
               <div>
                 <h2
                 style={{
                   fontWeight:"400",
                   fontFamily:"Poppins,sans-serif",
                   color:"#26c",
                   fontSize:"1em",
                   paddingTop:"10px"
                 }}
                 >
                 Get Free Shipping on all orders over $99.00
                 </h2>
               </div>
               <div>
                 <a href="#container">
                 <button type="submit" style={{
                   width:"135px",
                   height:"50px",
                   border:"none",
                   background:"#3BB77E",
                   margin:"10px 0",
                   fontSize:"1.2vmax",
                   color:"#fff",
                   cursor:"pointer"
                 }}
                 className="Home__button"
                 >SHOP NOW</button>
                 </a>
               </div>
             </div>
         </div>

         <h2 className="homeHeading">Featured Products</h2>
         <div className="container" id="container">
          {products && products.map((product) =>(
            <ProductCard key={product._id} product={product} />
          ))}
         </div>
         <Footer />
      </>
  );
};

export default Home;