const passport = require("passport");
// authenticate 과정. 유저 정보를 req.user에 담자
// exports.isLoggedIn = (req, res, next) => {
//   passport.authenticate("jwt", { session: false }, (error, user) => {
//     if (user) {
//       req.user = user;
//     }
//     next();
//   })(req, res, next);
// };

exports.auth = (req, res, next) => 
passport.authenticate("jwt", { session: false }, function (err, user) {
  if (err) {
    res.send(err);
  }
  if (user) {
    req.user = user;
  }
  next();
})(req, res, next);
