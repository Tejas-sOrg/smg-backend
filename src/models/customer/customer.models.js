import mongoose from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters long"],
      index: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      minLength: [10, "Phone must be at least 10 characters long"],
      index: true, // Added index
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minLength: [6, "Address must be at least 6 characters long"],
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    customerType: {
      type: String,
      enum: ["all", "selected", "none"], // use For sending marketing emails & SMS
      default: "all",
    },
    medicines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
      },
    ],
    dueAmmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

customerSchema.plugin(mongooseAggregatePaginate);

export const Customer = mongoose.model("Customer", customerSchema);
