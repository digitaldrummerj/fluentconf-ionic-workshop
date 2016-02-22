/*
Name: Validate current user on delete
Trigger: Delete - After record deleted but before it committed
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

	 // if the current user has an *Admin* role then he is allowed to delete a todo that was created by other users
  if (userProfile.role == "Admin")
    return {};

   if (!dbRow.created_by)
      throw new Error('Todo with no creator can\'t be deleted.');

  // do not allow non *Admin* users to delete a todo created by other users 
  if (dbRow.created_by != userProfile.userId)
      throw new Error('You can only delete your own todo.');

  return {};
}