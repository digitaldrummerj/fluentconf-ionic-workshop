[
  {
    "name": "project",
    "fields": {
      "created_by": {
        "object": "users"
      },
      "name": {
        "type": "string",
        "required": true
      },
      "created_on": {
        "type": "datetime",
        "required": true
      },
      "task": {
        "collection": "task",
        "via": "project_id"
      }
    }
  },
  {
    "name": "task",
    "fields": {
      "name": {
        "type": "string",
        "required": true
      },
      "created_on": {
        "type": "datetime",
        "required": true
      },
      "project_id": {
        "object": "project"
      },
      "completed": {
        "type": "boolean"
      }
    }
  },
  {
    "name": "users",
    "fields": {
      "project": {
        "collection": "project",
        "via": "created_by"
      },
      "email": {
        "type": "string"
      },
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type": "string"
      }
    }
  }
]