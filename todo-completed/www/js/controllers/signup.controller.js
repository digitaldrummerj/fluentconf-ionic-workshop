(function () {
  'use strict';

  angular
    .module('todo')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['Backand', '$state', '$rootScope', 'LoginService'];
  function SignUpController(Backand, $state, $rootScope, LoginService) {
    var vm = this;
    vm.signup = signup;
    vm.email = '';
    vm.password = '';
    vm.again = '';
    vm.firstName = '';
    vm.lastName = '';
    vm.errorMessage = '';

    activate();

    ////////////////

    function activate() { }

    function signup() {
      vm.errorMessage = '';

      LoginService.signup(vm.firstName, vm.lastName, vm.email, vm.password, vm.again)
        .then(function (response) {
          // success
          onLogin();
        }, function (reason) {
          console.log('error', reason);
          if (reason.data.error_description !== undefined) {
            vm.error = reason.data.error_description;
          }
          else {
            vm.error = reason.data;
          }
        });
    }

    function onLogin() {
      $rootScope.$broadcast('authorized');
      $state.go('tab.projects');
    }

  }
})();