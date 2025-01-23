import mongoose from "mongoose";

const transactionLogSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction", // Reference to the Transaction schema
      required: [true, "Transaction ID is required"],
      index: true, // Added index
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer ID is required"],
      index: true, // Added index
    },
    payment_amount: {
      type: Number,
      required: [true, "Payment amount is required"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "USD",
    },
    mode_of_payment: {
      type: String,
      enum: ["credit_card", "bank_transfer", "paypal", "cash"],
      required: [true, "Mode of payment is required"],
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const TransactionLog = mongoose.model(
  "TransactionLog",
  transactionLogSchema
);
