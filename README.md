# Todo App API

This is a simple **Todo App API** built using **Express** and **SQLite**. It provides functionality for managing todos with CRUD operations: Create, Read, Update, and Delete.

## Features

- **GET /todos/**: Fetch all todos. ( example with deployed link : https://todo-app-77y7.onrender.com/todos )
- **GET /todos/:id**: Fetch a specific todo by its ID.  
- **POST /todos/**: Add a new todo.
- **PUT /todos/:id**: Update a todo's description and completion status by its ID.
- **PATCH /todos/:id**: Partially update a todo (either description or completion status).
- **DELETE /todos/:id**: Delete a specific todo by its ID.
- **DELETE /todos/**: Delete all todos.

## Deployment

The Todo App API is deployed and live at:  
[https://todo-app-77y7.onrender.com](https://todo-app-77y7.onrender.com)

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

### Steps to Run Locally

1. Clone this repository to your local machine:

    ```bash
    git clone <repo-url>
    cd todo-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    npm start
    ```

    The app will be running on [http://localhost:10000](http://localhost:10000) by default.

## API Endpoints

### 1. **GET /todos/**

- **Description**: Fetch all todos.
- **Response**: An array of todos.

Example Response:

```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "completed": false
  },
  {
    "id": 2,
    "description": "Walk the dog",
    "completed": true
  }
]


2. GET /todos/:id
Description: Fetch a specific todo by its ID.
Method: GET
Parameters:
id: The ID of the todo (e.g., /todos/1).
Response: A single todo object.
Example Response:

json
Copy
{
  "id": 1,
  "description": "Buy groceries",
  "completed": false
}
3. POST /todos/
Description: Add a new todo.
Method: POST
Request Body:
json
Copy
{
  "description": "New todo description"
}
Response: The newly created todo.
Example Response:

json
Copy
{
  "id": 3,
  "description": "New todo description",
  "completed": false
}
4. PUT /todos/:id
Description: Update a todo's description and completion status by its ID.
Method: PUT
Parameters:
id: The ID of the todo to update (e.g., /todos/1).
Request Body:
json
Copy
{
  "description": "Updated todo description",
  "completed": true
}
Response: The updated todo.
Example Response:

json
Copy
{
  "id": 1,
  "description": "Updated todo description",
  "completed": true
}
5. PATCH /todos/:id
Description: Partially update a todo's description or completion status by its ID.
Method: PATCH
Parameters:
id: The ID of the todo to update (e.g., /todos/1).
Request Body: (Only one field is required: either description or completed)
json
Copy
{
  "completed": true
}
Response: The partially updated todo.
Example Response:

json
Copy
{
  "id": 1,
  "description": "Updated todo description",
  "completed": true
}
6. DELETE /todos/:id
Description: Delete a specific todo by its ID.
Method: DELETE
Parameters:
id: The ID of the todo to delete (e.g., /todos/1).
Response: A success message.
Example Response:

json
Copy
{
  "message": "Todo deleted",
  "deletedTodo": {
    "id": 1,
    "description": "Updated todo description",
    "completed": true
  }
}
7. DELETE /todos/
Description: Delete all todos.
Method: DELETE
Response: A success message.
Example Response:

json
Copy
{
  "message": "All todos deleted"
}
Technologies Used
Express.js: A fast, unopinionated, minimalist web framework for Node.js.
SQLite: A lightweight, serverless database engine.
Node.js: JavaScript runtime used for server-side development.
