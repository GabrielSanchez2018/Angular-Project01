
/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for time
==========================*/

const express = require('express');
const Timer = require('../models/timer');
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

// Post Time
router.post('/', function(req, res, next) {
  let r = {
    text: req.body.text,
    time: req.body.time
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

  module.exports = router;
