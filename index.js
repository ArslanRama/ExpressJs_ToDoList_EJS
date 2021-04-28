//dependencies required for the app
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Todo = require('./models/Todo')

// MongoDB connection using mongoose module
const mongoose = require('mongoose');
const DB_NAME = 'ToDo_EJS';// here can be any database name
const DB_LINK = 'mongodb+srv://admin:12345@myamazoncluster.v2per.mongodb.net/' + DB_NAME;
mongoose.connect(DB_LINK)
  .then(() => console.log('MongoDB database is successfully connected'))
  .catch(() => console.log('Database connection failed'))

app.use(express.urlencoded({
  extended: false
}))
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
const task = ["buy tomato", "practise with nodejs"];
//placeholders for removed task
const complete = ["finished react"];

//post route for adding new task 
app.post("/addtask", function (req, res) {
  const newTask = req.body.newtask;
  //add the new task from the post route
  task.push(newTask);
  res.redirect("/");
});

app.post("/removetask", function (req, res) {
  const completeTask = req.body.check;
  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    //check if the completed task already exits in the task when checked, then remove it
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (const i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function (req, res) {
  res.render("index", { task: task, complete: complete });
});

//set app to listen on port 3000
app.listen(3000, function () {
  console.log("server is running on port 3000");
});