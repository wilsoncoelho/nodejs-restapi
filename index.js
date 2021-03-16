const express = require("express");
const app = express();
const { taskSchema } = require("./utils/task-schema");

app.use(express.json()); // able to send json structure with this.

const tasks = [
  {
    id: 1,
    name: "Task 1",
    completed: false,
  },
  {
    id: 2,
    name: "Task 2",
    completed: false,
  },
  {
    id: 3,
    name: "Task 3",
    completed: true,
  },
];

//GET

app.get("/api/tasks", (request, response) => {
  response.send(tasks);
});

//GET by ID

app.get("/api/tasks/:id", (request, response) => {
  const taskId = request.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task) {
    return response.status(404).send("The task does not exist.");
  }
  response.send(task);
});

//POST
app.post("/api/tasks", (request, response) => {
  const { error } = taskSchema.validate(request.body);
  if (error)
    return response
      .status(400)
      .send("the name should be at least 3 chars long.");

  const task = {
    id: tasks.length + 1,
    name: request.body.name,
    completed: request.body.completed,
  };
  tasks.push(task);
  response.send(task);
});

//PUT

app.put("/api/tasks/:id", (request, response) => {
  const taskId = request.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task) {
    return response.status(404).send("The task does not exist.");
  }
  const { error } = taskSchema.validate(request.body);
  if (error)
    return response
      .status(400)
      .send("the name should be at least 3 chars long.");

  task.name = request.body.name;
  task.completed = request.body.completed;

  response.send(task);
});

//PATCH

app.patch("/api/tasks/:id", (request, response) => {
  const taskId = request.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task) {
    return response.status(404).send("The task does not exist.");
  }
  const { error } = taskSchema.validate(request.body);
  if (error)
    return response
      .status(400)
      .send("the name should be at least 3 chars long.");

  task.name = request.body.name;
  if (request.body.completed) {
    task.completed = request.body.completed;
  }

  response.send(task);
});

//DELETE

app.delete("/api/tasks/:id", (request, response) => {
  const taskId = request.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task) {
    return response.status(404).send("The task does not exist.");
  }
  const index = tasks.indexOf(task)
  tasks.splice(index, 1)
  response.send(task)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});