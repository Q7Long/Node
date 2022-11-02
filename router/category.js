const Router = require("@koa/router")
const CategoryController = require("../controller/CategoryController")
const jwtAuth = require("koa-jwt")
const router = new Router()
const config = require("../config/index.js")

// 创建分类
router.post("/category", jwtAuth({ secret: config.security.secretKey }), CategoryController.create);

// // 获取所有分类
router.get("/category", jwtAuth({ secret: config.security.secretKey }), CategoryController.getCategoryList)

// 获取分类信息接口 注意传参方式 params 是 /article/:_id 传参，不能写在 postMan的列表里 
router.put("/category", CategoryController.updateCategoryById)

//删除分类接口   jwtAuth({ secret: config.security.secretKey
router.delete("/category", CategoryController.deleteCategoryById)


module.exports = router