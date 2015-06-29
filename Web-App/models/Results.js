var mongoose = require('mongoose');

var SingleResult = new mongoose.Schema({
	title: String,
	title_link: String,
	description: String,
	price_value: String
});

var ResultSchema = new mongoose.Schema({
	results: []
});

mongoose.model('Single', SingleResult);
mongoose.model('Result', ResultSchema);