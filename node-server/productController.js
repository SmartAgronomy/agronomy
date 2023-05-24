const Product = require('./models/Product');

const getProducts = async () => {
  try {
    const products = await Product.find();
    return { success: true, products };
  } catch (error) {
    return { success: false, message: 'Failed to get products' };
  }
};

const addProduct = async (productName, productDescription, amount, productImage) => {
  try {
    const product = new Product({
      productName,
      productDescription,
      amount,
      productImage,
    });
    await product.save();
    return { success: true, message: 'Product added successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to add product' };
  }
};

const deleteProduct = async (productId) => {
  try {
    await Product.findByIdAndDelete(productId);
    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete product' };
  }
};

const editProduct = async (productId, updatedData) => {
  try {
    await Product.findByIdAndUpdate(productId, updatedData);
    return { success: true, message: 'Product updated successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to update product' };
  }
};

module.exports = { getProducts, addProduct, deleteProduct, editProduct };
