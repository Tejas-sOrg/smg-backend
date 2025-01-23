import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer ID is required"],
      index: true, // Added index
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "USD",
    },
    transaction_type: {
      type: String,
      enum: ["credit", "payment", "due", "refund", "adjustment"],
      required: [true, "Transaction type is required"],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
      index: true, // Added index
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transaction_date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    payment_link: {
      type: String, // URL for making payment, if applicable
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
