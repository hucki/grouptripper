"use strict";
exports.__esModule = true;
var express = require("express");
// import * as cors from 'cors';
// import * as morgan from 'morgan';
// import dotenv from 'dotenv';
var tripsRouter = require('./router.ts');
var port = process.env.PORT || 3001;
// dotenv.config();
var app = express();
// app.use(cors());
app.use(express.json());
// app.use(morgan('tiny'));
app.use('/', tripsRouter);
app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
