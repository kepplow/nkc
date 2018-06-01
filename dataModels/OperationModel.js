const mongoose = require('../settings/database');
const Schema = mongoose.Schema;
const operationSchema = new Schema({
	_id: String,
	toc: {
		type: Date,
		index: 1,
		default: Date.now
	},
	tlm: {
		type: Date,
		index: 1
	},
	description: {
		type: String,
		default: ''
	},
	errInfo: {
		type: String,
		default: ''
	},
	typeId: {
		type: [Number],
		index: 1,
		default: []
	},
	kcb: {
		status: {
			type: Boolean,
			default: false,
			index: 1
		},
		count: {
			type: Number,
			default: 0
		},
		change: {
			type: Number,
			default: 0
		},
		whoChange: {
			type: String,
			default: 'me'
		}
	},
	xsf: {
		status: {
			type: Boolean,
			default: false,
			index: 1
		},
		count: {
			type: Number,
			default: 0
		},
		change: {
			type: Number,
			default: 0
		},
		whoChange: {
			type: String,
			default: 'me'
		}
	},
	score: {
		status: {
			type: Boolean,
			default: false,
			index: 1
		},
		count: {
			type: Number,
			default: 0
		},
		change: {
			type: Number,
			default: 0
		},
		whoChange: {
			type: String,
			default: 'me'
		}
	}
},{
	collection: 'operations'
});

operationSchema.pre('save', function(next){
	if(!this.tlm) this.tlm = this.toc;
	next();
});

const OperationModel = mongoose.model('operations', operationSchema);
module.exports = OperationModel;