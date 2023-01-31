import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const signIn = (e) => {
        e.preventDefault()
        // firebase comes in for the sign in

        auth.signInWithEmailAndPassword(email,password)
        .then((auth) => {
          history.push("/")
        })
        .catch(e => alert(e.message))
    }

    const register = e => {
        e.preventDefault();
        // firebase comes for the register
        auth.createUserWithEmailAndPassword(email,password)
        .then(auth => {
            history.push("/")
            console.log(auth);
        })
        .catch((e) => alert(e.message))
}



    return ( 
        <div className="login">
            <Link to='/'>
               <img className="login__logo" src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png" alt="amazon logo" />
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>

                <form >
                    <h5>E-mail</h5>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type='submit' onClick={signIn} className="login__signInButton">Sign In</button>
                </form>

                <p>
                    By signing-in you agree to AMAZON FAKE CLONE  Conditions of Use & Sale. Please see our Privacy Notice , our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button type="submit" onClick={register}className="login__registerButton">Create your Amazon account</button>
            </div>
        </div>
     );
}
 
export default Login;