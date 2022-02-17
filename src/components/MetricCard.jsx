import {
    Card,
    CardActions,
    Button,
    CardContent,
    Typography,
} from '@mui/material';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';

export default function MetricCard({ item, deleteMetric}) {
    return (
        <Card sx={{ m: 1 }}>
            <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                </Typography>
                <Typography>
                    {format(new Date(item.timestamp), 'MM/dd/yyyy HH:mm:ss')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="primary" data-testid="metric-open" component={Link} to={'/metric/' + item.id} variant="contained">Open</Button>
                <Button sx={{ ml: 2 }} color="error" variant="contained" onClick={() => { deleteMetric(item.id) }}>Delete</Button>
            </CardActions>
        </Card>
    )
}