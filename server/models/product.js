import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  productId:String,
  quantity:Number,
  description: String,
},{timestamps:true});

const Product = mongoose.model("product", productSchema,);



export default Product;
