var app = angular.module('myApp', ['ui.router']);

app.factory('results', ['$http', function ($http){
	var o = {
		results: [
			{description: 'first result', price: 1650, image: 'www.google.com'},
			{description: 'second result', price: 2100, image: 'www.fb.com'},
			{description: 'third result', price: 379, image: 'www.amazon.com'}
		]
	};

	o.getAll = function(){
		return $http.get('/results').success(function(data){
			angular.copy(data, o.results);
		});
	};

	return o;
}]);

app.controller('MainCtrl', [
	'$scope',
	'results',

	function ($scope, results) {
		$scope.results = results.results;
	}
	]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('results', {
			url: '/results',
			templateUrl: '/results.html',
			controller: 'MainCtrl',
			resolve: {
				postPromise: ['results', function(results){
					return results.getAll();
				}]
			}
		});

	$urlRouterProvider.otherwise('results');
}]);