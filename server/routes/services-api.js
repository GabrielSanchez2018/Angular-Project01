// Create new servicess
// 5/3/2020

/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Sevices API's 
==========================*/


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
router.get('/:id', function(req, res, next){
  Services.findOne({'_id': req.params.id}, function(err, services){
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
    title: req.body.title,
    price : req.body.price,
    extimate: req.body.extimate,
    id : req.body.id
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
        title: req.body.title,
        price : req.body.price,
        extimate: req.body.extimate,
        id : req.body.id
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
router.delete('/:id', function(req, res, next) {
  Services.findOne({'_id': req.params.id}, function(err, services) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(err);

          if (services) {
              services.set({
              isDisabled: true
          });

          services.save(function(err, savedService) {
              if (err) {
                  console.log(err);
                  return next(err);
                  } else {
                  console.log(savedService);
                  res.json(savedService);
                  }
              })
          }
      }
  });
});

module.exports = router;
