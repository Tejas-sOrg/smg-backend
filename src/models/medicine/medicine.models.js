import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Medicine name is required"],
      unique: [true, "Medicine name is already in use"],
      lowercase: true,
      minLength: [4, "Medicine name must be at least 4 characters long"],
      index: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Medicine = mongoose.model("Medicine", medicineSchema);
