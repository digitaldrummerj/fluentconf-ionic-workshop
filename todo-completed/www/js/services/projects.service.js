(function () {
  'use strict';

  angular
    .module('todo.services')
    .factory('ProjectService', ProjectService);

  ProjectService.$inject = ['$http', 'BackandDataService', 'UserModel'];
  function ProjectService($http, BackandDataService, UserModel) {
    var service = {
      getProjects: getProjects,
      addProject: addProject,
      deleteProject: deleteProject,
    },
      objectName = 'project';
    return service;

    ////////////////

    function getProjects(pageNumber, pageSize) {
      console.log('getting projects');
      var sort = '[{ "fieldName": "name", "order": "asc" }]'
        , filter = null;
      // var filter = '[{ "fieldName": "project_id", "operator": "in", "value":' + project.id + '}]';
      return BackandDataService.getList(objectName, sort, filter, pageNumber || 1, pageSize || 10)
        .then(function (result) {
          return result.data.data;
        });
    }

    function addProject(name) {
      var project = {
        "name": name,
        "created_on": new Date()
      };

      return BackandDataService.saveItem(objectName, project, { returnObject: true })
        .then(function (result) {
          return result.data;
      });
    }

    function deleteProject(project) {
      return BackandDataService.deleteItem(objectName, project.id).then(function (result) {
        return result;
      }, function (error) {
        throw error;
      });
    }

  }
})();