import {
    Dialog,
    DialogTitle,
    DialogContentText,
    Typography,
    DialogContent,
} from "@mui/material";

const KeyboardShortcutsDialog = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogContent>
            <DialogContentText component="div">
                <Typography variant="h6" gutterBottom>
                    Task Creation
                </Typography>
                <Typography>
                    <strong>Ctrl/Cmd + N</strong> - Focus task input
                </Typography>
                <Typography>
                    <strong>Enter</strong> - Submit/Update task
                </Typography>
                <Typography>
                    <strong>Escape</strong> - Cancel editing
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Task Management
                </Typography>
                <Typography>
                    <strong>Ctrl/Cmd + D</strong> - Toggle selected task
                    done/undone
                </Typography>
                <Typography>
                    <strong>Ctrl/Cmd + E</strong> - Edit selected task
                </Typography>
                <Typography>
                    <strong>Delete</strong> - Delete selected task
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Navigation
                </Typography>
                <Typography>
                    <strong>Ctrl/Cmd + 1</strong> - Focus pending tasks
                </Typography>
                <Typography>
                    <strong>Ctrl/Cmd + 2</strong> - Focus completed tasks
                </Typography>
                <Typography>
                    <strong>Ctrl/Cmd + /</strong> - Show this help dialog
                </Typography>
            </DialogContentText>
        </DialogContent>
    </Dialog>
);


export default KeyboardShortcutsDialog;