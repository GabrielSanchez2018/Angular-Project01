
/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for time
==========================*/

const express = require('express');
const Timer = require('../models/timer');
const { Time } = require('mssql');
const router = express.Router();


//Get Time
router.get('/', function(req, res, next) {
  Timer.find({}, function(err, time) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(time);
      res.json(time);
    }
  })
});

// Delete time
router.delete('/:timeId', function(req, res, next) {
  Timer.findOneAndDelete({'_id': req.params.timeId}, function(err, time) {
    console.log('this time', time)
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(time);
      res.json(time);
    }
  });
});

// Post Time
router.post('/', function(req, res, next) {
  let r = {

    time: req.body.time,
    time1: req.body.time1,
    orderDate: req.body.orderDate
  };
  console.log(r)
  Timer.create(r, function(err, time) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(time);
      res.json(time);
    }
  });
});



//Update Time
router.put('/:timeId', function(req, res, next) {
  Timer.findOneAndUpdate({'_id': req.params.time}, function(err, time) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(time);
      time.set({
        text: req.body.text,
        time: req.body.time
      });

      time.save(function(err, time) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(time);
          res.json(time);
        }
      });
    }
  });
});



  module.exports = router;
