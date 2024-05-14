import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function TableAnimations() {
    return (
        <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </Box>
    );
}