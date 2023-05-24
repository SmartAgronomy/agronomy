const express = require('express');
const productController = require('./productController');

const router = express.Router();

// Route to get all products
router.get('/', async (req, res) => {
  const productsResult = await productController.getProducts();
  if (productsResult.success) {
    res.status(200).json({ products: productsResult.products });
  } else {
    res.status(500).json({ message: productsResult.message });
  }
});

// Route to add a product
router.post('/', async (req, res) => {
  const { productName, productDescription, amount, productImage } = req.body;

  const result = await productController.addProduct(
    productName,
    productDescription,
    amount,
    productImage
  );
  if (result.success) {
    res.status(201).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

// Route to delete a product
router.delete('/:id', async (req, res) => {
  const productId = req.params.id;

  const result = await productController.deleteProduct(productId);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

// Route to edit a product
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;

  const result = await productController.editProduct(productId, updatedData);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

module.exports = router;
