// controller/AdminController.js

const { registerValidator, loginValidator } = require("../validators/admin");
const LoginManager = require("../service/login.js")
const AdminModel = require("../models/AdminModel");
const res = require("../core/helper.js")

class AdminController {
	// 注册
	static async register (ctx, next) {
		// 参数校验
		registerValidator(ctx);
		// 处理业务
		const {
			nickname,
			password2
		} = ctx.request.body;
		const currentUser = await AdminModel.findOne({
			nickname
		});
		if (currentUser) {
			throw new global.errs.Existing("用户已存在", 900);
		}
		const user = await AdminModel.create({
			nickname,
			password: password2,
		});
		ctx.body = res.json(user)
	}
	// 登录
	static async login (ctx, next) {
		// 校验
		loginValidator(ctx)
		// 获取用户信息
		const { nickname, password } = ctx.request.body
		// ctx.body = { nickname, password }
		// 逻辑
		let user = await LoginManager.adminLogin({ nickname, password })
		ctx.body = res.json(user)
	}
	// 获取用户信息
	static async getUserInfo (ctx, next) {
		let _id = ctx.state.user.data
		let userInfo = await AdminModel.findById({ _id })
		if (!userInfo) {
			throw new global.errs.AuthFailed("获取用户信息失败")
		}
		ctx.body = res.json({ _id, nickname: userInfo.nickname })
	}
}
module.exports = AdminController;

// 由注册管理员的逻辑看，我们从前台传来的 nickname、password1、password2 字段需要在后端进⾏校验。