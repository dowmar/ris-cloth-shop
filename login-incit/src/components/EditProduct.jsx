import { StarRounded } from '@mui/icons-material';
import { Modal, Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from 'axios';
import { useNavigate } from 'react-router'

function EditProduct({ open, handleClose, name, price, img, itemId }) {
    const [{ cart }, dispatch] = useStateValue();
    const [Items, setItems] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [productName, setProductName] = useState(name);
    const [productPrice, setProductPrice] = useState(price);
    const [productImg, setProductImg] = useState(img);
    const navigate = useNavigate()

    useEffect(() => {
        setProductName(name);
        setProductPrice(price);
        setProductImg(img);
    }, [name, price, img]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const itemsResponse = await axiosPrivate.get("/cloths", {
                    signal: controller.signal,
                });
                if (isMounted) {
                    setItems(itemsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [axiosPrivate]);

    const handleSave = async () => {
        try {
            const response = await axiosPrivate.patch(`/cloths/${itemId}`, {
                name: productName,
                price: productPrice,
                img: productImg,
            });
            console.log('Product updated:', response.data);
            handleClose();
            navigate(0);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} id={itemId} slotProps={{
            backdrop: { sx: { backgroundColor: 'transparent' } }
        }}>
            <Box className="modalProduct">
                <img src={productImg} alt={productName} style={{ width: '100%', height: 'auto' }} />
                <h3 className='itemName'>{productName}</h3>
                <TextField
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Product Price"
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Product Image URL"
                    value={productImg}
                    onChange={(e) => setProductImg(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    sx={{ mt: 4, bgcolor: '#f8901c', '&:hover': { bgcolor: '#f8901c' } }}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
}

export default EditProduct;
