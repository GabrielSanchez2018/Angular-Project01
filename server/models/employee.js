const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let employeeSchema = mongoose.Schema({
  EmployeeId: {type: String},
  LastName: {type:String},
  FirstName: {type: String},
  Department: {type: Number},
  StartDate: {type: Number},
  role: {type: String, default: 'standard'}


})

module.exports = mongoose.model('Employee', employeeSchema)
