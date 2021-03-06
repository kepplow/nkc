const Router = require('koa-router');
const router = new Router();
const mime = require('mime');
const {upload, statics} = require('../../settings');
const {pfAvatarPath} = upload;
const {defaultPfAvatarPath} = statics;
router
  .get('/', async (ctx, next) => {
    ctx.throw(501, 'a uid is required.');
    await next()
  })
  .get('/:uid', async (ctx, next) => {
    const {fs} = ctx;
    const {uid} = ctx.params;
    try {
      const url = `${pfAvatarPath}/${uid}.jpg`;
      await fs.access(url);
      ctx.filePath = url;
    } catch(e) {
      ctx.filePath = defaultPfAvatarPath;
      ctx.lastModified = new Date(1999, 9, 9).toUTCString()
    }
    ctx.type = 'jpg';
    ctx.set('Cache-Control', 'public, no-cache');
    await next()
  })
  .post('/:uid',async (ctx, next) => {
    const {data, db, settings} = ctx;
    const {fs} = ctx;
    const {user} = data;
    const {uid} = ctx.params;
    const targetPersonalForum = await db.PersonalForumModel.findOne({uid});
    if(user.uid !== uid && !targetPersonalForum.moderators.includes(user.uid)) ctx.throw(403, '权限不足');
    const extArr = ['jpg', 'png', 'jpeg'];
    const {imageMagick} = ctx.tools;
    const file = ctx.body.files.file;
    if(!file) ctx.throw(400, 'no file uploaded');
    const {path, type} = file;
    const extension = mime.getExtension(type);
    if(!extArr.includes(extension)) {
      ctx.throw(400, 'wrong mimetype for avatar...jpg, jpeg or png only.')
    }
    await imageMagick.avatarify(path);
    const saveName = uid + '.jpg';
    const {pfAvatarPath} = settings.upload;
    const targetFile = pfAvatarPath +'/'+ saveName;
    await fs.rename(path, targetFile);
    await next();
  });

module.exports = router;