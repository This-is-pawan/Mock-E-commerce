import mongoose from "mongoose";
import { nanoid } from "nanoid";  // ✅ Correct import

const CartSchema = new mongoose.Schema({
  itemId: { type: String, default: () => nanoid(), unique: true }, 
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }, 
  quantity: { type: Number, default: 1 },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
