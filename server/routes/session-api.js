/*=========================
Name:Gabriel Sanchez
Date: April 16, 2020
Assignment: session API
Description: all API's used for sessions
==========================*/

const express = require('express');
const User = require('../models/user');
const Employee = require('../models/employee')
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const router = express.Router();

// document.cookie = "tagname = test;secure";
// const cookie = "sessionuser=hussein; samesite=strict; secure"


//User Sign-in
router.post('/signin', function(req, res, next) {
  console.log(req.body);
  const cookie = "user=hussein; samesite=none; secure"


  User.findOne({'username': req.body.username}, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {

      console.log('this is the user',user);
      if(user) {

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (passwordIsValid) {
          res.setHeader('set-cookie',[cookie]) |
          res.status(200).send({
        
            type: 'success',
            auth: true,
            username: user.username,
            time_stamp: new Date(),
           

          })

        } else {
          console.log(`The password for username: ${req.body.username} is invalid.`);
          res.status(401).send({
            type: 'error',
            text: 'Invalid username/password, please try again.',
            auth: false,
            time_stamp: new Date()
          })
        }
      }
    }
  })
});


// router.post('/sign-in-employee', function(req, res, next){
//   console.log(req.body)
//   Employee.findOne({'EmployeeId': req.body.EmployeeId}, function(err, employee){
//     if(err){
//       console.log(err);
//       return next(err);
//     } else {
//       console.log('this is the Employee', employee)
//       console.log('this is the reqbody', req.body)
//       if( req.body){
//         res.status(200).send({
//           type: 'success',
//           auth: true,
//           username: req.body.EmployeeId,
//           time_stamp: new Date()
//         })
//       } else{
//         console.log(`The password for username: ${req.body.username} is invalid.`);
//         res.status(401).send({
//           type: 'error',
//           text: 'Invalid username/password, please try again.',
//           auth: false,
//           time_stamp: new Date()
//         })
//       }
//     }
//   })
// })



router.get('/sign-in-employee', (req, res) => {
  Employee.find({}, (err, employees) =>{
    if(err)
    return res.status(500).send({message: 'Error: ${err}'})
    if(!employees)
    return  res.status(404).send({message: 'The Employee Does not Exist'})


    res.status(200).send({ employees })
    // res.status(200).send({
    //   employees,
    //   type: 'success',
    //   auth: true,
    //   time_stamp: new Date()

    // })
  })

});



// router.post('/signin-employee', (req, res) => {
//   console.log('here', req.body)
//   Employee.find({}, (err, employees) =>{
//     if (err){
//       console.log(err);
//       return res.status(500).send({message: 'Error: ${err}'})
//     } else {
//       //console.log('employee here mf', employees)
//       // let employeeIsValied = compareSync(req.body.EmployeeID, employee.EmployeeID)
//       // console.log('here is the comparation', employeeIsValied)
//       console.log('request bo0dy', req.body.EmployeeID)
//       if(req.body.EmployeeID !== employees){
//         res.status(200).send({
//           type: 'sucess',
//           auth: true,
//         })
//     } else {
//       console.log(`The password for username:  is invalid.`);
//           res.status(401).send({
//             type: 'error',
//             text: 'Invalid username/password, please try again.',
//             auth: false,
//             time_stamp: new Date()
//           })
//     }
//     // if(err) return res.status(500).send({message: 'Error: ${err}'})
//     // if(!employees) return res.status(404).send({message: 'The Employee Does not Exist'})
//   }
//     // res.status(200).send({ employees })
//   })

// });



//Employee Sign in
// router.post('/signin-employee', function(req, res, next) {
//   console.log("found you",req.body);
//   Employee.findOne({'EmployeeID' : req.body.EmployeeID}, function(err, employee) {
//     if (err){
//       console.log(err);
//       return next(err);
//     } else {
//       console.log('employee here mf', employee.EmployeeID)
//       // let employeeIsValied = compareSync(req.body.EmployeeID, employee.EmployeeID)
//       // console.log('here is the comparation', employeeIsValied)
//       if(req.body.EmployeeID !== employee){
//         res.status(200).send({
//           type: 'sucess',
//           auth: true,
//         })
//       } else {
//         console.log(`The password for username:  is invalid.`);
//           res.status(401).send({
//             type: 'error',
//             text: 'Invalid username/password, please try again.',
//             auth: false,
//             time_stamp: new Date()
//           })
//       }
//     }

  //   if('here is the emply',employee){
  //     let employeeIsValied = bcrypt.compareSync(req.body.EmployeeId, employee.EmployeeId)

  //     console.log('this', employeeIsValied)

  //     if(employeeIsValied){
  //       res.status(200).send({
  //         type: 'success',
  //         auth: true,
  //       })
  //     }else {
  //       console.log(`The password for username:  is invalid.`);
  //         res.status(401).send({
  //           type: 'error',
  //           text: 'Invalid username/password, please try again.',
  //           auth: false,
  //           time_stamp: new Date()
  //         })
  //     }
  //   }

//   })
// });


// Register User
router.post('/register', function(req, res, next) {
  User.findOne({'username': req.body.username}, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      if (!user) {
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

        let u = {
          username: req.body.username,
          password: hashedPassword,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email,
          securityQuestion: req.body.securityQuestion
        };

        User.create(u, function(err, newUser) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log(newUser);

            res.status(200).send({
              type: 'success',
              auth: true,
              username: newUser.username,
              time_stamp: new Date()
            })
          }
        })
      } else {
        console.log(`The requested UserName: ${req.body.username} has already been registered with the system. Please pick a new username.`);
        res.status(500).send({
          type: 'error',
          text: `The requested UserName: ${req.body.username} has already been registered with the system. Please pick a new username.`,
          auth: false,
          time_stamp: new Date()
        })
      }
    }
  })
});

// Verify User
router.get('/verify/users/:username', function( req, res, next) {
  User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(user);
          res.json(user);
      }
  })
});

//Verify Security Questions
router.post('/verify/users/:username/security-questions', function( req, res, next) {
  const answerToSecurityQuestion1 = req.body.answerToSecurityQuestion1;
  console.log(answerToSecurityQuestion1);

  const answerToSecurityQuestion2 = req.body.answerToSecurityQuestion2;
  console.log(answerToSecurityQuestion2);

  const answerToSecurityQuestion3 = req.body.answerToSecurityQuestion3;
  console.log(answerToSecurityQuestion3);

  User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(user);

          let answer1IsValid = answerToSecurityQuestion1 === user.securityQuestion[0].answer;
          console.log(answer1IsValid);

          let answer2IsValid = answerToSecurityQuestion2 === user.securityQuestion[1].answer;
          console.log(answer2IsValid);

          let answer3IsValid = answerToSecurityQuestion3 === user.securityQuestion[2].answer;
          console.log(answer3IsValid);

          if (answer1IsValid && answer2IsValid && answer3IsValid) {
            res.status(200).send({
              type: 'success',
              auth: true
            })
          } else {
            res.status(200).send({
              type: 'error',
              auth: false
            })
          }
      }
  })
});

// Reset Password
router.put('/users/:username/reset-password', function(req, res, next) {
  const password = req.body.password;

  User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(user);

          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

          user.set({
              password: hashedPassword
          });

          user.save(function (err, savedUser) {
              if (err) {
                  console.log(err);
                  return next(err);
              } else {
                  console.log(savedUser);
                  res.json(savedUser);
              }
          })
      }
  })
});

module.exports = router;
