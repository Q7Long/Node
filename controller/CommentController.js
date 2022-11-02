const { commentValidator } = require("../validators/comment.js");
const CommentModel = require("../models/CommentModel.js");
const res = require("../core/helper.js")
const jwtAuth = require("koa-jwt");
const config = require("../config/index.js");

class CommentController {
	static async create (ctx, next) {
		const data = await CommentModel.create(ctx.request.body)
		ctx.body = res.json(data)
	}
	// 获取评论列表
	static async getCommentList (ctx, next) {
		const { pageIndex, pageSize } = ctx.query
		const totalSize = await CommentModel.find().countDocuments()
		const commentList = await CommentModel.find()
			.skip((parseInt(pageIndex) - 1) * parseInt(pageSize))
			.limit(parseInt(pageSize))
			.sort([["_id", -1]])
		const data = {
			content: commentList,
			pageIndex: parseInt(pageIndex),
			pageSize: parseInt(pageSize),
			totalSize
		}
		ctx.body = res.json(data)
	}
	//获取评论详情
	static async getCommentDetailById (ctx, next) {
		const _id = ctx.params._id
		const commentDetail = await CommentModel.findById({
			_id
		})
		if (!commentDetail) {
			throw new global.errs.NotFound("没有找到相关信息")
		}
		ctx.body = res.json(commentDetail)
	}
	//更新评论信息
	static async updateCommentById (ctx, next) {
		const _id = ctx.params._id;
		// 获取更新前的信息
		const comment = await CommentModel
			.findByIdAndUpdate({ _id }, ctx.request.body)
		if (!comment) {
			throw new global.errs.NotFound("没有找到相关信息")
		}
		ctx.body = res.success("更新成功")
	}
	//删除评论信息
	static async deleteCommentById (ctx, next) {
		const _id = ctx.params._id;
		const comment = CommentModel.findOneAndDelete({ _id })
		if (!comment) {
			throw new global.errs.NotFound("没有找到相关评论")
		}
		ctx.body = res.success("删除成功")
	}
}

module.exports = CommentController