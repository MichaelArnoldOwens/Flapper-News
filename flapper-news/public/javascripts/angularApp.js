var app = angular.module('flapperNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  //home route
  $stateProvider
    .state('home', {
      //url
      url: '/home',
      //template
      templateUrl: '/home.html',
      //controller for the state
      controller: 'MainCtrl'
    })
  //posts route
  .state('posts', {
    url: 'posts/:id',
    templateUrl: '/posts.html',
    controller: 'PostsCtrl'
  });

  //redirects to home for unspecified routes
  $urlRouterProvider.otherwise('home');
}])

//factory and service are both instances of provider
app.factory('posts', [function() {
  //service body
  var o = {
    posts: []
  };
  return o;
}]);

app.controller('MainCtrl', ['$scope', 'posts',
  function($scope, posts){
    $scope.posts = posts.posts;
    
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool post!', upvotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
      ]
    });

    $scope.addPost = function() {
      if(!$scope.title || $scope.title === '') {
        return;
      }

      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0
     });
      
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
  }
]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
  $scope.post = posts.posts[$stateParams.id];

  $scope.addComment = function() {
    if($scope.body === '') {
      return;
    }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body = '';
  };
}]);