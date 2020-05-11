/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 20, 2020
Assignment: Invoice API's
Description: all API's used for the Invoices.
==========================*/

const express = require('express');
const Invoice = require('../models/invoice');

const router = express.Router();


router.get('/', function(req, res, next){
  Invoice.find({}, function(err, invoices){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(invoices);
      res.json(invoices);
    }
  })
})


// Create Invoice
router.post('/:username', function(req, res, next) {
  const username = req.params.username;

  let invoice = {
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total,
      username: username,
      orderDate: req.body.orderDate
  };

  console.log(invoice);

  Invoice.create(invoice, function(err, newInvoice) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(newInvoice);
          res.json(newInvoice);
      }
  })
});

// Find Purchases By Service
router.get('/purchases-graph', function(req, res, next) {
  Invoice.aggregate([
    {"$unwind": "$lineItems"},

    {
      "$group": {
        "_id": {
          "title": "$lineItems.title",
          "price": "$lineItems.price"
        },
        "count": {"$sum": 1},
      }
    }, {"$sort": {"_id.title": 1}},
  ], function(err, purchaseGraph) {
      if(err) {
        console.log(err);
        return next(err);
      } else {
        console.log("--PurchaseGraph data structure--");
        console.log(purchaseGraph);
        res.json(purchaseGraph);
      }
  });
});

//this api goes after the purchase graph data structure because it mess it up if i put it before
router.get('/:usernameId', function(req, res, next){
  Invoice.find({'username': req.params.usernameId}, function(err, invoices){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(invoices);
      res.json(invoices);
    }
  })
})

module.exports = router;


