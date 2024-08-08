import { StarRounded } from '@mui/icons-material';
import { Modal, Box, Button, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { actionType } from './reducer';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from 'axios';
import { useNavigate } from 'react-router'

function CreateProduct({ open, handleClose }) {
    const [{ cart }, dispatch] = useStateValue();
    const [Items, setItems] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImg, setProductImg] = useState('');
    const [productRate, setProductRate] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const navigate = useNavigate()

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
            const response = await axiosPrivate.post(`/cloths`, {
                name: productName,
                price: productPrice,
                img: productImg,
                rating: productRate,
                itemid: productCategory
            });
            console.log('Product updated:', response.data);
            handleClose();
            navigate(0);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} slotProps={{
            backdrop: { sx: { backgroundColor: 'transparent' } }
        }}>
            <Box className="modalProduct">
                <h1>Create Product</h1>
                <br />
                <h3 className='itemName'>{productName}</h3>
                <TextField
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productCategory}
                    label="Category"
                    autoWidth
                    onChange={(e) => setProductCategory(e.target.value)}
                >
                    <MenuItem value={"shirt"}>Kemeja</MenuItem>
                    <MenuItem value={"t-shirt"}>Kaos</MenuItem>
                    <MenuItem value={"jeans"}>Jeans</MenuItem>
                    <MenuItem value={"jacket"}>Jaket</MenuItem>
                    <MenuItem value={"shoes"}>Sepatu</MenuItem>
                    <MenuItem value={"shorts"}>Celana</MenuItem>
                </Select>
                <TextField
                    label="Product Price"
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Product Rating"
                    type="number"
                    value={productRate}
                    onChange={(e) => setProductRate(e.target.value)}
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

export default CreateProduct;
