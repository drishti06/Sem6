// Import necessary packages

import mongoose from 'mongoose'
import { Schema } from 'mongoose';

// Define Response schema
const ResponseSchema = Schema({
    exam_name: {
        type: String,
        required: true
    },
    answers: {
        type: [String],
        required: true
    },
    student_name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    total_marks: {
        type: Number,
        required: true
    }
});

// Create model for Response schema
export const Response = mongoose.model('Response', ResponseSchema);
