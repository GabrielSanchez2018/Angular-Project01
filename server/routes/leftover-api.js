var mongoose = require('mongoose');
const express = require('express');
const Leftover = require('../models/leftover');

const router = express.Router();



// Get Barcodes
router.get('/', function(req, res, next){
  Leftover.find({}, function(err, orderverify){
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
router.get('/leftover-report', function(req, res, next) {
  Leftover.aggregate([
    //First function is to get rid of an error
    {
      "$group": {
        "code": {"$first": "$barProductCode"},
        "_id": "$itemdescription",
        //"itemdescription": {"$first": "$itemdescription"},
        "price": {"$first":"$price"},
        "count": {"$sum": 1},

       "totalweight" : {"$sum": "$barBoxNetWeight"},
       "totalprice": {"$sum": "$totalprice" },
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
  
  
     Leftover.create(barcodeInsert, function(err, barcodes){
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

   //delete api
   router.delete('/:barcodeId', function(req, res, next){
    Leftover.findOneAndDelete({'_id': req.params.barcodeId}, function(err, barcodes){
      if(err) {
        console.log(err);
        return next(err);
      } else {
        console.log(barcodes);
        res.json(barcodes);
      }
    })
  })
  

   
module.exports = router;