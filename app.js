const Koa = require("koa");
const app = new Koa();

const static = require('koa-static');
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const bouncer = require("koa-bouncer");

// 引用项目的配置文件
const config = require("./config");
// 导入连接数据库文件
const db = require("./db");
// 检查出对应的参数错误、404错误、权限错误、xxx已存在的错误可以这样使用
// 如：throw new global.errs.Existing('管理员已存在')
const errors = require("./core/http-exception");
// 当出现任何的错误时，我们需要错误处理中间件来处理  exception是错误处理中间件
const catchError = require("./middlewares/exception");

app.use(static(__dirname + '/public'))

// 路由的引入
const user = require("./router/user.js")
const admin = require("./router/admin.js")
const category = require("./router/category.js")
const article = require("./router/article.js")
const comment = require("./router/comment.js")

global.errs = errors;
global.config = config;
const port = process.env.PORT || config.port;

// 错误处理中间件
app.use(catchError);

// 使用中间件
app
  .use(bodyparser())
  .use(bouncer.middleware())
  .use(json())
  .use(logger())

// 日志打印中间件
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - $ms`);
});

// 路由注册
app.use(user.routes())
user.allowedMethods();

app.use(admin.routes())
admin.allowedMethods();

app.use(category.routes())
category.allowedMethods();

// 注册文章模块路由
app.use(article.routes())
article.allowedMethods();

// 注册评论路由
app.use(comment.routes())
comment.allowedMethods();
// 绑定error事件
app.on("error", function (err, ctx) {
  console.log(err)
  // logger.error('server error', err, ctx)
});

module.exports = app.listen(config.port, () => {
  console.log(`Server is running on ${config.port}`);
});
