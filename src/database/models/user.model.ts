import { IUser } from "../../types";

import mongoose from "../mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

export const User = mongoose.model<IUser>('User', UserSchema, 'users');