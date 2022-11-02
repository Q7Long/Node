const { articleValidator } = require("../validators/article");
const ArticleModel = require("../models/ArticleModel");
const res = require("../core/helper.js")
const jwtAuth = require("koa-jwt");
const config = require("../config/index.js");

class ArticleController {
	// 创建文章
	static async create (ctx, next) {
		articleValidator(ctx)
		const { title } = ctx.request.body
		const hasArticle = await ArticleModel.findOne({
			title
		})
		if (hasArticle) throw new global.errs.Existing("文章已存在")
		await ArticleModel.create(ctx.request.body)
		ctx.body = res.success("创建文章成功")
	}
	// 获取⽂章列表
	static async getArticleList (ctx, next) {
		const totalSize = await ArticleModel.find().countDocuments();
		const { pageSize = 10, pageIndex = 1 } = ctx.query
		const articleList = await ArticleModel
			.find()
			.skip((pageIndex - 1) * pageSize)
			.limit(pageSize)
			.sort({ _id: -1 });
		ctx.body = res.json({
			content: articleList,
			totalSize,
			pageIndex: parseInt(pageIndex),
			pageSize: parseInt(pageSize)
		})
	}
	// 根据 Id 更新文章
	static async updateArticleById (ctx, next) {
		const _id = ctx.params._id;
		let article = await ArticleModel.findByIdAndUpdate({ _id }, ctx.request.body)
		if (!article) {
			throw new global.errs.NotFound("没有找到相关文章");
		}
		ctx.body = res.success("更新成功")
	}
	// 获取文章详情信息
	static async getArticleDetailById (ctx, next) {
		const _id = ctx.params._id;
		const articleDetail = await ArticleModel.findById(_id).populate("category_id");
		if (!articleDetail) {
			throw new global.errs.NotFound("没有找到相关文章")
		}
		await ArticleModel.findByIdAndUpdate({
			_id
		}, {
			browse: ++articleDetail.browse
		})
		ctx.body = res.json({
			articleDetail,
			commentList: []
		})
	}
	// 删除文章
	static async deleteArticleById (ctx, next) {
		const _id = ctx.params._id;
		const article = ArticleModel.findOneAndDelete({ _id })
		if (!article) {
			throw new global.errs.NotFound("没有找到相关文章")
		}
		ctx.body = res.success("删除成功")
	}
	// 上传文件
	static async uploadCoverImg (ctx, next) {
		const imgUrl = "127.0.0.1:3000/" + "images/" + ctx.req.file.filename
		ctx.body = res.json(imgUrl)
	}
}
module.exports = ArticleController