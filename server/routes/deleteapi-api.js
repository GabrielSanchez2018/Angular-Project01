/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Delete API
==========================*/

var mongoose = require('mongoose');

var db = mongoose.connection;

var Schema = mongoose.Schema;

db.on('error', console.error);

db.once('open', function () {

    console.log("db connect");

    db.dropCollection("barcodes", function (err, result) {

        if (err) {

            console.log("error delete collection");

        } else {

            console.log("delete collection success");

        }

    });



});

mongoose.connect('mongodb+srv://Gabriel:Jairo500!@cluster0-djivq.gcp.mongodb.net/brcs?retryWrites=true&w=majority');
