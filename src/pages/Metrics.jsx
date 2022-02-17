import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Button,
    AppBar,
    Box,
    Toolbar,
} from '@mui/material';
import { styled } from '@mui/system';
import CreateMetricModal from '../components/CreateMetricModal';
import MetricCard from '../components/MetricCard';

//white button styled
const WhiteBtn = styled(Button)(() => ({
    backgroundColor: '#FFFFFF',
    color: '#000000',
    '&:hover': {
        backgroundColor: '#FFFFFF'
    }
}));

const Metrics = () => {
    const [metrics, setMetrics] = useState([]);
    const [showMetric, setShowMetric] = useState(false);
    const [metricName, setMetricName] = useState(null);
    const [metricChange, setMetricChange] = useState(false);

    useEffect(() => {
        initialize();
    }, [metricChange]);

    /**
     * show & hide create Metric modal
     */
    const openCreateMetric = () => setShowMetric(true);
    const closeCreateMetric = () => setShowMetric(false);

    /**
     * save Metric name
     */
    const saveMetricName = () => {
        const sendingData = {
            name: metricName
        }
        axios.post(`${process.env.REACT_APP_SERVER_URL}/metrics`, sendingData).then((res) => {
            if (res.status === 201) {
                setMetricChange(!metricChange);
                setShowMetric(false);
            }
        });
    }

    /**
     * delete metric
     * @param {id of metric} id 
     */
    const deleteMetric = (id) => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/metrics/${id}`).then((res) => {
            if (res.status === 200) {
                setMetricChange(!metricChange);
            }
        })
    }

    /**
     * get metrics list
     */
    const initialize = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/metrics`);
            setMetrics(res.data.metrics);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div data-testid="metrics">
            <CreateMetricModal
                open={showMetric}
                close={closeCreateMetric}
                setName={setMetricName}
                save={saveMetricName}
            />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <WhiteBtn variant="contained" onClick={openCreateMetric} >CREATE METRIC</WhiteBtn>
                    </Toolbar>
                </AppBar>
            </Box>
            <div data-testid="metric-cards">
                {
                    metrics && metrics.length > 0 && metrics.map((item, index) => (
                        <MetricCard
                            key={index}
                            item={item}
                            deleteMetric={deleteMetric}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default Metrics;