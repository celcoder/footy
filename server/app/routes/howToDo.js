$stateProvider.state('home', {
	url: '',
	template:
	resolve: {
		matches: function ($http) {
			return $http.get('/api/scraper');
		}
		urls: function ($http, matches) {
			return $http.get('/api/query', { params: {matches});
		},

	}
})