'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookmarks = mongoose.model('bookmarksfolder');
var create = function(bookmarks, req, res) {
	bookmarks.findOne({'foldername' : req.body.foldername}, function(err, bookmark) {
		if(err){ res.send(err); }
		var child = {"name" : req.body.children[0].name,"url" : req.body.children[0].url};
		if(bookmark !== null && typeof bookmark.children !== 'undefined') {
			bookmark.children.push(child);
		} else {
			bookmark = new bookmarks();
			bookmark.foldername = req.body.foldername;
			bookmark.children = [child];
		}
		bookmark.save(function(err, bookmark) {
			if(err){ res.send(err); }
			res.json(bookmark);
		});
	});
};

var removeChildren = function(bookmark, req, res, callback) {
	bookmark.children.id(req.params.id).remove();
		bookmark.save(function(err, bookmark) {
			if (err) {res.send(err);}
			if(bookmark.children.length <= 0) {
				bookmark.remove();
			}
			callback(bookmarks, req, res);
		});
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* Get List of bookmarks, searched based on bookmark name*/
router.get('/bookmarks/search/:q', function(req, res) {
	bookmarks.find({'children.name': new RegExp(req.params.q, 'i')},function(err, bookmarks) {
		if(err) {
			return console.error(err);
		} else {
			res.json(bookmarks);
		}
	});	
});

/* Get a bookmark information*/
router.get('/bookmarks/:id', function(req, res) {
	bookmarks.findOne({'children._id': req.params.id},{"foldername":1,"children.$" : 1} ,function(err, bookmarks) {
		if(err) {
			return console.error(err);
		} else {
			res.json(bookmarks);
		}
	});
});

/* Get all bookmarks*/
router.get('/bookmarks', function(req, res) {
	bookmarks.find({},{},{'group':'foldername'},function(err, bookmarks) {
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
	create(bookmarks, req, res);
});

/* Update a bookmark*/
router.put('/bookmarks/:id', function(req, res) {
	bookmarks.findOne({'children._id': req.params.id}, function(err, bookmark) {
		if (err) {res.send(err);}
		removeChildren(bookmark, req, res, create);
	});
	
});

/* Delete a bookmark information*/
router.delete('/bookmarks/:id', function(req, res) {
	//res.json(req.body);
	bookmarks.findOne({'children._id': req.params.id}, function(err, bookmark) {
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
