'use strict';
var mongoose = require('mongoose');
var bookmarksfolder = new mongoose.Schema({
	foldername: String,
	children: [{
		url: String,
		name: String
	}]
	
});

module.exports = mongoose.model('bookmarksfolder', bookmarksfolder);