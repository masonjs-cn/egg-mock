const Service = require('egg').Service
const dayjs = require('dayjs')
const randomBoolean = require('../utils/random')
const { readFile } = require('fs')
const { join } = require('path')

class UserService extends Service {
  // 读取所有的数据
  async read() {
    try {
      return await this.ctx.helper.query("user");
    } catch (error) {
      return error;
    }
  }

  async readId(id) {
      try {
        return await this.ctx.helper.queryId("user", id);
      } catch (error) {
        return error;
      }
  }

  async add(row) {
    try {
      return await this.ctx.helper.add("user", row);
    } catch (error) {
      return error;
    }
  }

  async del(id) {
    try {
      return await this.ctx.helper.queryId("user", id);
    } catch (error) {
      return error;
    }
  }

  async update(row) {
    try {
      return await this.ctx.helper.update("user", row);
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService
