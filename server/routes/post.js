
const Post = require("../models/Post"),
  fs = require("fs"), //https://nodejs.org/api/fs.html
  multer = require("multer"),
  { auth } = require("../middleware/authenticate");
/**
 * fs ? fileSystem.
 * filesystem 관련 라이브러리
 */
module.exports = (app) => {
  try {
    fs.accessSync("uploads"); // 첫 번째 인자로는 path를 받는데, 여기에 정의된 디렉토리에 접근 권한을 확인한다.
  } catch (err) {
    //노드를 이용해 폴더를 만들 수 있는 방법
    console.log("uploads폴더가 없으므로 생성합니다."); 
    fs.mkdirSync("uploads"); // 
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
        res.json({succcess :false, errorMessage : "데이터가 존재하지 않습니다."})
      }
    });
  });

  // delete single post
  app.delete("/post", (req,res,next) => {
    // console.log(req.query.id);
    Post.updateOne({ id : req.query.id }, {$set : { deleted : 1}}).exec((err, result) => {
      if(err) {
        return res.json({success : false, errorMessage : "데이터를 삭제하는데에 실패했습니다. "});
      }
      if(result){
        return res.json({success : true })
      }
    })
  })
};
