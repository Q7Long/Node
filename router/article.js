const Router = require("@koa/router")
const ArticleController = require("../controller/ArticleController")
const jwtAuth = require("koa-jwt")
const router = new Router()
const upload = require("../middlewares/upload.js")
const config = require("../config/index.js")

// 创建文章  jwtAuth({ secret: config.security.secretKey }),
router.post("/article", ArticleController.create);

// // 获取所有文章, jwtAuth({ secret: config.security.secretKey }),
router.get("/article", ArticleController.getArticleList)

// 更新文章
router.put("/article/:_id", ArticleController.updateArticleById)

// 获取文章详情
router.get("/article/:_id", ArticleController.getArticleDetailById)

//删除文章接口   jwtAuth({ secret: config.security.secretKey
router.delete("/article/:_id", ArticleController.deleteArticleById)
// 上传文件
router.post("/upload", upload.single("avatar"), ArticleController.uploadCoverImg)
module.exports = router