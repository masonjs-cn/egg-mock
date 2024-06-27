/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1660876115851_2497'

  // 注入中间件
  config.middleware = ['params']

  // 上传文件时，配置multipart参数  mode参数的可选值  file  stream
  config.multipart = {
    fileSize: '50mb',
    mode: 'file',
    fileExtensions: ['.png', '.jpg', '.xlsx', '.xls', '.cvs'] // 扩展几种上传的文件格式
  }

  config.security = {
    domainWhiteList: ['*'],
    csrf: {
      enable: false
    }
  }

  config.cors = {
    // 解决跨域访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
    origin: '*'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig
  }
}
