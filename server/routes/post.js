const Post = require("../models/Post"),
  fs = require("fs"),
  path = require("path"),
  multer = require("multer");

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
  app.post("/post", (req, res) => {
    console.log("post");
  });
  //get posts

  //get single post
};
