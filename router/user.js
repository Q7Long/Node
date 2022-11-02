const Router = require("@koa/router");

const router = new Router();

router.prefix("/user")

router.get("/list", (ctx, next) => {
    
})

router.get("/add", (ctx, next) => {
    ctx.body = "增加用户"
})

router.get("/delete", (ctx, next) => {
    ctx.body = "删除用户"
})

module.exports = router;