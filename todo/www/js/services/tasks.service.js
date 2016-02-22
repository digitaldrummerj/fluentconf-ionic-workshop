(function () {
  'use strict';

  angular
    .module('todo.services')
    .factory('TaskService', TaskService);

  TaskService.$inject = ['$http', 'BackandDataService', 'UserModel'];
  function TaskService($http, BackandDataService, UserModel) {
    var service = {
      getTasks: getTasks,
      addTask: addTask,
      deleteTask: deleteTask,
      completeTask: completeTask
    },
      objectName = 'task';

    return service;

    ////////////////
   
    function getTasks(project, pageNumber, pageSize) {
      console.log('getTasks');
      var sort = [{ "fieldName": "completed", "order": "asc" }, { "fieldName": "name", "order": "asc" }]
        , filter = [{ "fieldName": "project_id", "operator": "in", "value": project.id }];
      return BackandDataService.getList(objectName, sort, filter, pageNumber || 1, pageSize || 10)
        .then(function (response) {
          console.log('getTasks response', response.data.data);
          return response.data.data;
        }, function (error) {
          console.log('getTasks Error', error);
        });
    }

    function addTask(project, taskName) {
      var task = {
        "name": taskName,
        "completed": false,
        "created_on": new Date(),
        "project_id": project.id
      };
      return BackandDataService.saveItem(objectName, task, { returnObject: true }).then(function (result) {
        return result.data;
      },
        function (error) {
          console.log('addTask Error', error);
        }

        );
    }

    function deleteTask(project, task) {
      return BackandDataService.deleteItem(objectName, task.id).then(function (result) {
        return result;
      }, function (error) {
        console.log('deleteTask error', error);
      });
    }

    function completeTask(project, task) {
      task.completed = !task.completed;
      return BackandDataService.updateItem(objectName, task.id, task).then(function (result) {
        return result;
      }, function (error) {
        console.log('completeTask error', error);
      });
    }
  }
})();