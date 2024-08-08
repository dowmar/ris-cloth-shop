import { AddRounded, RemoveRounded } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';

function CartItem({ itemId, name, imgSrc, price }) {
    const [qty, setQty] = useState(1);
    const [{ cart }, dispatch] = useStateValue();
    const [itemPrice, setItemPrice] = useState(parseFloat(price));

    const deleteItem = id => {
        const newCart = cart.filter(item => item.id !== id);
        dispatch({
            type: actionType.SET_CART,
            cart: newCart
        });
    };

    const updateQuantity = (action, id) => {
        const newCart = cart.map(item => {
            if (item.id === id) {
                if (action === 'add') {
                    item.quantity = item.quantity ? item.quantity + 1 : qty + 1;
                    setQty(item.quantity);
                } else if (action === 'subtract' && item.quantity > 1) {
                    item.quantity = item.quantity ? item.quantity - 1 : qty - 1;
                    setQty(item.quantity);
                } else if (action === 'subtract' && item.quantity === 1) {
                    deleteItem(id);
                    return null;
                }
            }
            return item;
        }).filter(item => item !== null);

        dispatch({
            type: actionType.SET_CART,
            cart: newCart,
        });
    };

    useEffect(() => {
        const cartItem = cart.find(item => item.id === itemId);
        if (cartItem) {
            setQty(cartItem.quantity);
            setItemPrice(parseFloat(price) * cartItem.quantity);
        }
    }, [cart, itemId, price]);

    return (
        <div className="cartItem">
            <div className="imgBox">
                <img src={imgSrc} alt={name} />
            </div>
            <div className="itemSection">
                <h2 className="itemName">{name}</h2>
                <div className="itemQuantity">
                    <span>x {qty}</span>
                    <div className="quantity">
                        <RemoveRounded className='itemRemove' onClick={() => updateQuantity('subtract', itemId)} />
                        <AddRounded className='itemAdd' onClick={() => updateQuantity('add', itemId)} />
                    </div>
                </div>
            </div>
            <p className="itemPrice">
                <span className="dolarSign">Rp</span>
                <span className="itemPriceValue">{itemPrice}</span>
            </p>
        </div>
    );
}

export default CartItem;
