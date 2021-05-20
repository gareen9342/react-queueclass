
const mongoose = require("mongoose"),
User = require("../models/User")

module.exports = (app) => {
    // ============ 회원가입 ============//
    app.post("/user", (req, res)=>{
        const user = new User({name : "name", password : "1234", email : "imsiemai@email.com"});
        user.save((err, doc) => {
            if(err) return res.json({ success : false, err : err.message })
            return res.status(200).json({
                success : true
            })
        })
        console.log("here")
    });
    // ============ 회원정보 가져오기 ============//
    app.get("/user", (req,res) => {
        console.log("/user 요청 들어옴")
    });
    
}