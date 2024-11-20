const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyPoints = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send((newItemPrice + cartTotal).toString());
});

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember === 'true';
  let cartTotal = parseFloat(req.query.cartTotal);
  let result;
  if (isMember) {
    result = cartTotal * ((100 - discountPercentage) / 100);
  } else {
    result = cartTotal;
  }
  res.send(result.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send((cartTotal * (taxRate / 100)).toString());
});

app.get('/estimate-delivery', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod == 'Standard';
  let result;
  if (shippingMethod) {
    result = distance / 50;
  } else {
    result = distance / 100;
  }
  res.send(result.toString());
});

app.get('/shipping-cost', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);
  res.send((distance * weight * 0.1).toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send((purchaseAmount * loyaltyPoints).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
