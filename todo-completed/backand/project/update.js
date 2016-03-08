/*
Name: Validate current user on update
Trigger: Update - After data saved but before it committed
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
	// write your code here

	 // if the current user has an *Admin* role then he is allowed to update a todo for other users
  if (userProfile.role == "Admin")
    return {};

  if (!dbRow.created_by)
      throw new Error('Todo with no creator can\'t be updated.');

  // do not allow users to change the created by field 
  if (dbRow.created_by !=  userInput.created_by)
      throw new Error('You can\'t change the creator of the todo.');

  // do not allow non *Admin* users to change the creator of the todo 
  if (dbRow.created_by != userProfile.userId)
      throw new Error('You can only update your own todo.');
  return {};
}