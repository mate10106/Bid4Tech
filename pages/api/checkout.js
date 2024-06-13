import { mongooseConnect } from "@lib/mongoose";
import { Order } from "@models/Order";
import { Product } from "@models/Product";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("POST kérésnek kell lennie");
    return;
  }
  await mongooseConnect();

  const {
    name,
    email,
    phone,
    city,
    address,
    floor,
    door,
    postal,
    cartProducts,
    userId,
  } = req.body;

  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const info = productsInfos.find((p) => p._id.toString() === productId);
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;

    if (quantity > 0 && info) {
      line_items.push({
        quantity,
        price_data: {
          currency: "huf",
          product_data: { name: info.title },
          unit_amount: quantity * info.price * 100,
        },
      });
    }
  }
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    phone,
    city,
    address,
    floor,
    door,
    postal,
    paid: false,
    userId,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    success_url: process.env.NEXTAUTH_URL + "/Cart?success=1",
    cancel_url: process.env.NEXTAUTH_URL + "/Cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
  });

  res.json({
    url: session.url,
  });
}
