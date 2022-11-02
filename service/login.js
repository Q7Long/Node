const AdminController = require("../models/AdvertiseModel")
const bcrypt = require("bcrypt")
// 分发路由
const { generateToken } = require("../core/util.js")
const AdminModel = require("../models/AdminModel")
class LoginManager {
	static async adminLogin ({ nickname, password }) {
		// 查找数据库是否有用户和密码
		const user = await AdminModel.findOne({
			nickname
		})
		if (!user) {
			throw new global.errs.AuthFailed("用户不存在")
		}
		// 对比两次密码是否一致
		const correct = bcrypt.compareSync(password, user.password)
		if (!correct) {
			throw new global.errs.AuthFailed("密码不正确")
		}
		// 说明用户名存在，密码正确
		// 不要放敏感信息
		let token = generateToken(user._id)
		return {
			username: user.nickname,
			token
		}
	}
}
module.exports = LoginManager;