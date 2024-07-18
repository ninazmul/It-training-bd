import { Response } from "express";
import userModel, { IUser } from "../models/user.model";
import { redis } from "../utils/redis";

// get user by id
export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const userJson = await redis.get(id);

    if (userJson) {
      const user: IUser = JSON.parse(userJson);
      return user;
    } else {
      const user = await userModel.findById(id);
      if (user) {
        await redis.set(id, JSON.stringify(user));
        return user;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

// get all users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};
