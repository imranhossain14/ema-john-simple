import React from 'react';

const Reviewitem = (props) => {
    // object destructuring kore nei
    const {name, quantity, key, price} = props.product;
    const reviewStyle ={
        borderBottom : '1px solid lightgray',
        marginBottom : '5px',
        paddingBottom : '5px',
        marginLeft : '5px'


    }
    return (
        <div style = {reviewStyle}className="review-item">
            <h1 className="product-name">{name}</h1>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button className="main-button" 
                    onClick= {() =>props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default Reviewitem;