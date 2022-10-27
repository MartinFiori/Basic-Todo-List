const router = require("express").Router();
const todoController = require("../controllers/todo.controller.js");

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodoById);
router.put("/done/:id", todoController.updateTodoDone);
router.delete("/:id", todoController.deleteTodoById);

module.exports = router;

const url = "http://localhost:8080/";
// PUT url + 'done'
