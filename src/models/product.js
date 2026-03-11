import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sizes: {
    type: [String],
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  images: {
    type: [String],
    default: []
  }
}, { timestamps: true });

// ✅ Use ES module export
export default mongoose.model('product', productSchema);