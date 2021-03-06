import React from 'react';


const Cart = (props) => {
        const cart = props.cart; 
        //  const product  = cart.map(pd =>parseFloat(pd.price));
            
        //console.log(product);
        //const totalPrice = cart.reduce((total,prd) => total + prd.price, 0);
        const total = cart.reduce((total, prod) => total + prod.price * prod.quantity,0)
        // let total =0 ;
        // for (let i = 0; i < cart.length; i++) {
        //     const product = cart[i];
        //     total = total + product.price;
            
        // }
        let shipping = 0
        if(total>35){
            shipping =0;
        }
        else if(total>0){
            shipping =12.99;
        }
        else if(total>15){
            shipping = 4.99;
        }

        const tax = (total/10);
        const grandTotal = (total+shipping+ Number(tax)).toFixed(2);
        const formatNumber = num => {
            const precision = num.toFixed(2);
            return Number(precision);
        }
        
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Orders : {cart.length}</p>
             {/* <p>Product Price : {formatNumber(total) }</p> */}
             <p>Product Price : {formatNumber(total)}</p>
            <p><small>Shipping Cost : {shipping}</small></p>
            <p><small>Tax+ Vat : {formatNumber(tax)}</small></p>
            <p>Total price : {grandTotal}</p>
            <br/>
           {
               props.children
           }

        </div>
    );
};


export default Cart;