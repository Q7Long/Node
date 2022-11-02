const { categoryValidator } = require("../validators/category.js");
const CategoryModel = require("../models/CategoryModel");
const res = require("../core/helper.js")
const jwtAuth = require("koa-jwt");
const config = require("../config/index.js");

class CategoryController {
	// 创建分类
	static async create (ctx, next) {
		categoryValidator(ctx)
		const { name, keyword } = ctx.request.body
		const hasCategory = await CategoryModel.findOne({
			name
		})
		if (hasCategory) throw new global.errs.Existing("分类名已存在")
		await CategoryModel.create({
			name,
			keyword
		})
		ctx.body = res.success("创建分类成功")
	}
	// 获取所有信息
	static async getCategoryList (ctx, next) {
		const totalSize = await CategoryModel.find().countDocuments();
		const { pageSize = 10, pageIndex = 1 } = ctx.query
		const categoryList = await CategoryModel
			.find()
			.skip((pageIndex - 1) * pageSize)
			.limit(pageSize)
			.sort({ _id: -1 });
		ctx.body = res.json({
			content: categoryList,
			totalSize,
			pageIndex: parseInt(pageIndex),
			pageSize: parseInt(pageSize)
		})
	}
	// 更新信息
	static async updateCategoryById (ctx, next) {
		// query 传参是？方式 params传参方式是: 
		const _id = ctx.query._id;
		console.log(_id);
		const { name, keyword } = ctx.request.body
		const category = await CategoryModel.findByIdAndUpdate({
			_id
		}, {
			name,
			keyword
		})
		console.log(category);
		if (!category) throw new global.errs.NotFound("没有找到相关分类")
		ctx.body = res.json("更新成功")
	}
	// 删除信息
	static async deleteCategoryById (ctx, next) {
		const _id = ctx.query._id;
		if (!_id) {
			throw new global.errs.NotFound("没有找到相关分类")
		}
		let res = await CategoryModel.findOneAndDelete({
			_id
		})
		ctx.body = "删除成功"
	}
	
}


module.exports = CategoryController