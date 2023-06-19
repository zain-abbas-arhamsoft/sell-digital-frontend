import React, { useContext, useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import cartContext from '../../contexts/cart/cartContext';
const QuantityBox = (props) => {
    const { itemId, itemQuantity } = props;
    // console.log('itemId', itemId)
    // console.log('itemQuantity', itemQuantity)
    // const { incrementItem, decrementItem } = useContext(cartContext);
    const [quantity, setQuantity] = useState(itemQuantity);

    // useEffect(() => {
    //     setQuantity(itemQuantity);
    //   }, [itemQuantity]);
    useEffect(() => {
        console.log('quantity', quantity)
        console.log('itemId', itemId)
    }, [quantity])
    const incrementItem = (itemQuantity) => {
        // console.log('itemQuantity increment', itemQuantity)
        setQuantity(itemQuantity => itemQuantity + 1); // Update the quantity state
    }
    const decrementItem = (itemQuantity) => {
        // console.log('itemQuantity decrement', itemQuantity)
        setQuantity(itemQuantity => itemQuantity - 1); // Update the quantity state
    }
    return (
        <>
            <div className="quantity_box">
                <button
                    type="button"
                    onClick={() => decrementItem(itemQuantity)}
                    disabled={quantity <= 1}
                >
                    <FaMinus />
                </button>
                <span className="quantity_count">
                    {quantity}
                </span>
                <button
                    type="button"
                    onClick={() => incrementItem(itemQuantity)}
                    disabled={quantity >= 5}
                >
                    <FaPlus />
                </button>
            </div>
        </>
    );
};

export default QuantityBox;