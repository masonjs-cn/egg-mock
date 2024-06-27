const { join } = require('path')
const { readFile, writeFile } = require('fs') // 解构出并加载fs模块中的两个方法
const dayjs = require('dayjs')
const fs = require('fs')

const path = (name) => join(__dirname, `../../db/${name}.json`)

module.exports = class Helper {
  // 查询
  static async query(name) {
    const filename = path(name) // 得到db.json的绝对路径
    return new Promise((resolve) => {
      readFile(filename, 'utf-8', (err, data) => {
        if (err) throw err
        const res = JSON.parse(data) // 把JSON转成JS数组
        resolve(res)
      })
    })
  }

  // 查询
  static async queryId(name, id) {
    const filename = path(name)
    return new Promise((resolve) => {
      readFile(filename, 'utf-8', (err, data) => {
        if (err) throw err
        const res = JSON.parse(data)
        const info = res.find((item) => +item.id === +id)
        resolve(info)
      })
    })
  }

  // 添加
  static async add(name, row) {
    const filename = path(name) // 得到db.json的绝对路径
    return new Promise((resolve) => {
      readFile(filename, 'utf-8', (err, data) => {
        if (err) throw err
        const res = JSON.parse(data)
        row.id = 0
        if (res.length !== 0) {
          const id = res[res.length - 1].id + 1
          row.id = id
        }
        res.push(row)
        writeFile(filename, JSON.stringify(res), (err) => {
          if (err) throw err
          resolve('添加成功')
        })
      })
    })
  }

  // 添加
  static async del(name, id) {
    const filename = path(name)
    return new Promise((resolve) => {
      readFile(filename, 'utf-8', (err, data) => {
        if (err) throw err
        const res = JSON.parse(data)
        const result = res.filter((item) => {
          return +item.id !== +id
        })
        writeFile(filename, JSON.stringify(result), (err) => {
          if (err) throw err
          resolve('删除成功')
        })
      })
    })
  }

  static async update(name, param) {
    const filename = path(name)
    return new Promise((resolve) => {
      readFile(filename, 'utf-8', (err, data) => {
        if (err) throw err
        const res = JSON.parse(data)
        const index = res.findIndex((item) => +item.id === +param.id)
        res.splice(index, 1, { ...res[index], ...param })
        writeFile(filename, JSON.stringify(res), (err) => {
          if (err) throw err
          resolve('修改成功')
        })
      })
    })
  }

  static async writeFile(name, param) {
    const filename = path(name)
    return new Promise((resolve) => {
      writeFile(filename, JSON.stringify(param), (err) => {
        if (err) throw err
        resolve('修改成功')
      })
    })
  }

  static async jsonFormat(row, status = 1) {
    if (status === 0) {
      return {
        status: 0,
        message: row,
        timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        success: false
      }
    }

    return {
      status: 1,
      message: '成功',
      data: row,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      success: true
    }
  }

  static async delFile(target) {
    return new Promise(async (resolve) => {
      await fs.unlink(target, (res) => {
        resolve(res)
        console.log(res, '删除状态')
      })
    })
  }
}
