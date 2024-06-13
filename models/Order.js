import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  line_items: Object,
  name: String,
  email: String,
  phone: String,
  city: String,
  address: String,
  postal: Number,
  floor: Number,
  door: Number,
  paid: Boolean,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export const Order = models.Order || model("Order", OrderSchema);
