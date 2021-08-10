import { IUser } from "../../types";
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import mongoose from "../mongoose";

const UserSchema = new mongoose.Schema<Document & IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    activated: { type: Boolean, required: false, default: false },
    first_name: { type: String, required: false, default: '' },
    last_name: { type: String, required: false, default: '' },
    birthday: { type: Number, required: false, default: 0 },
    sex: { type: Number, required: false, default: -1 },
    phone: {
        data: { type: String, required: false, default: '' },
        show: { type: Boolean, required: false, default: true }
    },
    vkontakte: {
        data: { type: String, required: false, default: '' },
        show: { type: Boolean, required: false, default: true }
    },
    facebook: {
        data: { type: String, required: false, default: '' },
        show: { type: Boolean, required: false, default: true }
    },
    intagram: {
        data: { type: String, required: false, default: '' },
        show: { type: Boolean, required: false, default: true }
    },
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        let salt = bcrypt.genSaltSync(15);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    return next();
});

UserSchema.methods.isValidPass = function (candidate: string) {
    return bcrypt.compareSync(candidate, this.password);
}

export const User = mongoose.model<IUser>('User', UserSchema, 'users');