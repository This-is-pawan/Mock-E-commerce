import Cart from "../models/Cart.js";




export const addToCart = async (req, res) => {
  const { productId, name, price } = req.body;

  try {
    const existingItem = await Cart.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.json(existingItem);
    }

    const newItem = new Cart({ productId, name, price, quantity: 1 });
    await newItem.save();
    res.json(newItem);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getCartItems = async (req, res) => {
  const items = await Cart.find();
  res.json(items);
};

export const updateQuantity = async (req, res) => {
  try {
    const item = await Cart.findByIdAndUpdate(
      req.params.id,
      { ...req.body },  
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const removeCartItem = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed " });
};


export const clearCart = async (req, res) => {
  await Cart.deleteMany();
  res.json({ message: "Cart cleared " });
};
