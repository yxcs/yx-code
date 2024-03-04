const router = require('koa-router')()
const path = require('path')
const fs = require('fs')
const send = require('koa-send')
const sendFile = require('koa-sendfile')
const archiver = require('archiver')
const mimeTypes = require('mime-types')
import UploadController from '../controller/uploadController'

// 参考文档：https://zhuanlan.zhihu.com/p/35064819

router.prefix('/file')

router.post('/upload', async (ctx) => {
  const file = ctx.request.files.file // 获取上传文件
  const reader = fs.createReadStream(file.path) // 创建可读流
  const ext = file.name.split('.').pop() // 获取上传文件扩展名
  const filePath = path.resolve(__dirname, `../static/${file.name}`) // ${Math.random().toString()}.${ext}
  const upStream = fs.createWriteStream(filePath) // 创建可写流
  reader.pipe(upStream) // 可读流通过管道写入可写流
  return ctx.body = filePath
})

router.post('/uploadAndSave', async (ctx) => {
  const file = ctx.request.files.file // 获取上传文件
  const reader = fs.createReadStream(file.path) // 创建可读流
  const ext = file.name.split('.').pop() // 获取上传文件扩展名
  const newName = `${+new Date()}.${ext}`
  const filePath = path.resolve(__dirname, `../static/${newName}`)
  const upStream = fs.createWriteStream(filePath) // 创建可写流
  reader.pipe(upStream) // 可读流通过管道写入可写流
  const params = {
    originalName: file.name,
    standardName: newName,
    uri: `http://localhost:8666/file/show/${newName}`,
    env: 'dev',
    mimeType: mimeTypes.lookup(file.name),
    filePath: filePath
  }
  const body = await UploadController.fileSave2DB(params)
  return ctx.body = body
})

router.get('/show/:name', async ctx => {
  const name = ctx.params.name
  const filePath = path.resolve(__dirname, `../static/${name}`)
  const isExist = fs.existsSync(filePath)
  const mimeType = mimeTypes.lookup(name)
  if (isExist && mimeType && mimeType.indexOf('image/') === 0) {
    const file = fs.readFileSync(filePath);
    ctx.set('content-type', mimeType);
	  ctx.body = file;
    return
  }
  ctx.body = false
})

router.get('/download/:name', async (ctx) => {
  const name = ctx.params.name
  const filePath = path.resolve(__dirname, `../static/${name}`)
  ctx.attachment(filePath)
  await sendFile(ctx, filePath)
})

router.get('/downloadAll', async (ctx) => {
  // 将要打包的文件列表
  const list = [{name: '002.txt'},{name: '001.txt'}];
  const zipName = '1.zip';
  const zipStream = fs.createWriteStream(zipName);
  const zip = archiver('zip');
  zip.pipe(zipStream);
  for (let i = 0; i < list.length; i++) {
      // 添加单个文件到压缩包
      zip.append(fs.createReadStream(path.resolve(__dirname, `../static/${list[i].name}`)), { name: list[i].name })
  }
  await zip.finalize();
  ctx.attachment(zipName);
  await send(ctx, zipName);
})

router.get('/download2/:name', async (ctx) => {
  const name = ctx.params.name;
  const path = `upload/${name}`;
  ctx.attachment(decodeURI(path));
  await sendFile(ctx, path);
})

router.get('/downloadDirectory', async (ctx) => {
  // 将要打包的文件列表
  const zipStream = fs.createWriteStream('1.zip');
  const zip = archiver('zip');
  zip.pipe(zipStream);
  // 添加整个文件夹到压缩包
  zip.directory('upload/');
  zip.finalize();
  ctx.attachment(zipName);
  await send(ctx, zipName);
})

// 数据库操作接口
router.get('/list', UploadController.page)
router.get('/list/all', UploadController.list)
router.get('/list/detail', UploadController.getById)
router.post('/list/delete', UploadController.delete)
router.post('/list/update', UploadController.update)


module.exports = router