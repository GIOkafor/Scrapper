var mongoose = require('mongoose');

var ResultSchema = new mongoose.Schema({
	title: String,
	link: String,
	description: String,
	price: {type: Number, default: 0}
});

mongoose.model('Result', ResultSchema);