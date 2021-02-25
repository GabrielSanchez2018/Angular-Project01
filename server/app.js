/*=========================
Name: Gabriel Sanchez
Date: April 19, 2020
Description: the required backend code to run the app
==========================*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const SecurityQuestionApi = require('./routes/security-question-api');
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');
const RolesApi = require('./routes/roles-api');
const InvoiceApi = require('./routes/invoice-api');
const ServicesApi = require('./routes/services-api');
const BarcodesApi = require('./routes/barcode-api');
const EmployeeApi = require('./routes/employee-api');
const Orderverify = require('./routes/order-verify-api');
const Leftover = require('./routes/leftover-api');
const TimerAPI = require('./routes/time-api');
const TimePickupAPI = require('./routes/timepickup-api');
const HistoryApi = require('./routes/history-api');
const ExternalApi = require('./routes/test');
const DeletedBarcodesApi = require('./routes/deletedbarcodes-api');

const os = require('os')



const computerName = os.hostname()

console.log(computerName)
//const SQLEmp = require('./routes/sql-employee-api');

/**
 * App configurations
 */
let app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/test', express.static(path.join(__dirname, '../dist/bcrs')));
app.use(cors());

app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));

/**
 * Variables
 */
const port = process.env.PORT | 3000// server port

const conn = 'mongodb+srv://Gabriel:Jairo500!@cluster0-djivq.gcp.mongodb.net/brcs?retryWrites=true&w=majority';
//const conn = "mongodb://localhost:27017/meatsale"
/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful 8-19-20`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s)
 */

app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);
app.use('/api/security-questions', SecurityQuestionApi);
app.use('/api/roles', RolesApi);
app.use('/api/invoices', InvoiceApi);
app.use('/api/services', ServicesApi); //This is to create more service items
app.use('/api/barcodes', BarcodesApi);
app.use('/api/employees', EmployeeApi);
app.use('/api/orderverify',Orderverify);
app.use('/api/leftover', Leftover);
app.use('/api/time', TimerAPI);
app.use('/api/timepickup', TimePickupAPI);
app.use('/api/history', HistoryApi);
app.use('/api/test', ExternalApi);
app.use('/api/deletedbarcodes', DeletedBarcodesApi);
//app.use('/api/sqlemp', SQLEmp);

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
