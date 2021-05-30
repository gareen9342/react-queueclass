const mongoose = require("mongoose"),
  User = require("../models/User"),
  passport = require("passport"),
  jwt = require("jsonwebtoken");

module.exports = (app) => {
  // ============ 회원가입 ============//
  app.post("/user", (req, res) => {
    const user = new User(req.body);

    User.countDocuments({ email: req.body.email }, (err, count) => {
      // 디비에 이메일을 가진 유저가 없으면 회원가입 진행
      if (count === 0) {
        user.save((err, doc) => {
          if (err) return res.json({ success: false, err: err.message });
          return res.status(200).json({
            success: true,
          });
        });
      } else {
        return res.json({
          success: false,
          errorMessage: "이미 동일한 이메일을 가진 유저가 존재합니다. ",
        });
      }
    });
  });
  // ============ 로그인 ============//
  app.post("/login", (req, res) => {
    // console.log(req.body);
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err) {
        return console.error(err);
      }
      if (!user) {
        return res.json({
          success: false,
          errorMessage: "유저가 존재하지 않습니다. ",
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        const token = signToken(user);

        return res.json({ success: true, user, token });
      });
    })(req, res);
  });
  // ============ 회원정보 가져오기 ============//
  app.get("/user", (req, res, next) => {
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
    // 첫 번쨰 인수는 초큰의 내용, 두 번쨰 인수는 토큰의 비밀키, 세 번쨰 인수는 토큰의 설정
    return jwt.sign({ id: user._id, email: user.email }, "imsisecret", {expiresIn : "1h"});
  };
};
