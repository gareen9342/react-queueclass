const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    // email로 로그인할 예정
    type: String,
    unique: 1,
    trim: true,
  },
  password: {
    type: String,
  },
  role: {
    role: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  // email, password,name
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        // 맨 처음에 들어오는 password는 plain password 해싱을 해줘야해요.
        if (err) return next(err); // 에러 있으면 에러를 다음 함수로 넘겨준다는 뜻
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
