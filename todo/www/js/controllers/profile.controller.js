(function() {
    'use strict';

    angular
        .module('todo')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['LoginService'];

    function ProfileController(LoginService) {
        var profile = this;
        profile.signout = signout;
        LoginService.getUserDetails().then(function(response){
            profile.details = response;
        });


        function signout() {
            LoginService.signout();
        }
    }
})();