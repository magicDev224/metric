import React from 'react'
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material'
import { styled } from '@mui/system';

//white button styled
const WhiteBtn = styled(Button)(() => ({
    backgroundColor: '#FFFFFF',
    color: '#000000',
    '&:hover': {
        backgroundColor: '#FFFFFF'
    }
}));

export default function CreateMetricValueModal({ open, close, setValue, save }) {
    //modal style
    const style = {
        position: 'absolute',
        top: '0%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={close}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Value
                </Typography>
                <TextField label="Metric value" variant="standard" onChange={(e) => { setValue(e.target.value) }} />
                <Box sx={{ display: 'flex', mt: 3 }}>
                    <WhiteBtn variant="contained" onClick={close}>Close</WhiteBtn>
                    <Button sx={{ ml: 2 }} color="primary" variant="contained" onClick={save}>Save</Button>
                </Box>
            </Box>
        </Modal>
    )
}