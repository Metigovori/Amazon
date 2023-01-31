import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

const Header = () => {
const [{basket,user}]   = useStateValue();

const login = () => {
   if (user) {
      auth.signOut();
      
   }
}

    return ( 
        <nav className="header">
      <Link to="/login">      
          <img className="header__logo" src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" alt="amazon-logo" />
       </Link>     


        <div className="header__search">     
           <input type="text" className="header__searchInput" />
           <SearchIcon className="header__searchIcon"/>
       </div>

       <div className="header__nav">
          <Link to={!user && "/login"} className="header__link">
          <div onClick={login} className="header__option">
             <span className="header___optionLineOne">{user ? `Hello ${user?.email}`: `Hello Guest`}</span>
             <span className="header__optionLineTwo">{user ? 'Sign Out': 'Sign In'}</span>
          </div>
          </Link>
          <Link to="/orders" className="header__link">
          <div className="header__option">
             <span className="header___optionLineOne">Returns</span>
             <span className="header__optionLineTwo">& orders</span>
          </div>
          </Link>
          <Link to="/" className="header__link">
          <div className="header__option">
             <span className="header___optionLineOne">Your</span>
             <span className="header__optionLineTwo">Prime</span>
          </div>
          </Link>
          <Link to="/checkout" className="header__link">
            <div className="header__optionBasket">
                <ShoppingBasketIcon/>
                <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>

            </div>
          </Link>
       </div>
  
        </nav>
     );
}
 
export default Header;