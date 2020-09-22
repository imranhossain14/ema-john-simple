import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../Reviewitem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';



const Review = () => {
    const [cart , setCart] = useState([]); 
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()
    
    const handleProceedCheckout =() => {
        history.push('/shipment')
    }
    
 

    const removeProduct = (productKey) => {
        // console.log("Remove clicked", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        //database theke delete kortesi
        removeFromDatabaseCart(productKey);
        
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        // pura array theke key gula alada korte built-in Object.keys function ta use kora hoise
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key =>{
                    // ei key jeta pailam oi product e take khuje ber kortesi r sob details niye astesi
                const product =  fakeData.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
        setCart(cartProducts);
        
    }, []);
   let thankyou;
   if(orderPlaced){
    thankyou = <img src= {happyImage} />
   }

    return (
        <div className ="twin-container" >
                        <div className ="product-container">
                                { 
                                    cart.map(pd => <ReviewItem 
                                        product = {pd}
                                        key ={pd.key}
                                        removeProduct ={removeProduct}
                                        ></ReviewItem>)
                                }
                                   {thankyou}
                         </div>   
                 
                    <div className="cart-container">
                             <Cart cart= {cart}  ></Cart>
                             <button onClick ={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                    </div> 
                
        </div>
    );
};

export default Review;