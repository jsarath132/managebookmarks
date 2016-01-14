'use strict';
var bookmarksController = function($scope, bookmarksFactory, $state, $stateParams) {
	$scope.sectionTitle = 'Add Bookmark';
	var getBookmark = function() {
		bookmarksFactory.getBookmark($stateParams.bookmarkId).then(function(result) {
			$scope.bookmark = result.data;
		});
	};
	$scope.submitBookmark = function() {
		if($state.$current.name !== 'editbookmark') {
			bookmarksFactory.addBookmark($scope.bookmark).then(function(result) {
				if(result.data) {
					$state.go('home');
				}
			});
		} else if(!$scope.bookmarksForm.$pristine) {
			bookmarksFactory.editBookmark($scope.bookmark).then(function(result) {
				if(result.data) {
					$state.go('home');
				}
			});
		} else {
			$state.go('home');
		}
	};
	$scope.cancelSave = function() {
		$state.go('home');
	};
	if($state.$current.name === 'editbookmark') {
		$scope.sectionTitle = 'Edit Bookmark';
		getBookmark();
	}
};