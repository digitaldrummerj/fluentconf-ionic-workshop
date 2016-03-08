(function () {
  'use strict';

  angular
    .module('todo.interceptors')
    .service('APIInterceptor', ApiInterceptor);

  ApiInterceptor.$inject = ['$rootScope', '$q'];
  function ApiInterceptor($rootScope, $q) {
    var service = this;
    service.responseError = responseError;
    service.request = request;
    service.response = response;
    
    ////////////////

    function request(config) {
      LoadingShow();
      return config;
    }
    function response(response) {
      LoadingHide();
      return response;
    }

    function responseError(response) {
      LoadingHide();
      if (response.status === 401) {
        $rootScope.$broadcast('unauthorized');
      }

      console.log('api interceptor http error', response);
      return $q.reject(response);
    }
    
    function LoadingHide() {
      $rootScope.$broadcast('loading:hide');
    }
    
    function LoadingShow() {
      $rootScope.$broadcast('loading:show');
    }
  }
})();
