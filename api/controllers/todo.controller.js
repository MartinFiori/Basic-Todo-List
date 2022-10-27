const Todo = require("../models/Todo.js");

const getTodos = async (req, res) => {
	// const { title, descrition } = req.body;
	try {
		// if (![title, descrition].every(Boolean))
		// 	return res.status(400).json({ err: "Inputs missing" });
		const todos = await Todo.findAll({
			order: [["id", "ASC"]],
		});
		res.json(todos);
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
};
async function createTodo(req, res) {
	const { title, description } = req.body;
	try {
		if (![title, description].every(Boolean))
			return res.status(400).json({ err: "Inputs missing" });
		const newTodo = await Todo.create({ title, description });
		res.status(201).json({ msg: newTodo });
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
}

async function getTodoById(req, res) {
	const { id } = req.params;
	try {
		const found = await Todo.findByPk(id);
		// const found = await Todo.findOne({
		// 	where: {
		// 		id,
		// 	},
		// });
		if (!found) return res.status(400).json({ err: "no todo found" });
		res.status(200).json(found);
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
}
async function updateTodoById(req, res) {
	const { title, description } = req.body;
	const { id } = req.params;
	try {
		if (![title, description].every(Boolean))
			return res.status(400).json({ err: "Inputs missing" });

		const found = await Todo.findOne({ where: { id } });
		if (!found) return res.status(400).json({ err: "no todo found" });
		await found.update({ title, description });
		await found.save();

		res.status(200).json(found);
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
}
async function updateTodoDone(req, res) {
	const { id } = req.params;
	try {
		const found = await Todo.findByPk(id);
		if (!found) return res.status(400).json({ err: "no todo found" });
		await found.update({ done: !found.done });
		await found.save();
		res.status(200).json(found);
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
}
async function deleteTodoById(req, res) {
	const { id } = req.params;
	try {
		const found = await Todo.findByPk(id);
		if (!found) return res.status(400).json({ err: "no todo found" });
		await found.destroy();
		res.json("Todo deleted succesfully");
	} catch (err) {
		res.status(400).json({
			err: err.message,
		});
	}
}

module.exports = {
	getTodos,
	createTodo,
	getTodoById,
	updateTodoById,
	deleteTodoById,
	updateTodoDone,
};
