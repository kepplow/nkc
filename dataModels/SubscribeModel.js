// 用户的关注，分为：关注的用户、关注的专业、关注的文章

const settings = require('../settings');
const mongoose = settings.database;
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: Number,
  toc: {
    type: Date,
    default: Date.now,
    index: 1
  },
  // 类型
  // 1. thread 关注的文章
  // 2. forum 关注的专业
  // 3. user 关注的用户
  type: {
    type: String,
    required: true,
    index: 1
  },
  // 详细类型
  // thread类型 sub: 关注的文章, replay: 回复过的文章 （post: 自己发表的文章）
  detail: {
    type: String,
    default: "",
    index: 1
  },
  // 关注的发起人
  uid: {
    type: String,
    required: true,
    index: 1
  },
  // 若为关注用户，此字段表示关注的人ID
  tUid: {
    type: String,
    default: "",
    index: 1
  },
  // 关注的专业ID
  fid: {
    type: String,
    default: "",
    index: 1
  },
  // 关注的文章ID
  tid: {
    type: String,
    default: "",
    index: 1
  }
}, {
  collection: "subscribes"
});
/*
* 获取用户专注的所有用户的ID
* @param {String} uid 用户ID
* @author pengxiguaa 2019-4-28
* */
schema.statics.getUserSubUid = async (uid) => {
  const SubscribeModel = mongoose.model("subscribes");
  const sub = await SubscribeModel.find({
    type: 'user',
    uid
  }, {tUid: 1});
  return sub.map(s => s.tUid);
};

/**
 * -------
 * 关注专业
 * -------
 * @param {Object} options 
 * @参数说明 options对象中必要参数
 * | uid   --  用户ID
 * | fids  --  目标专业的fid数组集合，不可为空
 * | 其余未作说明的参数为非必要
 * 
 * @return 无返回
 * 
 * @author Kris 2019-06-10
 */
schema.statics.autoAttentionForum = async function(options) {
  const {uid, fids} = options
  if(!uid) throwErr(400, "该操作uid不可为空")
  let SubscribeModel = mongoose.model("subscribes");
  let SettingModel = mongoose.model("settings");
  for(let scr of fids) {
    let subscribeForum = await SubscribeModel.findOne({type: "forum", fid: scr, uid: uid});
    if(!subscribeForum) {
      const sid = await SettingModel.operateSystemID('subscribes', 1);
      let newSubscribeForum = new SubscribeModel({
        _id: sid,
        uid: uid,
        type: "forum",
        fid: scr
      })
      await newSubscribeForum.save();
    }
  }
}

module.exports = mongoose.model('subscribes', schema);