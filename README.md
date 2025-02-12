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
