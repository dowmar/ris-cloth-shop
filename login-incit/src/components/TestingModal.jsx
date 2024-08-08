import { Modal, Box, Typography, Button } from '@mui/material';

function TestingModal({ open, handleClose }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 400, bgcolor: 'white', border: '2px solid #000',
                boxShadow: 24, p: 4
            }}>
                <Typography variant="h6" component="h2">
                    sdfsdfsfsdfsf
                </Typography>
                <img src={"#"} alt={"sfsdf"} style={{ width: '100%', height: 'auto' }} />
                <Typography variant="body1" sx={{ mt: 2 }}>
                    asdklfjalfjlfj
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    asdfafasdfas
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 4, bgcolor: '#f8901c', '&:hover': { bgcolor: '#f8901c' } }}
                    onClick={() => alert('Order placed!')}
                >
                    Order Now
                </Button>
            </Box>
        </Modal>
    )
}

export default TestingModal
