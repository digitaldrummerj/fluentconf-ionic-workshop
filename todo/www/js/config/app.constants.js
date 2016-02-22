(function () {
  angular.module('todo.config.constants', [])
    .constant('CONSTS', {
      anonymousToken: 'ec9b4565-8d2e-4740-a4dc-4e8e52dbbc72',
      signUpToken: '536d7143-edf0-451b-9e8d-fa065c563eb6',
      appName: 'ddjtodo'
    })
    .constant('$ionicLoadingConfig', {
      template: '<ion-spinner></ion-spinner>'
    })
})();