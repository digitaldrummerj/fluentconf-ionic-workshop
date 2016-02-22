(function () {
  'use strict';

  angular
    .module('todo.services')
    .service('LoginService', LoginService);

  LoginService.$inject = ['Backand'];

  function LoginService(Backand) {
    var service = this;
    service.signin = signin;
    service.anonymousLogin = anonymousLogin;
    service.socialSignIn = socialSignIn;
    service.socialSignUp = socialSignUp;
    service.signout = signout;
    service.signup = signup;
    service.getUserDetails = getUserDetails;
    service.verifyIsLoggedIn = verifyIsLoggedIn;

    ////////////////

    function signin(email, password, appName) {
      //call Backand for sign in
      return Backand.signin(email, password);
    };

    function anonymousLogin() {
      // don't have to do anything here,
      // because we set app token att app.js
    }

    function socialSignIn(provider) {
      return Backand.socialSignIn(provider);
    };

    function socialSignUp(provider) {
      return Backand.socialSignUp(provider);

    };

    function signout() {
      return Backand.signout();
    };

    function signup(firstName, lastName, email, password, confirmPassword) {
      return Backand.signup(firstName, lastName, email, password, confirmPassword);
    }

    function getUserDetails() {
      if (verifyIsLoggedIn()) {
        return Backand.getUserDetails().then(function (response) {
          return response;
        });
      }


    }

    function verifyIsLoggedIn(signOutIfNotLoggedIn) {
      if (Backand.getToken() === null) {
        if (signOutIfNotLoggedIn !== null && signOutIfNotLoggedIn === true) {
          signout();
        }
        return false;
      }

      return true;
    }
  }
})();
