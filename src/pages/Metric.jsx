import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import axios from 'axios';
import {
    Table,
    TableContainer,
    Paper,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Button,
    Box,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import CreateMatricValueModal from '../components/CreateMetricValueModal';

const Metric = () => {
    const { id } = useParams();

    const [values, setValues] = useState([]);
    const [showAddValue, setShowAddValue] = useState(false);
    const [value, setValue] = useState(null);
    const [valueChange, setValueChange] = useState(false);

    useEffect(() => {
        initialize();
    }, [valueChange]);

    /**
     * get value for metric
     */
    const initialize = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/metrics/${id}/recordset`);
            setValues(res.data.values);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * show & hide Add Value modal
     */
    const openAddValue = () => setShowAddValue(true);
    const closeAddValue = () => setShowAddValue(false);

    /**
     * save value to DB
     */
    const saveValue = () => {
        const sendingData = {
            "value": value
        };
        axios.post(`${process.env.REACT_APP_SERVER_URL}/metrics/${id}/recordset`, sendingData).then((res) => {
            if (res.status === 201) {
                setValueChange(!valueChange);
                setShowAddValue(false);
            }
        })
    }

    return (
        <div>
            <CreateMatricValueModal
                open={showAddValue}
                close={closeAddValue}
                setValue={setValue}
                save={saveValue}
            />
            <Box sx={{ display: 'flex', m: 1 }}>
                <Button color="primary" component={Link} to={'/metrics'} variant="contained">Back</Button>
                <Button sx={{ ml: 2 }} color="primary" variant="contained" onClick={openAddValue}>Add Value</Button>
            </Box>
            <TableContainer sx={{ m: 1 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Value</TableCell>
                            <TableCell align="right">Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.length ? values.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.value}</TableCell>
                                <TableCell align="right">{format(new Date(row.timestamp), 'MM/dd/yyyy HH:mm:ss')}</TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Metric;