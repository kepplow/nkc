const settings = require('../settings');
const mongoose = settings.database;
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  tid: {
    type: String,
    unique: true,
    required:true
  },
  category: {
    type: String,
    default: ''
  },
  cid: {
    type: String,
    default:''
  },
  count: {
    type: Number,
    default: 0
  },
  countRemain: {
    type: Number,
    default: 0
  },
  countToday: {
    type: Number,
    default: 0
  },
  digest: {
    type: Boolean,
    default: false
  },
  digestInMid: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  esi: {
    type: Boolean,
    default: false
  },
  fid: {
    type: String,
    required: true
  },
  hasFile: {
    type: Boolean,
    default: false
  },
  hasImage: {
    type: Boolean,
    default: false
  },
  hideInMid: {
    type: Boolean,
    default: false
  },
  hits: {
    type: Number,
    default: 0
  },
  lm: {
    type: String,
    default: ''
  },
  mid: {
    type: String,
    required: true
  },
  oc: {
    type: String,
    default: ''
  },
  tlm: {
    type: Number,
  },
  toc: {
    type: Number,
    default: Date.now
  },
  toMid: {
    type: String,
    default: ''
  },
  topped: {
    type: Boolean,
    default:false
  },
  toppedUsers: {
    type: [String],
    default: []
  },
  uid: {
    type: String,
    required: true
  }
});
threadSchema.pre('save', function (next) {
  if(!this.tlm) {
    this.tlm = this.toc;
  }
  next();
});
module.exports = mongoose.model('threads', threadSchema);