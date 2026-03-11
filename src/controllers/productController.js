
import Product from "../models/product.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, images } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images,
      createdBy: req.user?.id
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// GET ALL PRODUCTS WITH FILTER
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      size,
      color,
      search,
      page = 1,
      limit = 10
    } = req.query;

    let query = {};

    // 🔎 Search by product name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // 📦 Filter by category
    if (category) {
      query.category = category;
    }

    // 👕 Filter by size
    if (size) {
      query.sizes = size;
    }

    // 🎨 Filter by color
    if (color) {
      query.colors = color;
    }

    // 💰 Filter by price
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      totalProducts,
      page: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message
    });
  }
};