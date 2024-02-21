import express from "express"
import mongoose, { mongo } from "mongoose"
import { Schema } from "mongoose"

const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requiered: true
    },
    confirmPassword: {
        type: String
    },
    salt: Buffer
},
    {
        timestamps: true
    })



export const User = mongoose.model("users", UserSchema)
