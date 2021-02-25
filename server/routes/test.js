
const express = require('express');
var router = express.Router();
var request = require('request');






router.get('/testing', function(req, res, next) {

  //Custom Header pass


  request({
    uri: 'https://secure.paycor.com/documents/api/documenttypes',
    qs: {
      publicKey: 'Key82be69a0e95448b9bc50232e85b280',
      privateKey: 'Key82be69a0e95448b9bc50232e85b280',
      paycorapi: {  
        "content-type": "application/json, application/xml"

      }

    }

    
  }).pipe(res);
 
  
  console.log(res)
});


module.exports = router;