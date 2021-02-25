/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Employee API
==========================*/

const express = require('express');
const Employee = require('../models/employee');
const { rename } = require('fs');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
const os = require('os');
const { find } = require('../models/employee');



const computerName = os.hostname()

console.log(computerName)



const router = express.Router();

// // get employees
// router.get('/', (req, res) => {
//   Employee.find({}, (err, employees) =>{
//     if(err) return res.status(500).send({message: 'Error: ${err}'})
//     if(!employees) return res.status(404).send({message: 'The Employee Does not Exist'})

//     res.status(200).send({ employees })
//   })

// });


// Get Barcodes
router.get('/', function(req, res, next){
  Employee.find({}, function(err, employee){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(employee);
      res.json(employee);   
    }
  })
})


//Get computer Name for Loging features
router.get('/computerName', (req, res) =>{
  const computerName = os.hostname()
  res.json(computerName)
})

// router.get('/:EmployeeID', function(req, res, next){
//   Employee.findOne({'EmployeeID': req.params.EmployeeID }, function(err, employee){
//     const EmployeeNumberId = req.params.EmployeeID
//     if(err){
//       console.log(err);
//       return next (err);
//     } else {
//       res.json(employee)
//       console.log('LetterId', EmployeeNumberId)
//       console.log('emp', employee)
//       if(employee === null ){
//         next
       
//       } else{
//         Employee.findOne({'EmployeeNumberId': EmployeeNumberId}, function(err, employee){
//           if(err){
//             console.log(err);
//             return next(err)
//           } else{
//             res.json(employee)
//             console.log('numeric Employee', employee)
//           }
//         })
//       }


//       if(res.emp === null){
//         return err
//         // Employee.findOne({'EmployeeNumberId': EmployeeNumberId}, function(err, employee){
//         //   if(err){
//         //     console.log(err);
//         //     return next(err)
//         //   } else{
//         //     res.json(employee)
//         //     console.log('numeric Employee', employee)
//         //   }
//         // })
//       }
//     }

//   })
// })

//GetEmployeebyId API
router.get('/:EmployeeID', function (req, res, next) {
  Employee.findOne({'EmployeeID': req.params.EmployeeID }, function(err, employee){
    if(err){
    console.log(err);
    return next (err);
  } else {
    res.json(employee);
  

  } 
  }) 
  console.log(res)
  
    // res.status(200).send({
    //   type: 'success',
    //   auth: true,
    //   time_stamp: new Date()
   // })
  
})


//Get Employee by numeric ID
// router.get('/:EmployeeNumberId', function (req, res, next) {
//   Employee.findOne({'EmployeeNumberId': req.params.EmployeeNumberId}, function(err, employee){
//     if(err){
//     console.log(err);
//     return next (err);
//   } else {
//     console.log('this is the employee',employee);
//     res.json(employee);
//     // res.status(200).send({
//     //   type: 'success',
//     //   auth: true,
//     //   time_stamp: new Date()
//    // })
//   }
// })
// });


router.get('/:EmployeeId/role', function(req, res, next) {
  Employee.findOne({EmployeeId : req.body.EmployeeId}, 'role', function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      // console.log('this is the employee role',employee.role);
      // res.json(employee.role)

      /***
       * When the user erases all employees, this employee api throws an error
       * This if statements will help to get rid of the error
       * With no employee data in the employee collection, this API emits an error, the following
       * var employee array solves the problem.
       */
      console.log('this employee', employee)
      if(employee === null){
       var employee = [
          {role:'standard'},
       ]
        console.log('this is the employee array',employee[0].role)
        return res.json(employee[0].role)
      } else {
        res.json(employee.role)
      }
    }
  });
});

// router.get('/:EmployeeNumberId/role', function(req, res, next) {
//   Employee.findOne({EmployeeNumberId : req.body.EmployeeNumberId}, 'role', function(err, employee) {
//     if (err) {
//       console.log(err);
//       return next(err);
//     } else {
//       // console.log('this is the employee role',employee.role);
//       // res.json(employee.role)

//       /***
//        * When the user erases all employees, this employee api throws an error
//        * This if statements will help to get rid of the error
//        * With no employee data in the employee collection, this API emits an error, the following
//        * var employee array solves the problem.
//        */
//       console.log('this employee', employee)
//       if(employee === null){
//        var employee = [
//           {role:'standard'},
//        ]
//         console.log('this is the employee array',employee[0].role)
//         return res.json(employee[0].role)
//       } else {
//         res.json(employee.role)
//       }
//     }
//   });
// });


// router.get('/:EmployeeId/role', function(req, res, next) {
//   Employee.findOne({EmployeeId : req.body.EmployeeId}, 'role', function(err, employee) {
//     if (err) {
//       console.log(err);
//       return next(err);
//     } else {
//       console.log(employee.role);
//       res.json(employee.role);
//     };
//   });
// });

//Create New employee
router.post('/', function(req, res, next) {
  let emp = {
    EmployeeID: req.body.EmployeeID,
    LastName: req.body.LastName,
    FirstName: req.body.FirstName,
    Department: req.body.Department,
    //EmpEmployeeNumberId: req.body.EmployeeNumberId
    // role: {type: String, default: 'standard'},
  };
  Employee.create(emp, function(err, Emp) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Emp);
      res.json(Emp);
    }
  });
});



module.exports = router;
