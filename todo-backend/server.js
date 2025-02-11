const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const open = require("sqlite").open;

const dbPath = path.join(__dirname, "database.db");

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

let db = null;

// Initialize the database and server
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Ensure the 'todos' table exists in the database
    await db.run(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        completed BOOLEAN NOT NULL
      );
    `);

    // Bind the server to the port from the environment variable or default to 3001
    const port = process.env.PORT || 3001; // Render provides a PORT env var
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};

initializeDbAndServer();

// GET - Retrieve all todos
app.get("/todos/", async (req, res) => {
  try {
    const todos = await db.all("SELECT * FROM todos");
    res.json(todos);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// GET - Retrieve a single todo by ID
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await db.get("SELECT * FROM todos WHERE id = ?", [id]);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch the todo" });
  }
});

// POST - Add a new todo
app.post("/todos/", async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const result = await db.run(
      "INSERT INTO todos (description, completed) VALUES (?, ?)",
      [description, false]
    );
    const newTodo = {
      id: result.lastID,
      description,
      completed: false
    };
    res.status(201).json(newTodo);
  } catch (e) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// PUT - Update a todo (by ID)
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description, completed } = req.body;

  try {
    const todo = await db.get("SELECT * FROM todos WHERE id = ?", [id]);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await db.run(
      "UPDATE todos SET description = ?, completed = ? WHERE id = ?",
      [description, completed, id]
    );

    const updatedTodo = { id: parseInt(id), description, completed };
    res.json(updatedTodo);
  } catch (e) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// PATCH - Partially update a todo (by ID)
app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description, completed } = req.body;

  try {
    const todo = await db.get("SELECT * FROM todos WHERE id = ?", [id]);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const updatedDescription = description !== undefined ? description : todo.description;
    const updatedCompleted = completed !== undefined ? completed : todo.completed;

    await db.run(
      "UPDATE todos SET description = ?, completed = ? WHERE id = ?",
      [updatedDescription, updatedCompleted, id]
    );

    const updatedTodo = {
      id: parseInt(id),
      description: updatedDescription,
      completed: updatedCompleted
    };
    res.json(updatedTodo);
  } catch (e) {
    res.status(500).json({ error: "Failed to partially update todo" });
  }
});

// DELETE - Remove a todo (by ID)
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await db.get("SELECT * FROM todos WHERE id = ?", [id]);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await db.run("DELETE FROM todos WHERE id = ?", [id]);
    res.json({ message: "Todo deleted", deletedTodo: todo });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// DELETE - Remove all todos
app.delete("/todos/", async (req, res) => {
  try {
    await db.run("DELETE FROM todos");
    res.json({ message: "All todos deleted" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete todos" });
  }
});
