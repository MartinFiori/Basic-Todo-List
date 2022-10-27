const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const sequelize = require("./config/db.js");
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// db connection
sequelize
	.authenticate()
	.then(() => console.log("db connected"))
	.catch(err => console.error(err.message));

// routes
app.use("/todo", require("./routes/todo.route.js"));

const PORT = process.env.PORT || 8080;

(async function () {
	await sequelize.sync({ force: false });
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();
