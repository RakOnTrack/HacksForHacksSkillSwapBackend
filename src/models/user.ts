/**
 * 
 * SkillSwap Backend API
 * 
 * File: users.ts
 * Description: Database Model for Users
 * 
 * @author mvvrgan
 * @version 03/01/2025
 * 
 */

// Imports
import { Schema, model } from 'mongoose';

// Model Interface
interface IUser {
    name: string;
    email: string;
    avatar?: string;
}

// Model Schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});

// Model
const User = model<IUser>('User', userSchema);

/**
 *  Model Functions
 */

export function getUsers() {
    return User.find();
};

export function getUser(id: string) {
    return User.findById(id);
};

export function createUser(user: IUser) {
    return User.create(user);
};