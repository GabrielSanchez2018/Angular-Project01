/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Order Verify API's
==========================*/


var mongoose = require('mongoose');
const express = require('express');
const Orderverify = require('../models/order-verify');

const router = express.Router();



// Get Barcodes
router.get('/', function(req, res, next){
  Orderverify.find({}, function(err, orderverify){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(orderverify);
      res.json(orderverify);
    }
  })
})

// Find Barcode Report
router.get('/orderverify-graph', function(req, res, next) {
  Orderverify.aggregate([
    //First function is to get rid of an error
    {
      "$group": {
        "code": {"$first": "$barProductCode"},
        "_id": "$itemdescription",
        "price": {"$first":"$price"},
        //"itemdescription": {"$first": "$itemdescription"},
        "count": {"$sum": 1},
        "totalprice": {"$sum": "$totalprice" },
       "totalweight" : {"$sum": "$barBoxNetWeight"},
       //"username": {"$first": "$username"},
      },



    // {
    //   "$group": {
    //     "_id":  {
    //       "code": "$barProductCode",
    //       "itemdescription": "$itemdescription",
    //       "username": "$username",
    //       //"price": "$totalprice",
    //      //"totalWeight": {"$sum": "$barBoxNetWeight"}
    //     },
    //     "count": {"$sum": 1},
    //   }
    }, {"$sort": {"totalprice": -1}},
  ], function(err, barcodeGraph) {
      if(err) {
        console.log(err);
        return next(err);
      } else {
        console.log("--PurchaseGraph data structure--");
        console.log(barcodeGraph);
        res.json(barcodeGraph);
      }
  });
});

// Api Item total by employee when they select two items
router.get('/order-sum', function(req, res, next){
  Barcodes.aggregate([
  {"$match":{} },
  {"$group": {"_id": "$username", "total":{"$sum": "$totalprice"}}},

  ], function(err, ordergraph){
    if(err) {
      console.log(err);
      return next(err);
    } else {
      console.log("--PurchaseGraph data structure--");
      console.log(ordergraph);
      res.json(ordergraph);
    }
  });
});



//Post Barcode
router.post('/', function(req, res, next){
  // get the request's form data
   const barcode = req.body.barcode
   console.log('this is the barcode input from the console.', barcode)

   const shippingContainer = Array.from(barcode.slice(0,2));
   labelShippingContainer = shippingContainer.join('');
   //Packaging Indicator
   var packagingIndicator = Array.from(barcode.slice(2,3));
   labelpackagingIndicator = packagingIndicator.join('');
   // Manufacturer number
   var packagingManufacturerNumber = Array.from(barcode.slice(3,9));
   labelpackagingManufacturerNumber = packagingManufacturerNumber.join('')
   //Product Code
   var productCode = Array.from(barcode.slice(9,15));
   labelproductCode = productCode.join('');
   //Shipping Container
   var shippingContainercs = Array.from(barcode.slice(15,16));
   labelshippingContainercs = shippingContainercs.join('');
   //Net Weight
   var BoxNetWeightIdentifier = Array.from(barcode.slice(16,20));
   labelnetWeight = BoxNetWeightIdentifier.join('');

   //Box Weight
   var boxWeight = Array.from(barcode.slice(20,26));
   labelWeight = boxWeight.join('')/10;
   //Date of Production Indeentifier
   var dateIndenfier = Array.from(barcode.slice(26,28));
   labeldateindentifier = dateIndenfier.join('');
   //Date of Production yymmdd
   var dateOfProduction = Array.from(barcode.slice(28,34));
   labeldateofproduction = dateOfProduction.join('');
   //Serial Number
   var serialNumberIndenfier = Array.from(barcode.slice(34,36));
   labelserialnumber = serialNumberIndenfier.join('');
   //10 Digit Serial
   var serialIdenfier = Array.from(barcode.slice(34,46));
   labelserialidentifier = serialIdenfier.join('');

   let barcodeInsert = {
            username: req.body.username,
             barcode: req.body.barcode,
             price: req.body.price,
             totalprice: req.body.totalprice,
             itemdescription: req.body.itemdescription,
             barShippingContainerCode : labelShippingContainer,
             barPackagingIndicator : labelpackagingIndicator,
             barManufacturerNumber : labelpackagingManufacturerNumber,
             barProductCode : labelproductCode,
             barShippingContainerCS : labelshippingContainercs,
             barBoxNetWeightIdentifier: labelnetWeight,
             barBoxNetWeight : labelWeight,
             barDateOfProduction : labeldateindentifier,
             barDateOfProductionyymmdd : labeldateofproduction,
             barSerialNumberIndentifier: labelserialnumber,
             barTenDigitSerial : labelserialidentifier,
             orderDate: req.body.orderDate


   };


   Orderverify.create(barcodeInsert, function(err, barcodes){
     console.log(barcodeInsert)
     console.log('here it is', barcodes)
     if(err){
       console.log(err);
       return next(err);
     } else {
       console.log(barcodes);
       res.json(barcodes)
     }
   });

 });

 //Find barcode by Id
router.get('/:usernameId', function(req, res, next){
  Orderverify.findOne({'username' : req.params.usernameId}, function(err, barcodes){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(barcodes);
      res.json(barcodes)
    }
  })
})
// Get all Barcodes
router.get('/', function(req, res, next){
  Orderverify.find({}, function(err, barcodes){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(barcodes);
      res.json(barcodes)
    }
  });
});
router.delete('/alldelete', function () {
  console.log("db connect");
  var db = mongoose.connection;
  db.dropCollection("barcodes", function (err, result) {
      if (err) {
          console.log("error delete collection");
      } else {

          console.log("delete collection success");

      }

  });


})






router.delete('/:barcodeId', function(req, res, next){
  Orderverify.findOneAndDelete({'_id': req.params.barcodeId}, function(err, barcodes){
    if(err) {
      console.log(err);
      return next(err);
    } else {
      console.log(barcodes);
      res.json(barcodes);
    }
  })
})


// Delete all records


// router.post('/barcodes', function(req, res, next){
//   Barcodes.find({}, function(err, barcodes){

//     if(err){
//       console.log(err);
//       return next(err)
//     } else {
//       console.log(barcodes);



//       const barcodeId = req.body.barcode

//       console.log(barcodeId)




//       var shippingContainer = Array.from(barcodeId.slice(0,2));
//       labelShippingContainer = shippingContainer.join('');
//       //Packaging Indicator
//       var packagingIndicator = Array.from(barcodeId.slice(2,3));
//       labelpackagingIndicator = packagingIndicator.join('');
//       // Manufacturer number
//       var packagingManufacturerNumber = Array.from(barcodeId.slice(3,9));
//       labelpackagingManufacturerNumber = packagingManufacturerNumber.join('')
//       //Product Code
//       var productCode = Array.from(barcodeId.slice(9,15));
//       labelproductCode = productCode.join('');
//       //Shipping Container
//       var shippingContainercs = Array.from(barcodeId.slice(15,16));
//       labelshippingContainercs = shippingContainercs.join('');
//       //Net Weight
//       var BoxNetWeightIdentifier = Array.from(barcodeId.slice(16,20));
//       labelnetWeight = BoxNetWeightIdentifier.join('');

//       //Box Weight
//       var boxWeight = Array.from(barcodeId.slice(20,26));
//       labelWeight = boxWeight.join('')/10;
//       //Date of Production Indeentifier
//       var dateIndenfier = Array.from(barcodeId.slice(26,28));
//       labeldateindentifier = dateIndenfier.join('');
//       //Date of Production yymmdd
//       var dateOfProduction = Array.from(barcodeId.slice(28,34));
//       labeldateofproduction = dateOfProduction.join('');
//       //Serial Number
//       var serialNumberIndenfier = Array.from(barcodeId.slice(34,36));
//       labelserialnumber = serialNumberIndenfier.join('');
//       //10 Digit Serial
//       var serialIdenfier = Array.from(barcodeId.slice(34,46));
//       labelserialidentifier = serialIdenfier.join('')


//       const barcode = {

//         username: req.body.username,
//         barcode: req.body.barcode,
//         barShippingContainerCode : labelShippingContainer,
//         barPackagingIndicator : labelpackagingIndicator,
//         barManufacturerNumber : labelpackagingManufacturerNumber,
//         barProductCode : labelproductCode,
//         barShippingContainerCS : labelshippingContainercs,
//         barBoxNetWeightIdentifier: labelnetWeight,
//         barBoxNetWeight : labelWeight,
//         barDateOfProduction : labeldateindentifier,
//         barDateOfProductionyymmdd : labeldateofproduction,
//         barSerialNumberIndentifier: labelserialnumber,
//         barTenDigitSerial : labelserialidentifier
//       }

//       barcodes.barcode.push(barcode);
//       barcodes.save(function(err, barcodes){
//         if (err){
//           console.log(err);
//           return next(err);
//         } else {
//           console.log(barcodes);
//           res.json(barcodes)
//         }
//       });

//     }
//   });
// });



module.exports = router;
