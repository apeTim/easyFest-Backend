import { IUser } from "../../types";
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import mongoose from "../mongoose";

const UserSchema = new mongoose.Schema <Document & IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

UserSchema.pre('save', function(next){
    if(this.isModified('password')){
        let salt = bcrypt.genSaltSync(15);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    return next();
});

UserSchema.methods.isValidPass = function(candidate:string){
    return bcrypt.compareSync(candidate, this.password);
}

export const User = mongoose.model<IUser>('User', UserSchema, 'users');