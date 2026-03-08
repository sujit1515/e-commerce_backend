import Cart from "../models/Cart.js";

//Add cart API
export const addToCart = async (req, res) => {
  try {

    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Check if product already in cart
    let cartItem = await Cart.findOne({
      user: userId,
      product: productId
    });

    if (cartItem) {

      // Increase quantity
      cartItem.quantity += quantity || 1;
      await cartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart quantity updated",
        cart: cartItem
      });
    }

    // Create new cart item
    const cart = await Cart.create({
      user: userId,
      product: productId,
      quantity: quantity || 1
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: error.message
    });

  }
};

// REMOVE CART ITEM
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cartItem = await Cart.findOneAndDelete({
      user: req.user.id,
      product: productId
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing cart item",
      error: error.message
    });
  }
};

//Update Cart Quantity
export const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
};

// GET CART WITH PRODUCT DETAILS
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.find({ user: userId })
      .populate("product"); 

    res.status(200).json({
      success: true,
      cart: cartItems,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

// CLEAR CART
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.deleteMany({ user: userId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message
    });
  }
};