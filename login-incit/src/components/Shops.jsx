/* eslint-disable no-unused-vars */
import BannerName from './BannerName.jsx';
import Header from './Header.jsx'
import MenuCard from './MenuCard.jsx';
import SubMenuContainer from './SubMenuContainer.jsx';
import ItemCard from './ItemCard.jsx';
import { useEffect, useState } from 'react';
import CartItem from './CartItem.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import _ from 'lodash';
import { useStateValue } from './StateProvider.jsx';
import axios from 'axios';
import { actionType } from './reducer.js';
import { Alert } from '@mui/material';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";

import 'react-toastify/dist/ReactToastify.css';
import OrderTable from './OrderTable';

function Shops() {
    //Main Item state
    const [MenuItems, setMenuItems] = useState([]);
    const [Items, setItems] = useState([]);
    const [tableNumber, setTableNumber] = useState('');
    const [isMainData, setMainData] = useState(
        Items.filter((element) => element.itemId == 'food')
    )

    const [{ cart, total }, dispatch] = useStateValue();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        //fetch data
        const fetchData = async () => {
            try {
                const menuItemsResponse = await axiosPrivate.get("/categories", {
                    signal: controller.signal,
                });
                isMounted && setMenuItems(menuItemsResponse.data);

                const itemsResponse = await axiosPrivate.get("/cloths", {
                    signal: controller.signal,
                });
                isMounted && setItems(itemsResponse.data);
                console.log(menuItemsResponse.data.itemid);
                console.log(itemsResponse);

                if (itemsResponse.data.length > 0) {
                    setMainData(itemsResponse.data.filter(item => item.itemid === 'shirt'));
                }
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


    useEffect(() => {
        // Menu Card toggle
        const menuCards = document.querySelector('.rowContainer').querySelectorAll(".rowMenuCard");



        const setMenuCardActive = (event) => {
            menuCards.forEach((card) => card.classList.remove('active'));
            event.currentTarget.classList.add("active");
        };
        menuCards.forEach((card) => card.addEventListener('click', setMenuCardActive))


    }, [isMainData, cart])

    // set which items belongs to
    const setData = (itemid) => {
        setMainData(Items.filter((element) => element.itemid === itemid))
    }

    const chunkedData = _.chunk(isMainData, 5);

    const handleInputChange = (event) => {
        setTableNumber(event.target.value);
    };

    const handleClick = async () => {
        const orderData = cart.map(item => ({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price),
            quantity: item.quantity,
            total_price: parseFloat(item.price) * item.quantity
        }));


        try {
            if (orderData.length < 1) {
                toast.error('Order cannot be empty!');
                throw new Error('Order cannot be empty!');
            }
            const response = await axiosPrivate.post('/orders', { orderData, tableNumber }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Order placed successfully:', response.data);
            toast.success('Order placed successfully!');
            dispatch({
                type: actionType.SET_CART,
                cart: []
            });

        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div>
                <Header />
            </div>

            <Container>
                <main>
                    <div className="mainContainer">
                        {/* Banner */}
                        <div className="banner">
                            <BannerName name={"Domar"} discount={"20"} link={"#"} />
                        </div>
                        {/* menu container */}
                        <div className="dishContainer">
                            <div className="menuCard">
                                <SubMenuContainer name={"Menu Category"} />
                                <div className="rowContainer">

                                    {
                                        MenuItems && MenuItems.map(data => (
                                            <div key={data.id} onClick={() => setData(data.itemid)} >
                                                <MenuCard imgSrc={data.imgSrc}
                                                    name={data.name}
                                                    isActive={data.id === 1 ? true : false} />
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    chunkedData.map((row, rowIndex) => (
                                        <Row className="dishItemContainer" key={rowIndex}>
                                            {
                                                row.map((data) => (
                                                    <Col xs={12} sm={6} md={4} key={data.id}>
                                                        <ItemCard
                                                            itemId={data.id}
                                                            imgSrc={data.imgsrc}
                                                            name={data.name}
                                                            ratings={data.ratings}
                                                            price={data.price} />
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="rightMenu">
                        {!cart ? <div></div> :
                            <div className="cartCheckOutContainer">
                                <SubMenuContainer name={"Cart Items"} />
                                <div className="cartContainer">
                                    <div className="cartItems">
                                        {
                                            cart && cart.map((data) => (
                                                <CartItem
                                                    key={data.id}
                                                    itemId={data.id}
                                                    name={data.name}
                                                    imgSrc={data.imgsrc}
                                                    price={data.price}
                                                />


                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="totalSection">
                                    <h3>Total</h3>
                                    <p>
                                        <span>
                                            Rp.
                                        </span>
                                        {total}
                                    </p>
                                </div>
                                <div className="tableNumberContainer">
                                    <label htmlFor="tableNumber">Table Number:</label>
                                    <input
                                        id="tableNumber"
                                        type="text"
                                        value={tableNumber}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <button className='checkOut' onClick={handleClick}>Check Out</button>
                                </div>


                            </div>
                        }

                    </div>
                </main>
            </Container>
        </>
    );
}

export default Shops
