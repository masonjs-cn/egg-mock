'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  // R 读取（Read）
  router.get("/user", controller.user.read);

  // R 读取（Read）
  router.get("/user/:id", controller.user.readId);

  // C 创建（Create）
  router.post("/user", controller.user.add);

  // D 删除（Delete）
  router.delete("/user/:id", controller.user.delete);

  // U 更新（Update）
  router.put("/user", controller.user.update);

  // 下载
  router.get('/downloadTemp', controller.user.downloadTemp)

  // 测试上传、下载
  router.post('/upload', controller.upload.index)
  router.get('/queryFile', controller.upload.queryFile)
  router.post('/saveFile', controller.upload.saveFile)
}
