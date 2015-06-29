var app = angular.module('myApp', ['ui.router']);

app.factory('results', ['$http', function ($http){
	var o = {
		results: [
			{description: 'first result', price: 1650, image: 'www.google.com'},
			{description: 'second result', price: 2100, image: 'www.fb.com'},
			{description: 'third result', price: 379, image: 'www.amazon.com'}
		]
	};

	return o;
}]);

app.controller('MainCtrl', [
	'$scope',
	'results',

	function ($scope, results) {
		$scope.results = results.results;
	}
	])