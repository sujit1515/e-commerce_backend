import Wishlist from "../models/Wishlist.js";
import Cart from "../models/Cart.js";

//Get wishlist 
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // user from auth middleware

    const wishlist = await Wishlist.find({ user: userId })
      .populate("product"); // get full product details

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist",
      error: error.message,
    });
  }
};

//Add wishllist

export const addWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const exists = await Wishlist.findOne({
      user: userId,
      product: productId
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist"
      });
    }

    const wishlist = await Wishlist.create({
      user: userId,
      product: productId
    });

    res.status(201).json({
      success: true,
      wishlist
    });

  }catch (error) {
  console.error("Add wishlist error:", error);

  res.status(500).json({
    success: false,
    message: "Error adding wishlist",
    error: error.message
  });
}
};

// REMOVE WISHLIST
export const removeWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const wishlist = await Wishlist.findOneAndDelete({
      user: userId,
      product: productId
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing wishlist",
      error: error.message
    });
  }
};

//MOve Wishlist To Cart
export const moveWishlistToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // check if product exists in wishlist
    const wishlistItem = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    // check if already in cart
    const cartItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      await Cart.create({
        user: userId,
        product: productId,
        quantity: 1,
      });
    }

    // remove from wishlist
    await Wishlist.deleteOne({
      user: userId,
      product: productId,
    });

    res.status(200).json({
      success: true,
      message: "Product moved to cart successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error moving product to cart",
      error: error.message,
    });
  }
};

// Toggle Wishlist
export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Check if product is already in wishlist
    const exists = await Wishlist.findOne({ user: userId, product: productId });

    if (exists) {
      // Remove it
      await Wishlist.deleteOne({ user: userId, product: productId });
      return res.status(200).json({
        success: true,
        action: "removed",
        message: "Product removed from wishlist",
      });
    }

    // Otherwise, add it
    const wishlist = await Wishlist.create({ user: userId, product: productId });
    return res.status(201).json({
      success: true,
      action: "added",
      message: "Product added to wishlist",
      wishlist,
    });

  } catch (error) {
    console.error("Toggle wishlist error:", error);
    res.status(500).json({
      success: false,
      message: "Error toggling wishlist",
      error: error.message,
    });
  }
};



// export const removeWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId } = req.body;

//     const wishlist = await Wishlist.findOneAndDelete({
//       user: userId,
//       product: productId
//     });

//     if (!wishlist) {
//       return res.status(404).json({
//         success: false,
//         message: "Wishlist item not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product removed from wishlist"
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error removing wishlist",
//       error: error.message
//     });
//   }
// };