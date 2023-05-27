const express = require('express');
const router = express.Router();
const categoryController = require('./categoryController');

// GET /categories - Get all categories
// router.get('/', async (req, res) => {
//   try {
//     const result = await getCategories();
//     if (result.success) {
//       res.status(200).json(result.categories);
//     } else {
//       res.status(500).json({ error: result.message });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.get('/', async (req, res) => {
    const categoryResult = await categoryController.getCategories();
    if (categoryResult.success) {
      res.status(200).json({ categories: categoryResult.categories });
    } else {
      res.status(500).json({ message: categoryResult.message });
    }
  });

// POST /categories - Add a category
router.post('/', async (req, res) => {
  const { categoryName } = req.body;

  try {
    const result = await categoryController.addCategory(categoryName);
    if (result.success) {
      res.status(201).json({ success: true, category: result.category });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
