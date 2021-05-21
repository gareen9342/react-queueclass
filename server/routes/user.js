const mongoose = require("mongoose"),
  User = require("../models/User"),
  passport = require("passport"),
  jwt = require("jsonwebtoken");

module.exports = (app) => {
  // ============ 회원가입 ============//
  app.post("/user", (req, res) => {
    const user = new User({
      name: "name",
      password: "1234",
      email: "imsiemail@email.com",
    });
    user.save((err, doc) => {
      if (err) return res.json({ success: false, err: err.message });
      return res.status(200).json({
        success: true,
      });
    });
    console.log("here");
  });
  // ============ 로그인 ============//
  app.post("/login", (req, res) => {
    console.log(req.body);
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err) {
        return console.error(err);
      }
      // res.send({ email: user.email });
      if (!user) {
        return res.status(400).send("user is not found");
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        const token = signToken(user);
        console.log("token=", token);
        return res.json({ user, token });
      });
    })(req, res);
  });
  // ============ 회원정보 가져오기 ============//
  app.get("/user", (req, res, next) => {
    console.log(req.body);
    passport.authenticate("jwt", { session: false }, function (err, user) {
      if (err) {
        res.send(err);
      }
      if (user) {
        res.send(user);
      }
    })(req, res);
  });

  const signToken = (user) => {
    return jwt.sign(user.toJSON(), "imsisecret");
  };
};
