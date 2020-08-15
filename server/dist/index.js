"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const tripsRouter = require('./router.ts');
const port = process.env.PORT || 3001;
dotenv.config();
const app = express_1.default();
app.use(cors());
app.use(express_1.default.json());
app.use(morgan('tiny'));
app.use('/', tripsRouter);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
