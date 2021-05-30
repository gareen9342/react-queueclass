const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const passportConfig = require("./config/passport");
const port = 5000;
const path = require("path");
const app = express();
const APIrouter = express.Router();

// parser -> mongodb connect -> passport -> APIrouter -> server

// parser , cors, cookieparser 세팅
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cookieParser());

//mongoDB는 로우레벨의 드라버를 는 모듈 mongoose는 관계 모델링 툴 도큐먼트를 가져올때 자스객체로 가져올 수 있게 해줌
mongoose.connect(
  "mongodb://localhost:27017/queueclass",
  {
    useNewUrlParser: true, // deprecated 에러 없애주기
    useUnifiedTopology: true, // mongoose의 드라입랑 MongoDB의 드라이버가 같은 소켓에서 데이터가 왔다 갔다 하게
    useCreateIndex: true, //
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.error(`system could not connect to mongo server`);
    } else {
      console.log(`mongo db connnection succeed`);
    }
  }
);

app.use(passport.initialize()); // req객체에 passport설정을 심어줌 
passportConfig();

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);
// API router 쪼갤게 많진 않지만 일단 이렇게 분리했다
require("./routes/.apirouter.js")(APIrouter);
app.use("/api", APIrouter);
// hello world
app.get("/", (req, res) => {
  res.send("hi");
});
// running server
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
