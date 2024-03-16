import mongoose from "mongoose";
import { Schema } from "mongoose";

const EmailSchema = Schema({
  form_name: {
    type: String,
    required: true,
  },

  email: {
    type: Array,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export const Email = mongoose.model("email", EmailSchema);
