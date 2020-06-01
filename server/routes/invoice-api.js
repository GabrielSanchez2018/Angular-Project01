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

//Insert Barcode Schema into the invoce
//Create barcode
// router.post('/:username/barcode', function(req, res, next){
//   Invoice.findOne({username: req.params.username}, function(err, invoices){

//     if(err){
//       console.log(err);
//       return next(err)
//     } else {
//       console.log(invoices);



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

//       invoices.barcode.push(barcode);
//       invoices.save(function(err, invoices){
//         if (err){
//           console.log(err);
//           return next(err);
//         } else {
//           console.log(invoices);
//           res.json(invoices)
//         }
//       });

//     }
//   });
// });

//Find barcode by Id
router.get('/:usernameId/barcode', function(req, res, next){
  Invoice.findOne({usernameId : req.body.usernameId}, " username barcode", function(err, invoices){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(invoices);
      res.json(invoices)
    }
  })
})
// // Get all Barcodes
// router.get('/', function(req, res, next){
//   Barcodes.find({}, function(err, barcodes){
//     if(err){
//       console.log(err);
//       return next(err);
//     } else {
//       console.log(barcodes);
//       res.json(barcodes)
//     }
//   });
// });

//Delete Barcode
router.delete('/:usernameId/barcode/:barcodeId', function(req, res, next){
  Invoice.findOne({usernameId : req.params.usernameId}, function(err, invoices){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(invoices);


      const barcodeItem = invoices.barcode.find(
        barcode => barcode._id.toString() === req.params.barcodeId
      );

      if (barcodeItem) {
        invoices.barcode.id(barcode._id).remove();
        invoices.save(function(err, inv1){
          if(err){
            console.log(err);
            return next(err);
          } else {
            console.log(inv1);
            res.json(inv1)
          }
        });
      } else {
        console.log('Unable to locate barcode')
        res.status(200).send({
          type: 'warning',
          text: "unable to locate barcode"
        });
      }
    }
  });
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

//Delete Service

router.delete('/:id', function(req, res, next){
  Invoice.findOneAndDelete({'_id': req.params.id}, function(err, invoices){
    if(err) {
      console.log(err);
      return next(err);
    } else {
      console.log(invoices);
      res.json(invoices);
    }
  })
})


module.exports = router;



