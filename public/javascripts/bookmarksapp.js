'use strict';

var app = angular.module('bookmarks',['ngRoute','ui.router']);
app.controller('bookmarkscontroller', bookmarksController);
app.controller('bookmarksListController', bookmarksListController);
app.factory('bookmarksFactory', bookmarksFactory);
app.directive('ngEnter', onEnter);

app.config(function ($locationProvider, $stateProvider,$urlRouterProvider) {
	
	
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('home',{
		url: '/',
		templateUrl: '/partials/list.html',
		controller: 'bookmarksListController'
	})
	.state('addbookmark',{
		url: '/add',
		templateUrl: '/partials/addbookmarks.html',
		controller: 'bookmarkscontroller'
	})
	.state('editbookmark', {
		url: '/:bookmarkId/edit',
		templateUrl: '/partials/addbookmarks.html',
		controller: 'bookmarkscontroller',
		//resolve: {"bookmark":getBookmark}
	})
	.state('editfolder',{
		url: '/editfolder',
		templateUrl: 'views/editfolder.html',
		controller: 'controllers/bookmarkscontroller'
	});
	$locationProvider.html5Mode(true);
});

