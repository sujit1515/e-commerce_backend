import Product from "../models/product.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
      createdBy: req.user?.id, // if using auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};