angular
  .module('todo')
  .run(runBlock);

runBlock.$inject = ['$ionicPlatform', '$rootScope', '$state', 'Backand', 'LoginService', '$ionicLoading'];

function runBlock($ionicPlatform, $rootScope, $state, Backand, LoginService, $ionicLoading) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    var isMobile = !(ionic.Platform.platforms[0] == "browser");
    Backand.setIsMobile(isMobile);
    Backand.setRunSignupAfterErrorInSigninSocial(true);

  });

  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

    console.log('state change');
    if (next.name !== 'login' && next.name !== "signup") {
      if (!LoginService.verifyIsLoggedIn(false)) {
        event.preventDefault();
        return $state.go('login');
      } else {
        console.log('logged in already');
        return;
      }
    } else {
      console.log("should be on login page");
    }
  });

  $rootScope.$on('BackandSignOut', function () {
    $state.go('login');
  });

  $rootScope.$on('loading:show', function () {
    $ionicLoading.show();
  })

  $rootScope.$on('loading:hide', function () {
    $ionicLoading.hide();
  })
}