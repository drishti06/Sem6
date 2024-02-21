import mongoose from "mongoose";
import { Schema } from "mongoose";

<<<<<<< Updated upstream
const FormSchema = Schema({
    form_name: {
        type: String,
        required: true
    },
    template_name: {
        type: String,
        required: true
    },
    total_mcqs: {
        type: Array,
        required: true
    },
    no_of_mcqs: {
        type: Number,
        required: true
    },
    total_marks: {
        type: Number,
        required: true
    },
    passing_marks: {
        type: Number,
        required: true
    }
=======
const TemplateSchema = Schema({

>>>>>>> Stashed changes
})

export const Form = mongoose.model("forms", FormSchema)
