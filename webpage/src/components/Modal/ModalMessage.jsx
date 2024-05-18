import {modalStyle} from "./ModalHook.js";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {Typography} from "@mui/material";

export function ModalMsg({ message, activate, modalRead }) {
    return (
        <Modal open={activate} onClose={modalRead} aria-labelledby="cmp-title">
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {message}
                </Typography>
            </Box>
        </Modal>
    )
}