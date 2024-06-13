import { mongooseConnect } from "@lib/mongoose";
import { Order } from "@models/Order";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      const order = await Order.findOne({
        _id: req.query.id,
        userId: session.user.id,
      });
      if (!order) {
        return res.status(404).json({ error: "Order not found!" });
      }
      return res.json(order);
    } else {
      const orders = await Order.find({ userId: session?.user?.id });
      return res.json(orders);
    }
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      const order = await Order.findOne({
        _id: req.query.id,
        userId: session.user.id,
      });
      if (!order) {
        return res
          .status(404)
          .json({ error: "Order not found or unauthorized" });
      }

      await Order.deleteOne({ _id: req.query.id });
      return res.json(true);
    } else {
      return res.status(400).json({ error: "Order ID not provided" });
    }
  }
}
