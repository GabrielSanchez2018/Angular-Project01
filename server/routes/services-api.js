// Create new servicess
// 5/3/2020


const express = require('express');
const Services = require('../models/service');
const router = express.Router();




// Create service
router.get('/', function(req, res, next) {
  Services.find({}).where('isDisabled').equals(false).exec(function(err, services) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(services);
      res.json(services);
    }
  })
});

// Find by Id
router.get('/:serviceId', function(req, res, next){
  Services.findOne({'_id': req.params.serviceId}, function(err, services){
    if(err) {
      console.log(err);
      return next(err);
    }else {
      console.log(services);
      res.json(services)
    }
  })
})

// Create new service
router.post('/', function(req, res, next){
  let newService = {
    description: req.body.description,
    price : req.body.price
  };

  Services.create(newService, function(err, services){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(services);
      res.json(services)
    }
  });
});
// Update service

router.put('/:serviceId', function(req, res, next){
  Services.findOne({'_id': req.params.serviceId}, function(err, services){
    if(err) {
      console.log(err);
      return next(err);
    } else {
      console.log(services);

      services.set({
        description: req.body.description,
        price : req.body.price
      });

      services.save(function(err, services){
        if(err) {
          console.log(err);
          return next(err);
        } else {
          console.log(services);
          res.json(services);
        }
      });
    }
  });
});

//Delete Service
router.delete('/:serviceID', function(req, res, next){
  Services.findOne({'_id': req.params.serviceID}, function(err, services){
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(services);
      res.json(services);
    }
  });
});

module.exports = router;
