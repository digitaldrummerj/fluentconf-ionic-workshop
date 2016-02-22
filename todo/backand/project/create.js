/*
Name: Validate current user on create
Trigger: Create - Before adding data
Event Type: Server Side Javascript
Input Parameters: leave empty
*/
/* globals
  $http - Service for AJAX calls 
  CONSTS - CONSTS.apiUrl for Backands API URL
  Config - Global Configuration
  socket - Send realtime database communication
  files - file handler, performs upload and delete of files
  request - the current http request
*/
'use strict';
function backandCallback(userInput, dbRow, parameters, userProfile) {
// if the current user has an *Admin* role then she is allowed to create a todo for another user

  //set the current user id to be the creator
  userInput.created_by = userProfile.userId;

  return {};
}