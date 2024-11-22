import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  namaBarang: {
    type: String,
    required: true,
    unique: true
  },
  gambar: String,
  deskripsi: String,
  harga: {
    type: Number,
    required: true
  },
  stok: {
    type: Number,
    required: true
  },
  kategori: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Mengacu pada model Kategori
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
