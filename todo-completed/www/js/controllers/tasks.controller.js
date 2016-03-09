(function() {
  'use strict';

  angular
    .module('todo')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['TaskService', '$stateParams', '$ionicModal', '$scope', 'tasks', '$ionicPopup'];
  function TasksController(TaskService, $stateParams, $ionicModal, $scope, tasks, $ionicPopup) {

    var vm = this;
    vm.tasks = tasks;
    vm.stateParams = $stateParams;
    vm.project = {
      id: $stateParams.projectId,
      name: $stateParams.projectName
    };

    vm.saveNewTask = saveNewTask;
    vm.showTaskModal = showTaskModal;
    vm.closeTaskModal = closeTaskModal;
    vm.completeTask = completeTask;
    vm.deleteTask = deleteTask;
    vm.getMoreTasks = getMoreTasks;
    vm.doRefresh = doRefresh;
    vm.pageNumber = 1;
    vm.pageSize = 10;
    vm.moreDataCanBeLoaded = true;

    activate();

    ////////////////

    function activate() {
      $ionicModal
        .fromTemplateUrl('templates/modal-new-task.html', {
          scope: $scope
        }).then(function(modal) {
          vm.taskModal = modal;
        })
      // Step 1: Setup the vm.taskModal

      // Template is templates/modal-new-task.html

      // make vm.taskModal equal the modal

      // scope is $scope

    }


    function getMoreTasks() {
      vm.pageNumber = vm.pageNumber + 1;

      TaskService.getTasks(vm.project, vm.pageNumber, vm.pageSize)
        .then(function(result) {

          var rowNum = result.length;
          if (rowNum === 0 || rowNum < vm.pageSize) {
            vm.moreDataCanBeLoaded = false;
          }
          if (rowNum > 0) {
            vm.tasks = vm.tasks.concat(result);
          }
        })
        .finally(function() {
          $scope.$broadcast('scroll.infiniteScrollComplete')
        });
    }

    function doRefresh() {
      vm.refreshing = true;
      vm.pageNumber = 1;
      TaskService.getTasks(vm.project, vm.pageNumber, vm.pageSize)
        .then(function(result) {
          vm.tasks = result;
        })
        .finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
          vm.refreshing = false;
        });
    }

    function saveNewTask(task) {
      // Step 1: Call Task Service addTask

      // Step 2: In the promise success add the result to vm.tasks array

      // Step 2.1: Close the modal using the closeTaskModal function

      // Step 2.2: Clear the task name from the passed in task
      TaskService.addTask(vm.project, task)
        .then(function(result) {
          vm.tasks.push(result);
          closeTaskModal();
          task.name = '';
        })
    }

    function completeTask(task) {
      // Step 1: Call the Task Service completeTask
      TaskService.completeTask(vm.project, task)
        .then(function(result) {

        });
    }

    function deleteTask(task) {
      $ionicPopup.confirm({
        title: 'Are You Sure?',
        template: 'Are you sure you want to delete this task?'
      }).then(function(res) {
        if (res) {
          TaskService.deleteTask(vm.project, task).then(function(result) {
            vm.tasks.splice(vm.tasks.indexOf(task), 1);
          })
        }
      })

      // Step 1: Call TaskService.deleteTask

      // Step 2: Remove data from vm.tasks using the array splice function.      
      // Hint: to find the location in the array using vm.tasks.indexOf(task)
    }

    function showTaskModal() {
      vm.taskModal.show();
    }

    function closeTaskModal() {
      vm.taskModal.hide();
    }


    $scope.$on('$destroy', function() {
      vm.taskModal.remove();
    });
  }
})();