import User from "../authentication/user.model";
import { IUser, IUpdateUserData } from "../../types/auth.types";
import { NotFoundError, ValidationError } from "../../utils/errors";
import { validateUpdateUserData } from "../../utils/validation";

export interface IMeService {
  getMe(userId: string): Promise<IUser>;
  updateMe(userId: string, updates: IUpdateUserData): Promise<IUser>;
}

export class MeService implements IMeService {
  async getMe(userId: string): Promise<IUser> {
    try {
      const user = await User.findById(userId).select(
        "-password -refreshToken"
      );
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new ValidationError("Error fetching user data");
    }
  }

  async updateMe(userId: string, updates: IUpdateUserData): Promise<IUser> {
    try {
      validateUpdateUserData(updates);

      const user = await User.findById(userId);
      if (!user) {
        throw new NotFoundError("User not found");
      }

      // Check if email is being updated and if it's already taken
      if (updates.email && updates.email !== user.email) {
        const existingUser = await User.findOne({ email: updates.email });
        if (existingUser) {
          throw new ValidationError("Email is already taken");
        }
      }

      // Check if username is being updated and if it's already taken
      if (updates.username && updates.username !== user.username) {
        const existingUser = await User.findOne({ username: updates.username });
        if (existingUser) {
          throw new ValidationError("Username is already taken");
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-password -refreshToken");

      if (!updatedUser) {
        throw new NotFoundError("User not found");
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError)
        throw error;
      throw new ValidationError("Error updating user data");
    }
  }
}

export default new MeService();
