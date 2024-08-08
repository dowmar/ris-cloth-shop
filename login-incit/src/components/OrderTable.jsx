import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Modal, Box } from '@mui/material';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const OrderTable = ({ open, handleClose }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/orders', {
                    signal: controller.signal,
                });
                isMounted && setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
            controller.abort;
        };
    }, []);

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Item ID', accessor: 'itemid' },
            { Header: 'Name', accessor: 'name' },
            { Header: 'Price', accessor: 'price' },
            { Header: 'Quantity', accessor: 'quantity' },
            { Header: 'Total Price', accessor: 'total_price' },
            { Header: 'Created Time', accessor: 'created_time' },
            { Header: 'Table Number', accessor: 'table_number' }
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (

        <Modal open={open} onClose={handleClose}>
            <Box className="modalTable">
                <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} style={{ border: '1px solid orange', padding: '8px' }} key={column.id}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} style={{ border: '1px solid orange', padding: '8px' }} key={cell.column.id}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Box>
        </Modal>
    );
};

export default OrderTable;
