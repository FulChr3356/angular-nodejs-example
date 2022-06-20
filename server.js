const { response } = require('express');
const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const transactions = [];
const users = [];
let balance = 2000;

app.use(bodyParser.json());

app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});


app.post('/api/transaction', (req, res) => {
  const transaction = req.body.transaction;
  transactions.push(transaction);
  balance -= transaction.amount;
  res.json(`transaction addedd. New balance: ${balance}`);
});

app.post('/api/payment', (req, res) => {
  const payment = req.body.payment;
  balance += payment;
  res.json(`Payment posted New balance: ${balance}`);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

mongodb
nested
front anfular 
ionicjs
