import mongoose from "mongoose";

interface todoType {
  name: string;
  completed: boolean;
};

const todoSchema = new mongoose.Schema<todoType>({
  name: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    require: true,
  },
});

const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;