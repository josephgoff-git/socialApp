import "./market.scss";
import MarketPage from "../../assets/market.png";
import MarketPage2 from "../../assets/marketPage2.jpeg";
import MarketPage3 from "../../assets/marketPage3.jpeg";
import MarketPage4 from "../../assets/market4.jpeg";
import MarketPage5 from "../../assets/market5.jpeg";
import MarketPage6 from "../../assets/market6.jpeg";
import MarketPage7 from "../../assets/market7.jpeg";
import MarketPage8 from "../../assets/market8.jpeg";
import MarketPage9 from "../../assets/market9.jpeg";
import { useEffect } from "react";

const Market = () => {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);

  return (
    <div className="market">
      <div className="title">
        Market
      </div>
      
      <div className="container">
        <div className="top">
            <p>Shoes</p>
            <p>Apparel</p>
            <p>Accessories</p>
            <p>Electronics</p>
            <p>Home Decor</p>
            <p>Vehicles</p>
        </div>  
        <img src={MarketPage} alt="" />
        <img src={MarketPage2} alt="" style={{marginTop: "-5px"}}/>
        <img src={MarketPage9} alt="" style={{marginTop: "-5px", filter: "brightness(0.97)"}}/>
        <img src={MarketPage5} alt="" style={{marginTop: "-5px"}}/>
        <img src={MarketPage3} alt="" style={{marginTop: "-5px"}}/>
        <img src={MarketPage4} alt="" style={{marginTop: "-5px"}}/>
        <img src={MarketPage6} alt="" style={{marginTop: "-5px"}}/>
        <img src={MarketPage7} alt="" style={{marginTop: "-5px", filter: "brightness(0.96)"}}/>
        <img src={MarketPage8} alt="" style={{marginTop: "-5px", filter: "brightness(0.96"}}/>
        
        <div className="content">
          <div className="content1"></div>
          <div className="content2"></div>
          <div className="content3"></div>
          <div className="content4"></div>
          <div className="content5"></div>
          <div className="content6"></div>
          <div className="content7"></div>
          <div className="content8"></div>
          <div className="content9"></div>
          <div className="content10"></div>
          <div className="content11"></div>
          <div className="content12"></div>
          <div className="content13"></div>
        </div>
      </div>
    </div>
  );
};

export default Market;