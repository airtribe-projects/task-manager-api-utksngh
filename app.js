const express = require('express');
const app = express();
const port = 3000;
const data = require('./task.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = data["tasks"]

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

app.get("/", (req, res) => {
    res.send("Welcome to Task Manager API Platform")
})

app.get("/tasks", (req, res) => {
    res.send(tasks);
})

const validateId = (key) => {
    const id = parseInt(key);
    if (!isNaN(id) && id > 0 && id <= tasks.length) {
        return ["valid", id];
    } else {
        return "invalid";
    }
}

const validateBody = (bodyJson) =>{
    if (
        "title" in bodyJson &&
        "description" in bodyJson &&
        "completed" in bodyJson &&
        bodyJson.title != null && typeof bodyJson.title === 'string' &&
        bodyJson.description != null && typeof bodyJson.description === 'string' &&
        bodyJson.completed != null && typeof bodyJson.completed === 'boolean' 
    ) {
        return "valid";
    } else {
        return "invalid";
    }
}

app.get("/tasks/:id", (req, res) => {
    const validationResult = validateId(req.params.id);

    if (validationResult === "invalid") {
        res.status(404).send("The value does not exist with the given id");
    }
    const [, id] = validationResult; 
    res.status(200).send(tasks[id - 1]);
});


app.put("/tasks/:id", (req, res) => {
    const requestBody = req.body;
    const validationResult = validateId(req.params.id);
    if (validationResult === "invalid") {
        return res.status(404).send("The value does not exist with the given id");
    }
    const [, id] = validationResult;
    let taskToBeUpdated = tasks[id - 1];
    if (validateBody(requestBody) !== "valid") {
        return res.status(400).send({ error: "Invalid input: Missing or null fields in the request body" });
    }
    for (const key in requestBody) {
        if (taskToBeUpdated.hasOwnProperty(key)) {
            taskToBeUpdated[key] = requestBody[key];
        }
    }

    return res.status(200).send({
        message: "Task updated successfully",
        updatedTask: taskToBeUpdated
    });
});

app.post("/tasks", (req,res) =>{
    requestBody = req.body
    if (validateBody(requestBody) === "valid"){
        const id = tasks.length + 1;
        const newTask = { id, ...requestBody }; 
        tasks.push(newTask);
        res.status(201).send({ message: "Task created successfully", task: newTask });
    }
    else {
        res.status(400).send({ error: "Invalid input: Missing or null fields in the request body" });
    }
})

app.delete("/tasks/:id", (req,res) =>{
    const validationResult = validateId(req.params.id);
    if (validationResult === "invalid") {
        res.status(404).send("The value does not exist with the given id");
    }
    const [, id] = validationResult; 
    delete tasks[id-1]
    res.status(200).send({ message: "Task deleted successfully"});
})

module.exports = app;