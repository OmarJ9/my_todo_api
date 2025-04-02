import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  note: string;
  date: string;
  time: string;
  colorindex: number;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    colorindex: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
