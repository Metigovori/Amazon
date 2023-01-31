import { CardElement ,useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import './Payment.css';
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";


const Payment
 = () => {
    const [{basket , user }, dispatch] = useStateValue();

    const history = useHistory();
    const stripe = useStripe()
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [procesing, setProccesing] = useState("");

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);


    useEffect(() => {
       // generate that special stripe secret wich allows us to charge a costumer
        const getClientSecret = async () => {
           const response  = await axios({
            method:'post',
            //Stripe expects the total in cuurrencies subunits (10 dollar 10000 cents)
            url:`/payments/create?total=${getBasketTotal(basket) * 100}`
           });
           setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('the secret is >>>', clientSecret);

    const handleSubmit = async(e) => {
        // DO ALL THE FANCY STRIPE STUFF
      e.preventDefault();
      setProccesing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
            card: elements.getElement(CardElement)
        }
      }).then(({ paymentIntent }) => {

        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
            basket:basket,
            amount:paymentIntent.amount,
            created: paymentIntent.created
        })
        // payment intent
        setSucceeded(true);
        setError(null);
        setProccesing(false);

        dispatch({
            type:'EMPTY_BASKET'
        })

        history.replace('/orders')
      })

      // const payload = await stripe 
    }

    const handleChange = (e) => {
       // Listen for changes in the card element
       // and displays any errors as the costumer types their card details

       setDisabled(e.empty);
       setError(e.error ? e.error.message : "")
    }
  

    return ( 
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout ( {<Link to="/checkout">{basket?.length} items </Link>})
                </h1>



                {/* Payment section - delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>

                </div>

                 {/* Payment section - Review items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}/>
                        ))}
                    </div>
                    
                </div>
 
                {/* Payment section - Payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic will go */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                        </form>

                        <div className="payment__priceContainer">
                            <CurrencyFormat 
                               renderText={(value) => (
                                <h3>Order Total: {value}</h3>
                               )}
                               decimalScale={2}
                               value={getBasketTotal(basket)}
                               displayType={'text'}
                               thousandSeparator={true}
                               prefix={"$"}
                            />
                            <button disabled={procesing || disabled || succeeded} >
                                <span>{procesing ? <p>Proccesing
                                </p> : 'Buy Now'}</span>
                            </button>
                        </div>

                        {error && <div>{error}</div>}

                    </div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default Payment;