'use strict';
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

var removeChildren = function(bookmark, bookmarks, req, res, callback) {
	bookmark.children.id(req.params.id).remove();
		bookmark.save(function(err, bookmark) {
			if (err) {res.send(err);}
			if(bookmark.children.length <= 0) {
				bookmark.remove();
			}
			callback(bookmarks, req, res);
		});
};

module.exports = {
	create: create,
	removeChildren: removeChildren
}