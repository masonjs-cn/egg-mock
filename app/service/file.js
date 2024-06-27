const Service = require('egg').Service
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')
const { v1: uuid } = require('uuid')
const _ = require('lodash')

class FileService extends Service {
  /**
   * 上传文件
   */
  async upload(filePath) {
    const ctx = this.ctx
    if (_.isEmpty(ctx.request.files)) {
      throw new Error('上传文件为空')
    }
    const file = ctx.request.files[0]
    console.log('上传的文件', file)
    try {
      const extend = file.filename.split('.')
      const fileDir = (filePath && filePath.split('\\')) || []
      const name = fileDir.length
        ? `${fileDir[1]}/${fileDir[2]}`
        : dayjs().format('YYYYMMDD') + '/' + uuid() + '.' + extend[extend.length - 1]
      const target = path.join(this.config.baseDir, `app/public/uploads/${name}`)
      const dirPath = `app/public/uploads/${fileDir.length ? fileDir[1] : dayjs().format('YYYYMMDD')}`
      console.log(dirPath, name, fileDir, 'dirPathdirPathdirPathdirPathdirPathdirPathdirPathdirPathdirPath')
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
      }
      const data = fs.readFileSync(file.filepath)
      fs.writeFileSync(target, data)
      const url = '/uploads' + target.split('uploads')[1]
      return { url }
    } catch (err) {
      throw new Error('上传文件失败：' + err)
    }
  }

  /**
   * 读取文件
   */
  async queryFile(name) {
    try {
      const target = path.join(this.config.baseDir, name)
      const data = await fs.createReadStream(target)
      return data
    } catch (err) {
      throw new Error('获取失败' + err)
    }
  }
}

module.exports = FileService
