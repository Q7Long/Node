const Router = require("@koa/router")
const CommentController = require("../controller/CommentController.js")
const jwtAuth = require("koa-jwt")
const router = new Router()
const upload = require("../middlewares/upload.js")
const config = require("../config/index.js")

// 创建内容  jwtAuth({ secret: config.security.secretKey }),
router.post("/comment", CommentController.create);

// 获取所有评论裂变
router.get("/comment", CommentController.getCommentList)

//获取评论详情
router.get("/comment/:_id", CommentController.getCommentDetailById)

// 更新评论信息
router.put("/comment/:_id", CommentController.updateCommentById)

// 删除评论信息
router.delete("/comment/:_id", CommentController.deleteCommentById)
module.exports = router