import express from "express";
import { Login, LogOut, Products, Register ,UserExist } from "../controller/userController.js";
import { verifyToken } from "../middleware/Auth.js";

const route = express.Router();
import Product from "../models/product.js";
import {  addToCart, clearCart,  getCartItems, removeCartItem, updateQuantity } from "../controller/proudct-controller.js";
route.post("/register", Register);
route.post("/login", Login);
route.post("/logout", LogOut);
route.get("/products", verifyToken, Products);
route.get("/user", verifyToken, UserExist);
route.post("/add",addToCart);
route.get("/cart-item", getCartItems);
route.patch("/qty/:id",updateQuantity);
route.delete("/:id", removeCartItem);
route.delete("/clear-cart",clearCart);




route.post("/products", async (req, res) => {
const {name,price,productId,description,quantity}=req.body

  try {
    const product = await Product.create({name,price,productId,description,quantity});

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default route;
