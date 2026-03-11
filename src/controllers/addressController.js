import Address from "../models/Address.js";


// ADD ADDRESS
export const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const address = await Address.create({
      ...req.body,
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// GET ALL ADDRESSES
export const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await Address.find({ user: userId });

    res.status(200).json({
      success: true,
      addresses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// UPDATE ADDRESS
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Address updated",
      address,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    await Address.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Address deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// SET DEFAULT ADDRESS
export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // remove previous default
    await Address.updateMany(
      { user: userId },
      { isDefault: false }
    );

    const address = await Address.findByIdAndUpdate(
      id,
      { isDefault: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Default address updated",
      address,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};