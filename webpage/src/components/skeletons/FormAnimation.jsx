import {Typography} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export function ProductFormAnimation() {
    return (
        <div className="cmp-container form-animation">
            <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
            <Skeleton variant="circular" width={64} height={64} sx={{ marginLeft: "auto", marginRight: "auto" }} />
            <Typography component="div" variant={"h3"}>
                    <Skeleton />
            </Typography>
            <Typography component="div" variant={"h3"}>
                <Skeleton />
            </Typography>
            <Typography component="div" variant={"h3"}>
                <Skeleton />
            </Typography>
            <Typography component="div" variant={"h3"}>
                <Skeleton />
            </Typography>
            <Typography component="div" variant={"h3"}>
                <Skeleton />
            </Typography>
            <Typography component="div" variant={"h3"}>
                <Skeleton />
            </Typography>
        </div>
    )
}