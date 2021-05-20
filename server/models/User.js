const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email : { // email로 로그인할 예정
        type : String,
        unique : 1,
        trim : true
    },
    password : {
        type : String
    },
    role : {
        role : Number,
        default : 0
    },
    token : {
        type : String,
    },
    tokenExp : {
        type : Number
    }
})