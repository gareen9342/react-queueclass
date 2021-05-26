const e = require("express");
const Post = require("../models/Post"),
  fs = require("fs"),
  passport = require("passport"),
  multer = require("multer"),
  { auth } = require("../middleware/authenticate");

module.exports = (app) => {
  try {
    fs.accessSync("uploads");
  } catch (err) {
    //노드를 이용해 폴더를 만들 수 있는 방법
    console.log("uploads폴더가 없으므로 생성합니다.");
    fs.mkdirSync("uploads");
  }

  var upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    }),
  }).single("file");

  // =========== image upload =========== //
  app.post("/image", (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.json({ success: false, error: err });
      }

      return res.json({
        success: true,
        filePath: req.file.path,
        fileName: req.file.filename,
      });
    });
  });
  // post 업로드
  app.post("/post", auth, (req, res, next) => {

    const post = new Post({ image : req.body.image, content : req.body.content, writer : req.user._id});

    post.save((err, doc) => {
      if(err) return res.json({ success : false, err : err.message });
      return res.json({
        success : true
      });
    });

  });

  //get posts
  app.get("/posts", auth, (req,res,next) => {
    Post.find({deleted : 0}).sort({ createdAt : -1, _id : 1}).populate("writer").exec((err, result)=>{
      
      if(result){
        res.json({success : true, data : result})
      }else{
        res.json({succcess :false, errorMessage : "데이터가 존재하지 않습니다. "})
      }
    });
  });

  //get single post
};
