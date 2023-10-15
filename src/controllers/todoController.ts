import TodoModel from "../models/Todo";

const getAllTodo = async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.status(200).send({
      success: true,
      message: "Get all todos successfully",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding Todo",
      error,
    });
  }
};

const addTodo = async (req, res) => {
  if (!req?.body?.name) {
    return res.status(400).send({
      success: false,
      message: "Todo name is required",
    });
  }

  try {
    const todo = new TodoModel({
      name: req.body.name,
      completed: false,
    });
    const data = await todo.save();

    res.status(201).send({
      success: true,
      message: `'${req.body.name}' Added Successfully`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding Todo",
      error,
    });
  }
};

const editTodo = async (req, res) => {
  const { id } = req?.params;
  const { name } = req?.body;

  if (!id && !name) {
    return res.status(400).send({
      success: false,
      message: "Must provide the id and name",
    });
  }

  try {
    /*
    The new option tells Mongoose to return
    the updated document instead of the original
    */
    const todo = await TodoModel.findByIdAndUpdate(id, { name });
    //{new: true}

    res.status(201).send({
      success: true,
      message: `'${todo?.name}' updated to '${name}' Successfully`,
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating Todo",
      error,
    });
  }
};

const completedTodo = async (req, res) => {
  const { id } = req?.params;
  const { completed } = req?.body;

  if (!id && !completed) {
    return res.status(400).send({
      success: false,
      message: "Must provide the id and name",
    });
  }
  console.log(completed)

  try {
    /*
    The new option tells Mongoose to return
    the updated document instead of the original
    */
    const todo = await TodoModel.findByIdAndUpdate(id, {
      completed: completed,
    });
    //{new: true}
    res.status(201).send({
      success: true,
      message: `'${todo?.completed}' updated to '${completed}' Successfully`,
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating Todo",
      error,
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req?.params;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Must provide the id",
    });
  }

  try {
    /*
    The new option tells Mongoose to return
    the updated document instead of the original
    */
    const todo = await TodoModel.findByIdAndDelete(id);

    res.status(201).send({
      success: true,
      message: `'${todo?.name}' Deleted Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Deleting Todo",
      error,
    });
  }
};

export { getAllTodo, addTodo, editTodo, completedTodo, deleteTodo };
