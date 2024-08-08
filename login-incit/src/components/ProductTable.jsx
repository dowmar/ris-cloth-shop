import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Pagination
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import EditProduct from './EditProduct';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await axiosPrivate.get("/cloths", {
          signal: controller.signal,
        });
        if (isMounted) {
          const sortedProducts = response.data.sort((a, b) => a.id - b.id);
          setProducts(sortedProducts);
        }
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/cloths/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting the product:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayProducts = products.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className='menuTable'>
      <h1>Products Page</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  <img src={product.imgsrc} alt='' className='productImg' />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(product)}>
                    <Edit />
                  </IconButton>
                  <EditProduct
                    open={open}
                    handleClose={handleClose}
                    name={selectedProduct?.name}
                    price={selectedProduct?.price}
                    img={selectedProduct?.imgsrc}
                    itemId={selectedProduct?.id}
                  />
                  <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(products.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default ProductTable;
