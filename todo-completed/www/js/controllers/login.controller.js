(function () {
  'use strict';

  angular
    .module('todo')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['Backand', '$state', '$rootScope', 'LoginService'];
  function LoginController(Backand, $state, $rootScope, LoginService) {
    var login = this;
    login.error = '';
    login.signin = signin;
    login.signout = signout;
    login.anonymousLogin = anonymousLogin;
    login.socialSignup = socialSignUp;
    login.socialSignin = socialSignIn;

    activate();

    ////////////////

    function activate() { }

    function signin() {      
      LoginService.signin(login.email, login.password)
        .then(function () {
          onLogin();
        }, function (error) {
          login.error = error.error_description;
        })
    }

    function anonymousLogin() {
      LoginService.anonymousLogin();
      onLogin();
    }

    function onLogin() {
      $rootScope.$broadcast('authorized');
      $state.go('tab.projects');
    }

    function signout() {
      LoginService.signout()
        .then(function () {
          $rootScope.$broadcast('logout');
          // $state.go($state.current, {}, { reload: true });
        })

    }

    function socialSignIn(provider) {
      LoginService.socialSignIn(provider)
        .then(onValidLogin, onErrorInLogin);

    }

    function socialSignUp(provider) {
      LoginService.socialSignUp(provider)
        .then(onValidLogin, onErrorInLogin);

    }

    function onValidLogin(response) {
      onLogin();
      login.username = response.data;
    }

    function onErrorInLogin(rejection) {
      login.error = rejection.data;
      $rootScope.$broadcast('logout');
    }
  }
})();