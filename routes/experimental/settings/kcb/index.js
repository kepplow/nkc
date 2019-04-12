const Router = require('koa-router');
const router = new Router();
router
	.get('/', async (ctx, next) => {
		const {data, db} = ctx;
		data.kcbsTypes = await db.KcbsTypeModel.find();
		data.kcbSettings = (await db.SettingModel.findOnly({_id: 'kcb'})).c;
		ctx.template = 'experimental/settings/kcb.pug';
		await next();
	})
	.patch('/', async (ctx, next) => {
		const {db, body} = ctx;
    const {kcbsTypes, kcbSettings} = body;
    const kcbSettingsDB = await db.SettingModel.findById("kcb");
    let {
      minCount, maxCount,
      withdrawMin, withdrawMax, withdrawCount,
      withdrawTimeBegin, withdrawTimeEnd,
      withdrawStatus, withdrawFee
    } = kcbSettings;
		if(minCount <= 0) ctx.throw(400, '最小值不能小于0');
		if(minCount > maxCount) ctx.throw(400, '最小值最大值设置错误');
		withdrawMin = parseInt(withdrawMin);
    withdrawMax = parseInt(withdrawMax);
    withdrawFee = Number(withdrawFee);
    withdrawCount = parseInt(withdrawCount);
    withdrawStatus = !!withdrawStatus;
    withdrawTimeBegin = parseInt(withdrawTimeBegin);
    withdrawTimeEnd = parseInt(withdrawTimeEnd);
    if(withdrawMin < 0) ctx.throw(400, "最小提现金额设置错误");
    if(withdrawMax < 0) ctx.throw(400, "最大提现金额设置错误");
    if(withdrawCount < 0) ctx.throw(400, "每天最大提现次数设置错误");
    if(withdrawTimeBegin > withdrawTimeEnd) ctx.throw(400, "允许提现的时间段设置错误");
    if(withdrawFee >= 1 || withdrawFee < 0) ctx.throw(400, "提现手续费设置错误");
    for(const type of kcbsTypes) {
      let {count, num, _id} = type;
      count = parseInt(count);
      num = parseInt(num);
      const type_ = await db.KcbsTypeModel.findOnly({_id});
      if(count >= 0 || count === -1) {

      } else {
        ctx.throw(400, `${type_.description}的次数设置错误`);
      }
      if(count === 0 || num < 0 || num > 0) {

      } else {
        ctx.throw(400, `${type_.description}的科创币变化值设置错误`)
      }
      await type_.update({count, num});
    }
    const c = {
      minCount,
      maxCount,
      withdrawTimeEnd,
      withdrawTimeBegin,
      withdrawCount,
      withdrawMin,
      withdrawFee,
      withdrawMax,
      withdrawStatus,
      totalMoney: kcbSettingsDB.c.totalMoney
    };
    await db.SettingModel.update({_id: 'kcb'}, {$set: {c}});
		await next();
	});
module.exports = router;