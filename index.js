const express = require('express');
const cookieParser = require("cookie-parser");

const port = 5000;

const app = express();
const APIrouter = express.Router();


//parser , cors, cookieparser 세팅
app.use(express.json())
app.use(cookieParser())

// API router 쪼갤게 많진 않지만 일단 이렇게 분리했다
require("./routes/.apirouter.js")(APIrouter);
app.use("/api", APIrouter);

// hello world
app.get("/",(req,res) => {
    // console.log(req)
    res.send("hi")
});
// running server
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
});