/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { ShoppingCartRounded } from "@mui/icons-material";
import { useStateValue } from './StateProvider';
import { Button } from '@mui/material';
import OrderTable from './OrderTable';
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";


function Header() {
  const [{ cart }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    const toggleCart = document.querySelector('.shoppingCart');
    const rightMenu = document.querySelector('.rightMenu');

    const handleToggle = () => {
      rightMenu.classList.toggle('active');
    };

    if (toggleCart) {
      toggleCart.addEventListener('click', handleToggle);
    }

    return () => {
      if (toggleCart) {
        toggleCart.removeEventListener('click', handleToggle);
      }
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const signOut = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <header>
      <div className="profileContainer">
        <div className="imgBox">
          <img src="https://avatars.githubusercontent.com/u/58356962?v=4" alt="" className='profilePic' />
        </div>

        <div className="userName">Clothing store</div>
      </div>

      <div className="shoppingCart">
        <ShoppingCartRounded className='cart' />
        <div className="cart_content">
          <p>{cart?.length || 0}</p>
        </div>
      </div>

      <div className='tableBtn'>
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
          <h3>Order List</h3>
        </Button>
        <OrderTable
          open={open}
          handleClose={handleClose}
        />
      </div>

      <div className='tableBtn'>
        <Button className='detailButton' variant="contained"
          sx={{
            marginLeft: "auto",
            bgcolor: '#f83a00',
            '&:hover': {
              bgcolor: '#fff',
              color: '#f83a00'
            },
            color: '#fff'
          }}
          onClick={signOut}>
          <h3>Logout</h3>
        </Button>
        <OrderTable
          open={open}
          handleClose={handleClose}
        />
      </div>


    </header>
  );
}

export default Header;
