
/*=========================
Name: Gabriel Sanchez
Date: Dec, 02 2020
Description: API to save the history
==========================*/

const express = require('express');
const History = require('../models/history');
const router = express.Router();

//Find all history 
router.get('/', function(req, res, next) {
  History.find({}, function(err, history   ) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(history);
      res.json(history);
    }
  })
});

// Find Purchases By Service
router.get('/history-unwind', function(req, res, next) {
  History.aggregate([
    {"$unwind": "$history"},
    {
      "$group": {
        "_id": {
          "username": "$history.username",
          "barcode": "$history.barcode",
          "price": "$history.price",
          "barBoxNetWeight": "$history.barBoxNetWeight",
          "totalprice": "$history.totalprice",
          "itemdescription": "$history.itemdescription",
          "barProductCode": "$history.barProductCode",
          "orderDate": "$history.orderDate"
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



//Find by ID
router.get('/:histroyId', function(req, res, next) {
  History.findOne({'_id': req.params.history}, function(err, history) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(history);
      res.json(history);
    }
  })
});

//Create history
router.post('/', function(req, res, next) {
  let h = {
    date: req.body.date,
    history: req.body.history,
    leftoverhistory: req.body.history
  };
  History.create(h, function(err, history) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(history);
      res.json(history);
    }
  });
});



// Delete Role
// router.delete('/:roleId', function(req, res, next) {
//   Roles.findOneAndDelete({'_id': req.params.roleId}, function(err, role) {
//     if (err) {
//       console.log(err);
//       return next(err);
//     } else {
//       console.log(role);
//       res.json(role);
//     }
//   });
// });

module.exports = router;
