// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
 
// const Admin = () =>{
//     const [products, setProducts] = useState([]);
//     const [productName, setProductName] = useState('');
//     const [productDescription, setProductDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const [productImage, setProductImage] = useState('');
//     const [productImageFilename, setProductImageFilename] = useState('');
//     const [productImageLocation, setProductImageLocation] = useState('');

//     useEffect(() => {
//       fetchProducts();
//     }, []);
  
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/admin/products');
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }
//     };
  
//     const handleAddProduct = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await axios.post('http://localhost:8080/admin/products', {
//           productName,
//           productDescription,
//           amount,
//           productImage: {
//             filename: productImageFilename,
//             location: productImageLocation,
//           },
//         });
//         console.log('Product added successfully:', response.data);
//         setProductName('');
//         setProductDescription('');
//         setAmount('');
//         setProductImageFilename('');
//         setProductImageLocation('');
//         fetchProducts();
//       } catch (error) {
//         console.error('Failed to add product:', error);
//       }
//     };
  
//     const handleDeleteProduct = async (productId) => {
//       try {
//         await axios.delete(`http://localhost:8080/admin/products/${productId}`);
//         fetchProducts();
//       } catch (error) {
//         console.error('Failed to delete product:', error);
//       }
//     };
  
//     return (
//       <div>
//         <h1>Admin Module</h1>
//         <form onSubmit={handleAddProduct}>
//           <label>
//             Product Name:
//             <input
//               type="text"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//             />
//           </label>
//           <br />
//           <label>
//             Product Description:
//             <textarea
//               value={productDescription}
//               onChange={(e) => setProductDescription(e.target.value)}
//             ></textarea>
//           </label>
//           <br />
//           <label>
//             Amount:
//             <input
//               type="text"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//           </label>
//           <br />
//           <label>
//           Product Image Filename:
//           <input
//             type="text"
//             value={productImageFilename}
//             onChange={(e) => setProductImageFilename(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Product Image Location:
//           <input
//             type="text"
//             value={productImageLocation}
//             onChange={(e) => setProductImageLocation(e.target.value)}
//           />
//         </label>
//           <br />
//           <button type="submit">Add Product</button>
//         </form>
//         <h2>Products:</h2>
//         <ul>
//           {products.map((product) => (
//             <li key={product._id}>
//               <strong>{product.productName}</strong>
//               <p>{product.productDescription}</p>
//               <p>Amount: {product.amount}</p>
//               {product.productImage && (
//               <img
//                 src={product.productImage.location}
//                 alt={product.productImage.filename}
//               />
//             )}
//               <button onClick={() => handleDeleteProduct(product._id)}>
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//        );
    
// }

// export default Admin;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productImageFilename, setProductImageFilename] = useState('');
  const [productImageLocation, setProductImageLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryAdded, setCategoryAdded] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/products', {
        productName,
        productDescription,
        amount,
        productImage: {
          filename: productImageFilename,
          location: productImageLocation,
        },
        categoryId: selectedCategory,
      });
      console.log('Product added successfully:', response.data);
      setProductName('');
      setProductDescription('');
      setAmount('');
      setProductImageFilename('');
      setProductImageLocation('');
      setSelectedCategory('');
      fetchProducts();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/admin/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  const handleAddCategory = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('http://localhost:8080/admin/categories', {
        categoryName,
      });
      console.log('Category added successfully');
      setCategoryName('');
      setCategoryAdded(true);
      fetchCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };
  


  

  return (
    <div>
      <h1>Admin Module</h1>
      <form onSubmit={handleAddCategory}>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Category</button>
      </form>
      <form onSubmit={handleAddProduct}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product Description:
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </label>
        <br />
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product Image Filename:
          <input
            type="text"
            value={productImageFilename}
            onChange={(e) => setProductImageFilename(e.target.value)}
          />
        </label>
        <br />
        <label>
          Product Image Location:
          <input
            type="text"
            value={productImageLocation}
            onChange={(e) => setProductImageLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Category:
          <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories && categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
        </label>  
        <br />
        <button type="submit">Add Product</button>
      </form>
      <h2>Products:</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
    
            <strong>{product.productName}</strong>
            <p>{product.productDescription}</p>
            <p>Amount: {product.amount}</p>
            <p>{product.category.categoryName}</p>
            {product.productImage && (
              <img
                src={product.productImage.location}
                alt={product.productImage.filename}
              />
            )}
            <button onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2>Categories:</h2>
{categories.length > 0 ? (
  <ul>
    {categories.map((category) => (
      <li key={category._id}>
        <p>{category.categoryName} (ID: {category._id})</p>
      </li>
    ))}
  </ul>
) : (
  <p>No categories found.</p>
)}

    </div>
  );
};

export default Admin;
