import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument } from "../../types/auth.types";
import { ValidationError } from "../../utils/errors";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },

    avatarIndex: {
      type: Number,
      default: 0,
      min: 0,
      max: 9,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(new ValidationError("Error hashing password"));
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new ValidationError("Error comparing passwords");
  }
};

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
