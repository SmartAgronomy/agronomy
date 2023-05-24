import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const Admin = () =>{
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [productImage, setProductImage] = useState('');
  
    useEffect(() => {
      fetchProducts();
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
        await axios.post('http://localhost:8080/admin/products', {
          productName,
          productDescription,
          amount,
          productImage,
        });
        setProductName('');
        setProductDescription('');
        setAmount('');
        setProductImage('');
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
  
    return (
      <div>
        <h1>Admin Module</h1>
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
            Product Image:
            <input
              type="text"
              onChange={(e) => setProductImage(e.target.value)}
            />
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
              <button onClick={() => handleDeleteProduct(product._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
       );
    
}

export default Admin;