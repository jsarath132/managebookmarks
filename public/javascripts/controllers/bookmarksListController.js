'use strict';
var bookmarksListController = function($scope, $state, bookmarksFactory){
	$scope.bookmarksList = [];

	$scope.getAllBookmarks = function() {
		$scope.dataLoadingCompleted = false;
		bookmarksFactory.getBookmarks().then(function(results){
			$scope.bookmarksList = results.data;
		}).finally(function() {
			$scope.dataLoadingCompleted = true;
		});
	};

	$scope.searchBookmarks = function() {
		$scope.dataLoadingCompleted = false;
		if(typeof $scope.searchText === 'undefined' || $scope.searchText.trim() === '') { 
			$state.go($state.current, {}, {reload: true}); 
			return;
		}
		bookmarksFactory.searchBookmarks($scope.searchText).then(function(results) {
			$scope.bookmarksList = results.data;
		}).finally(function() {
			$scope.dataLoadingCompleted = true;
		});
	};

	$scope.deleteBookmark = function(bookmarkId) {
		bookmarksFactory.deleteBookmark(bookmarkId).then(function(results) {
			if(typeof results.data[0].status !== 'undefined' )
				$state.go($state.current, {}, {reload: true});//$state.go('home');
		});
	};

	$scope.toggle = function($index) {
		var element = $("#folder"+$index).next('ul');
		if(element.hasClass("hide")) {
			element.removeClass("hide");
			element.prev().addClass('toggled');
		} else {
			element.addClass("hide");
			element.prev().removeClass('toggled');
		}
	};

	$scope.getAllBookmarks();
};