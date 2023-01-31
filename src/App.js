import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Checkout from './Checkout';
import { auth } from './firebase';
import Header from "./Header";
import Home from './Home';
import Login from './Login';
import Payment from './Payment'
import { useStateValue } from './StateProvider';
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";
import Orders from './Orders';

const promise = loadStripe('pk_test_51MRoyWFHunvpPRQDziOoEEyj2rVVPn1tMPyygsAq0G2r37v2Jfuxy5ffcICg3kflzVeWcMrhirzlhowkWAbj6ICI00CvlsyoWW');

function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
    if(authUser){
      
      dispatch({
        type:"SET_USER",
        user: authUser
      })
    }else{
      dispatch({
        type:"SET_USER",
        user: null
      })
    }
   })
   return () => {
    //Any cleanup operations go in here
     unsubscribe();
   }
  }, [])

  console.log("user is >>>",user);

  return (
    <Router> 
     
      <div className="App">
          
        <Switch> 
           <Route exact path="/order">
            <Header/>
             <Orders/>
           </Route>
           <Route exact path="/login">
             <Login/>
           </Route>
           <Route exact path="/checkout">
             <Header/>
             <Checkout/> 
          </Route> 
          <Route exact path="/payment">
               
            <Elements stripe={promise}>
                <Payment/>
            </Elements>
          </Route>
            <Route exact path="/">
               <Header/>
               <Home/>
           </Route>
        </Switch> 
      </div>
    </Router>
  
  );
}

export default App;

