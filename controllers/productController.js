// controllers/productController.mjs
import Product from '../models/product.js'; // Pastikan path ini sesuai dengan file model

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// GET product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// CREATE a new product
export const createProduct = async (req, res) => {
  try {
    const { namaBarang, deskripsi, harga, stok, kategori } = req.body;
    if (!namaBarang || !harga || !stok || !kategori) {
      return res.status(400).json({ message: 'Nama barang, harga, stok, dan kategori harus diisi' });
    }

    const existingProduct = await Product.findOne({ namaBarang });
    if (existingProduct) {
      return res.status(400).json({ message: 'Nama barang sudah ada. Harap gunakan nama lain.' });
    }

    const product = new Product({
      namaBarang,
      gambar: req.file ? req.file.filename : '',
      deskripsi,
      harga,
      stok,
      kategori
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat produk', error: error.message });
  }
};

// UPDATE a product
export const updateProduct = async (req, res) => {
  try {
    const { namaBarang, deskripsi, harga, stok, kategori } = req.body;
    if (stok < 0) {
      return res.status(400).json({ message: 'Stok tidak boleh negatif' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updatedData = {
      namaBarang: namaBarang || product.namaBarang,
      gambar: req.file ? req.file.filename : product.gambar,
      deskripsi: deskripsi || product.deskripsi,
      harga: harga || product.harga,
      stok: stok !== undefined ? stok : product.stok,
      kategori: kategori || product.kategori
    };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui produk', error: error.message });
  }
};

// DELETE a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
