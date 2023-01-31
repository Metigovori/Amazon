import React from "react";
import "./Home.css"
import Product from "./Product";



const Home = () => {
    return ( 
        <div className="home">
           <img className="home__image" src="	https://m.media-amazon.com/images/I/61W-QJozfgL._SX3000_.jpg" alt="home-img" />  
           
           <div className="home__row">
              <Product 
           id="12321341"
           title="Beats Studio Buds - True Wireless Noise Cancelling Earbuds - Compatible with Apple & Android, Built-in Microphone, IPX4 Rating, Sweat Resistant Earphones, Class 1 Bluetooth Headphones - Black"
           price={31}
           rating={5}
           image="https://m.media-amazon.com/images/I/51bRSWrEc7S._AC_SX342_.jpg"/>

          <Product 
           id="12321342"
           title="Logitech C920x HD Pro Webcam, Full HD 1080p/30fps Video Calling, Clear Stereo Audio, HD Light Correction, Works with Skype, Zoom, FaceTime, Hangouts, PC/Mac/Laptop/Macbook/Tablet - Black"
           price={119.96}
           rating={5}
           image="https://m.media-amazon.com/images/I/71iNwni9TsL._AC_SY355_.jpg"/>
           </div>

           <div className="home__row">
           <Product 
             id="12321343"
             title="Biblia de estudio del diario vivir RVR60 (Spanish Edition)"
             price={11.96}
             rating={5}
             image="https://m.media-amazon.com/images/I/41inJmCEz7L._SX337_BO1,204,203,200_.jpg"
           />

           <Product 
             id="12321344"
             title="SteelSeries Arctis 1 Wired Gaming Headset Detachable ClearCast Microphone  Lightweight Steel-Reinforced Headband  For PS5, PS4, PC, Xbox, Nintendo Switch, Mobile"
             price={49.99}
             rating={5}
             image="https://m.media-amazon.com/images/I/81V01sm1kaL._AC_UY327_FMwebp_QL65_.jpg"
           />

           <Product 
             id="12321345"
             title="Logitech G502 HERO High Performance Wired Gaming Mouse, HERO 25K Sensor, 25,600 DPI, RGB, Adjustable Weights, 11 Programmable Buttons, On-Board Memory, PC / Mac"
             price={24.99 }
             rating={5}
             image="https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_UY327_FMwebp_QL65_.jpg"
           />
           </div>

           <div className="home__row">
           <Product 
             id="12321346"
             title="KOORUI 24 Inch Computer Monitor Full HD 1920 x 1080p VA Display 75Hz 3000:1 Contrast Ratio with HDMI, VGA, Frameless, 75 x 75 mm VESA Mountable, Ergonomic Tilt, Black"
             price={95.99}
             rating={5}
             image="https://m.media-amazon.com/images/I/71TOE0w7DzL._AC_UY327_FMwebp_QL65_.jpg"
           />
           </div>


         
        </div>
      
     );
}
 
export default Home;