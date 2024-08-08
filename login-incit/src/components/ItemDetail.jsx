import { StarRounded } from '@mui/icons-material';
import { Modal, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from 'axios';

function ItemDetail({ open, handleClose, food, itemId }) {
    const [{ cart }, dispatch] = useStateValue();
    const [currRating, setRating] = useState(Math.floor(food.ratings));
    const [Items, setItems] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const itemsResponse = await axiosPrivate.get("/cloths", {
                    signal: controller.signal,
                });
                isMounted && setItems(itemsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
            controller.abort;
        };
    }, []);

    const addToCart = () => {
        const existingItem = cart.find(item => item.id === itemId);
        let newCart;
        if (existingItem) {
            newCart = cart.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            const item = Items.find(n => n.id === itemId);
            if (item) {
                item.quantity = 1;
                newCart = [...cart, item];
            }
        }
        dispatch({
            type: actionType.SET_CART,
            cart: newCart,
        });
    };

    const handleClick = (value) => {
        setRating(value);
    };

    return (
        <Modal open={open} onClose={handleClose} id={itemId}>
            <Box className="modalDetail">
                <img src={food.imgSrc} alt={food.name} style={{ width: '100%', height: 'auto' }} />
                <h3 className='itemName'>{food.name}</h3>
                <div className="bottom">
                    <div className="ratings">
                        {Array.apply(null, { length: food.ratings }).map((e, i) => (
                            <i key={i} className={`rating ${currRating > i ? "orange" : "gray"}`}
                                onClick={() => handleClick(i + 1)}>
                                <StarRounded />
                            </i>
                        ))}
                        <h3 className="price"><span>Rp. </span>{food.price}</h3>
                    </div>
                </div>
                <Button
                    variant="contained"
                    sx={{ mt: 4, bgcolor: '#f8901c', '&:hover': { bgcolor: '#f8901c' } }}
                    onClick={addToCart}
                >
                    BUY
                </Button>
            </Box>
        </Modal>
    );
}

export default ItemDetail;
