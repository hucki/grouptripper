"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uri = 'mongodb://localhost/group_tripper';
mongoose_1.default.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('successfully connected mongodb');
});
module.exports = mongoose_1.default;
