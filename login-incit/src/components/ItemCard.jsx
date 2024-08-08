/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import { Favorite } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';
import ItemDetail from './ItemDetail';
import { Button } from '@mui/material';
let cartData = [];

function ItemCard({ imgSrc, name, ratings, price, itemId }) {

    const [isFavourite, setFavourite] = useState(false);
    const [isCart, setCart] = useState(null);
    const [{ }, dispatch] = useStateValue();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isCart) {
            cartData.push(isCart);
            console.log(cartData);
            dispatch({
                type: actionType.SET_CART,
                cart: cartData,
            })
        }
    }, [isCart]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='itemCard' id={itemId}>
            <div className={`isFavourite ${isFavourite ? "active" : ""}`}
                onClick={() => setFavourite(!isFavourite)}>
                <Favorite />
            </div>
            <div className="imgBox">
                <img src={imgSrc} alt='' className='itemImg' />
            </div>
            <div className="itemContent">
                <h3 className='itemName'>{name}</h3>
                <div className="bottom">
                    <div className="ratings">
                        <h3 className="price"><span>Rp. </span>{price}</h3>
                    </div>
                    {/* <i className="addToCart" onClick={() => setCart(Items.find(n => n.id === itemId))}>
                        <AddRounded />
                    </i> */}
                </div>

                <div className='detailBtn'>
                    <Button className='detailButton' variant="contained"
                        sx={{
                            marginLeft: "auto",
                            bgcolor: '#f8901c',
                            '&:hover': {
                                bgcolor: '#fff',
                                color: '#f8901c'
                            },
                            color: '#fff'
                        }}
                        onClick={handleOpen}>
                        <h3>Add</h3>
                    </Button>
                    <ItemDetail
                        open={open}
                        handleClose={handleClose}
                        food={{ name, imgSrc, price, ratings }}
                        itemId={itemId}
                    />
                </div>
            </div>
        </div>
    )
}

export default ItemCard
