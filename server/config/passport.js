const passport = require("passport"),
  passportJWT = require("passport-jwt"),
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt,
  LocalStrategy = require("passport-local").Strategy,
  User = require("../models/User"),
  bcrypt = require("bcrypt");
module.exports = () => {
  /**
   *
   * =========== ㅣ
   * token 인증 방식
   * serialize user 사용 안할거임
   *
   */
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, next) => {
        //존재하는 유저를 찾아준다.
        User.findOne({ email: email }).exec((err, user) => {
          if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                next(err);
              }

              if (result) {
                next(null, user);
              } else {
                next({
                  errors: { password: "패스워드가 일치하지 않습니다. " },
                });
              }
            });
          } else {
            next({ errors: "존재하지 않는 아이디입니다. " });
          }
        });
      }
    )
  );

  //======= JWT Strategy ======//

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "imsisecret",
      },
      async (jwtPayload, done) => {
        console.log(jwtPayload);
        try {
          const user = await User.findOne({ _id: jwtPayload._id });
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
