/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Employee Schema
==========================*/

const mongoose = require('mongoose');


let employeeSchema = mongoose.Schema({
  EmployeeID: {type: String,},
  LastName: {type:String},
  FirstName: {type: String},
  Department: {type: String},
  StartDate: {type: Number},
  EmployeeNumberId:{type: Number},
  role: {type: String, default: 'standard'},


})

module.exports = mongoose.model('Employee', employeeSchema)
