const express = require('express');
const Employee = require('../models/employee');
const { rename } = require('fs');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));




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
router.get('/:EmployeeID', function (req, res, next) {
  Employee.findOne({'EmployeeID': req.params.EmployeeID}, function(err, employee){
    if(err){
    console.log(err);
    return next (err);
  } else {
    console.log('this is the employee',employee);
    res.json(employee);
    // res.status(200).send({
    //   type: 'success',
    //   auth: true,
    //   time_stamp: new Date()
   // })
  }
})
});

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

// Create User
router.post('/', function(req, res, next) {
 

  let e = {
      text: req.body.text,
      // LastName: req.body.LastName,
      // FirstName: req.body.FirstName,
      // Department: req.body.Department,
      // StartDate: req.body.StartDate,
      // role: req.body.role,
     
  };

  Employee.create(e, function(err, employees) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employees);
      res.json(employees);
    }
 
  })
});

// // Create User
// router.post('/myobj', function(req, res, next) {

//   Employee.insertMany({}), function(err, employee){
//     if(err){
//       console.log(err)
//       return next(err);
//     }else{
//       res.json(employee)
//     }
//   }
// });


module.exports = router;