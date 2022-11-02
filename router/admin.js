const Router = require("@koa/router")
const AdminController = require("../controller/AdminController.js")
const jwtAuth = require("koa-jwt")
const router = new Router()
const config = require("../config/index.js")

router.prefix("/admin")

// 注册接口
router.post("/register", AdminController.register)

// 登录接口
router.post("/login", AdminController.login)

// 获取用户信息接口
router.get("/user/info", jwtAuth({ secret: config.security.secretKey }), AdminController.getUserInfo)


module.exports = router