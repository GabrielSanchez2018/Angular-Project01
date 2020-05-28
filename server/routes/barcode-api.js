
const express = require('express');
const Barcodes = require('../models/barcode');

const router = express.Router();


// Get Barcodes
router.get('/', function(req, res, next){
  Barcodes.find({}, function(err, barcodes){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(barcodes);
      res.json(barcodes);
    }
  })
})

router.post('/barcodes', function(req, res, next){
  Barcodes.find({}, function(err, barcodes){

    if(err){
      console.log(err);
      return next(err)
    } else {
      console.log(barcodes);



      const barcodeId = req.body.barcode

      console.log(barcodeId)




      var shippingContainer = Array.from(barcodeId.slice(0,2));
      labelShippingContainer = shippingContainer.join('');
      //Packaging Indicator
      var packagingIndicator = Array.from(barcodeId.slice(2,3));
      labelpackagingIndicator = packagingIndicator.join('');
      // Manufacturer number
      var packagingManufacturerNumber = Array.from(barcodeId.slice(3,9));
      labelpackagingManufacturerNumber = packagingManufacturerNumber.join('')
      //Product Code
      var productCode = Array.from(barcodeId.slice(9,15));
      labelproductCode = productCode.join('');
      //Shipping Container
      var shippingContainercs = Array.from(barcodeId.slice(15,16));
      labelshippingContainercs = shippingContainercs.join('');
      //Net Weight
      var BoxNetWeightIdentifier = Array.from(barcodeId.slice(16,20));
      labelnetWeight = BoxNetWeightIdentifier.join('');

      //Box Weight
      var boxWeight = Array.from(barcodeId.slice(20,26));
      labelWeight = boxWeight.join('')/10;
      //Date of Production Indeentifier
      var dateIndenfier = Array.from(barcodeId.slice(26,28));
      labeldateindentifier = dateIndenfier.join('');
      //Date of Production yymmdd
      var dateOfProduction = Array.from(barcodeId.slice(28,34));
      labeldateofproduction = dateOfProduction.join('');
      //Serial Number
      var serialNumberIndenfier = Array.from(barcodeId.slice(34,36));
      labelserialnumber = serialNumberIndenfier.join('');
      //10 Digit Serial
      var serialIdenfier = Array.from(barcodeId.slice(34,46));
      labelserialidentifier = serialIdenfier.join('')


      const barcode = {

        username: req.body.username,
        barcode: req.body.barcode,
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
        barTenDigitSerial : labelserialidentifier
      }

      barcodes.barcode.push(barcode);
      barcodes.save(function(err, barcodes){
        if (err){
          console.log(err);
          return next(err);
        } else {
          console.log(barcodes);
          res.json(barcodes)
        }
      });

    }
  });
});



module.exports = router;
