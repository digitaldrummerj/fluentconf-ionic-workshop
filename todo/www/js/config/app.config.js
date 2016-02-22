angular
  .module('todo')
  .config(config);

config.$inject = ['BackandProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', 'CONSTS'];

function config(BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider, CONSTS) {

  // Setup Backand Provider
  BackandProvider.setAnonymousToken(CONSTS.anonymousToken);
  BackandProvider.setSignUpToken(CONSTS.signUpToken);
  BackandProvider.setAppName(CONSTS.appName);

  // Setup interceptors for $http calls to provide global functions for request/response
  $httpProvider.interceptors.push('APIInterceptor');

  // Setup Routing.  
 
  // Using otherwise this way, is need for auth redirects if not logged in
  $urlRouterProvider.otherwise(function ($injector) {
    var $state = $injector.get("$state");
    $state.go("tab.projects");
  });


  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.projects', {
      url: '/projects',
      views: {
        'tab-projects': {
          templateUrl: 'templates/tab-projects.html',
          controller: 'ProjectsController as vm',
          resolve: {
            /* @ngInject */
            projects: function (ProjectService) {
              // pageNumber: 1, pageSize: 10
              return ProjectService.getProjects(1, 10);
            }
          }
        }
      }
    })
    .state('tab.tasks', {
      url: '/tasks/:projectId',
      params: {
        projectName: ""
      },
      views: {
        'tab-projects': {
          templateUrl: 'templates/tab-project-tasks.html',
          controller: 'TasksController as vm',
          resolve: {
            /* @ngInject */
            tasks: function ($stateParams, TaskService) {
              return TaskService.getTasks({ id: $stateParams.projectId });
            }
          }
        }
      }
    })
    .state('tab.about', {
      url: '/about',
      views: {
        'tab-about': {
          templateUrl: 'templates/tab-about.html'
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController as login'

    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignUpController as signup'
    });
}