'use strict';
/* Fatory to handle http requests*/
var bookmarksFactory = function($http) {
	return {
		getBookmarks: function() {
			return $http.get('/bookmarks',[]);
		},
		addBookmark: function(bookmark) {
			return $http.post('/bookmarks',bookmark, []);
		},
		editBookmark: function(bookmark) {
			return $http.put('/bookmarks/'+(bookmark.children[0]._id), bookmark, []);
		},
		deleteBookmark: function(bookmarkId) {
			return $http.delete('/bookmarks/'+(bookmarkId), bookmarkId, []);
		},
		searchBookmarks: function(query) {
			return $http.get('/bookmarks/search/'+query);
		},
		getBookmark: function(bookmarkId) {
			return $http.get('/bookmarks/'+bookmarkId,[]);
		}
	};
};