'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookmarkModel = mongoose.model('bookmarksfolder');
var bookmarkutil = require('./../util/bookmark.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* Get List of bookmarks, searched based on bookmark name*/
router.get('/bookmarks/search/:q', function(req, res) {
	bookmarkModel.find({'children.name': new RegExp(req.params.q, 'i')},function(err, bookmarks) {
		if(err) {
			return console.error(err);
		} else {
			res.json(bookmarks);
		}
	});	
});

/* Get a bookmark information*/
router.get('/bookmarks/:id', function(req, res) {
	bookmarkModel.findOne({'children._id': req.params.id},{"foldername":1,"children.$" : 1} ,function(err, bookmarks) {
		if(err) {
			return console.error(err);
		} else {
			res.json(bookmarks);
		}
	});
});

/* Get all bookmarks*/
router.get('/bookmarks', function(req, res) {
	bookmarkModel.find({},{},{'group':'foldername'},function(err, bookmarks) {
		if(err) {
			return res.send(err);
		} else {
			res.json(bookmarks);
		}
	});
});

//router.params(":q")


/* Create a bookmark */
router.post('/bookmarks', function(req, res) {
	bookmarkutil.create(bookmarkModel, req, res);
});

/* Update a bookmark*/
router.put('/bookmarks/:id', function(req, res) {
	bookmarkModel.findOne({'children._id': req.params.id}, function(err, bookmark) {
		if (err) {res.send(err);}
		bookmarkutil.removeChildren(bookmark, bookmarkModel, req, res, bookmarkutil.create);
	});
	
});

/* Delete a bookmark information*/
router.delete('/bookmarks/:id', function(req, res) {
	//res.json(req.body);
	bookmarkModel.findOne({'children._id': req.params.id}, function(err, bookmark) {
		if (err) {res.send(err);}
		bookmark.children.id(req.params.id).remove();
		bookmark.save(function(err, bookmark) {
			if (err) {res.send(err);}
			if(bookmark.children.length <= 0) {
				bookmark.remove();
			}
			res.json([{"status":"success"}]);
		});
	});
	
});

module.exports = router;
