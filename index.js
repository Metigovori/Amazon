const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len, no-unused-vars
const stripe = require("stripe")("sk_test_51MRoyWFHunvpPRQDwiY2zAaL2woMRdAhBBnWn8CEABWPfYd7CjnYvmQXo42q2KgYQvK6fa5SBUEcIHVUobXjiQxA00K3knzlwC");
const bodyParser = require("body-parser");


// API

// - App config
const app = express();
app.use(bodyParser.json());

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());


// -APIroutes
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved Boom!! for this amount >>>", total);

  const paymentIntent = stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// - Listen command
exports.api = functions.https.onRequest(app);
