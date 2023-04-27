const express = require("express");
const app = express();


const mongoose = require("mongoose");


app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const dotenv = require("dotenv");

dotenv.config();

const TodoTask = require("./models/TodoTask");


app.get("/", async (req, res) => {
    try {
      const tasks = await TodoTask.find({});
      res.render("todo.ejs", { todoTasks: tasks });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });

app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

app.route("/edit/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const tasks = await TodoTask.find({});
      res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  })
  
  .post(async (req, res) => {
    const id = req.params.id;
    try {
      await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  });

  app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndDelete(id)
      .then(result => {
        res.redirect("/");
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  


mongoose.connect('mongodb+srv://kalaiarul444:Kalaiarul0412@cluster0.wqtp2ct.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
});
































