const express = require('express');
const Employee = require('../models/employee');


const router = express.Router();

// get employees
router.get('/', (req, res) => {
  Employee.find({}, (err, employees) =>{
    if(err) return res.status(500).send({message: 'Error: ${err}'})
    if(!employees) return res.status(404).send({message: 'The Employee Does not Exist'})

    res.status(200).send({ employees })
  })

});

//GetEmployeebyId API
router.get('/:EmployeeId', function (req, res, next) {
  Employee.findOne({'EmployeeId': req.body.EmployeeId}, function(err, employee){
    if(err){
    console.log(err);
    return next (err);
  } else {
    console.log(employee);
    res.json(employee);
  }
})
});

router.get('/:EmployeeId/role', function(req, res, next) {
  Employee.findOne({EmployeeId : req.body.EmployeeId}, 'role', function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee.role);
      res.json(employee.role);
    };
  });
});

module.exports = router;
