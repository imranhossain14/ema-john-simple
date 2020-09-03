import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {  getDatabaseCart , addToDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10); 
    const [cart, setCart] =useState([]);
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        // object theke key gula ber kore anbo
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey =>{
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        // console.log(previousCart);
        setCart(previousCart);

    }, [])

    const handleAddProduct =(product) => {
        const toBeAdded = products.keys;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }

       setCart(newCart);
        addToDatabaseCart(product.key,count);
        
    }
    
    return (
        <div className = "twin-container">
           <div className = "product-container">
           {/* product component a data pathaitesi */}
            {   
                products.map(pd => <Product 
                    showAddToCart ={true}
                    handleAddProduct ={handleAddProduct} 
                    key ={pd.key}
                    product ={pd}>
                    
                        
                    </Product>)
            }
           
            </div> 

            <div className="cart-container">
                    <Cart cart ={cart}></Cart>
                    <Link to="/review">
                    <button className = "main-button" > Review Order</button>
                    </Link>
            </div>
           
        </div>
    );
};

export default Shop;