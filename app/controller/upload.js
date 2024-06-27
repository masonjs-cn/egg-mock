'use strict'
const path = require('path')
const Service = require('egg').Service
class UploadService extends Service {
  async index() {
    const { ctx } = this
    const result = await ctx.service.file.upload()
    ctx.body = await ctx.helper.jsonFormat(result)
  }

  async queryFile() {
    const { ctx } = this
    const filePath = 'app/public/20220822/f4001370-21e0-11ed-a35f-3b1c4c662968.xlsx'
    const fileName = encodeURIComponent('测试表格.xlsx')
    ctx.set('content-disposition', `attachment; filename* = UTF-8''${fileName}`)
    const result = await ctx.service.file.queryFile(filePath)
    ctx.body = result
  }

  async saveFile() {
    const { ctx } = this
    const { taskId } = ctx.request.body
    const taskInfo = await ctx.service.task.taskInfoFile(taskId)
    const target = path.join(this.config.baseDir, `app/public${taskInfo.uploadFile}`)
    await ctx.helper.delFile(target)
    const result = await ctx.service.file.upload(taskInfo.uploadFile)
    ctx.body = await ctx.helper.jsonFormat(result)
  }
}
module.exports = UploadService
