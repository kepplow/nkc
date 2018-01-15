const settings = require('../settings');
const mongoose = settings.database;
const Schema = mongoose.Schema;
const documentSchema = new Schema({
	_id: Number,
	applicationFormId: { // 基金
		type: Number,
		default: null,
		index: 1
	},
	toc: {
		type: Date,
		default: Date.now,
		index: 1
	},
	tlm: {
		type: Date
	},
	type: { // 内容、评论
		type: String,
		required: true,
		index: 1
	},
	uid: {
		type: String,
		required: true,
		index: 1
	},
	userType: {// userCensor, projectCensor, common, self
		type: String,
		default: null,
		index: 1
	},
	agree: {
		type: Boolean,
		default: null,
		index: 1
	},
	l: {//pwbb
		type: String,
		required: true,
		index: 1
	},
	t: {
		type: String,
		default: null
	},
	c: {
		type: String,
		default: null
	},
	disabled: {
		type: Boolean,
		default: false,
		index: 1
	},
	reply: {
		type: Number,
		default: null,
		index: 1
	},

});

documentSchema.pre('save', function(next) {
	if(!this.tlm) this.tlm = this.toc;
	next()
});

const DocumentModel = mongoose.model('documents', documentSchema);
module.exports = DocumentModel;