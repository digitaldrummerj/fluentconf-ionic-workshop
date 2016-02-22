(function() {
    'use strict';

    angular
        .module('todo.services')
        .service('UserModel', UserModel);

    UserModel.$inject = ['$http', 'BackandDataService', 'LoginService'];

    function UserModel($http, BackandDataService, LoginService) {

        var service = this;

        var baseUrl = '/1/objects/',
            objectName = 'users/';

        service.fetch = fetchItem;

        function fetchItem() {
            //   return $http.get(getUrlForId(id));
            return LoginService.getUserDetails().then(function(response) {
                var filter = [{
                    "fieldName": "email",
                    "operator": "equals",
                    "value": response.username
                }];
                var url = "https://api.backand.com:443/1/objects/users?pageSize=20&pageNumber=1";

                return $http({
                    method: 'GET',
                    url: getUrl(),
                    params: {
                        pageSize: 1,
                        pageNumber: 1,
                        filter: filter
                    }
                }).then(function(response){
                    var data = response.data.data;
                    if (data.length === 1) {
                        return data[0];
                    }
                });
            })

        };


        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }
        ////////////////

        function exposedFn() {}
    }
})();