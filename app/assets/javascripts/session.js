
  var app = angular.module("instagramApp", [])
  app.controller('LoginController',
  ['$scope', '$rootScope', '$location', 'AuthenticationService',
  function ($scope, $rootScope, $location, AuthenticationService) {
      // reset login status
      //AuthenticationService.ClearCredentials();

      $scope.login = function () {
          $scope.dataLoading = true;
          AuthenticationService.Login($scope.username, $scope.password, function(response) {
              if(response.success) {
                  //AuthenticationService.SetCredentials($scope.username, $scope.password);
                  $location.path('/');
              } else {
                  $scope.error = response.message;
                  $scope.dataLoading = false;
              }
          });
      };
  }]);


  app.factory('AuthenticationService',
  ['$http', function ($http) {
      var service = {};
      $http.defaults.headers.post['X-CSRF-Token']= $('meta[name="csrf-token"]').attr('content')
      $http.defaults.headers.put['X-CSRF-Token']= $('meta[name="csrf-token"]').attr('content')
      $http.defaults.headers.patch['X-CSRF-Token']= $('meta[name="csrf-token"]').attr('content')
      service.Login = function (username, password, callback) {

          /* Dummy authentication for testing, uses $timeout to simulate api call
           ----------------------------------------------*/
          // $timeout(function(){
          //     var response = { success: username === 'test' && password === 'test' };
          //     if(!response.success) {
          //         response.message = 'Username or password is incorrect';
          //     }
          //     callback(response);
          // }, 1000);


          /* Use this for real authentication
           ----------------------------------------------*/
          $http.post('/authenticate', { email: username, password: password })
             .success(function (response) {
                 callback(response);
             });

      };

      

      return service;
  }])

 
