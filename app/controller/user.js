'use strict'
const Service = require('egg').Service
class UserService extends Service {
  async read() {
    const { ctx } = this
    try {
      const res = await ctx.service.user.read()
      ctx.body = await ctx.helper.jsonFormat(res)
    } catch (error) {
      ctx.body = await ctx.helper.jsonFormat(error, 0)
    }
  }

  async readId() {
    const { ctx } = this
    const { id } = ctx.params
    try {
      const res = await ctx.service.user.readId(id)
      ctx.body = await ctx.helper.jsonFormat(res || {})
    } catch (error) {
      ctx.body = await ctx.helper.jsonFormat(error, 0)
    }
  }

  // 新增数据
  async add() {
    const { ctx } = this
    try {
      // 将外部传入的数据都传入,此处也可以做一些校验
      const res = await ctx.service.user.add(ctx.request.body)
      ctx.body = await ctx.helper.jsonFormat(res)
    } catch (error) {
      ctx.body = await ctx.helper.jsonFormat(error, 0)
    }
  }

  // 删除接口
  async delete() {
    const { ctx } = this
    const { id } = ctx.params // 传入一个 id 即可
    try {
      const res = await ctx.service.user.del(id)
      ctx.body = await ctx.helper.jsonFormat(res)
    } catch (error) {
      ctx.body = await ctx.helper.jsonFormat(error, 0)
    }
  }

  // 更新数据
  async update() {
    const { ctx } = this
    try {
      const res = await ctx.service.user.update(ctx.request.body)
      ctx.body = await ctx.helper.jsonFormat(res)
    } catch (error) {
      ctx.body = await ctx.helper.jsonFormat(error, 0)
    }
  }

  async downloadTemp() {
    const { ctx } = this
    const filePath = 'app/public/template/template.xlsx'
    const fileName = encodeURIComponent('test.xlsx')
    ctx.set('content-disposition', `attachment; filename=${fileName}`)
    ctx.set('Access-Control-Expose-Headers', 'content-disposition')
    const result = await ctx.service.file.queryFile(filePath)
    ctx.body = result
  }
}

module.exports = UserService
