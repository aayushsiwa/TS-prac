import { Snackbar, Alert } from "@mui/material";
import { AlertSB, AlertSnackBarProps } from "../utils/types";

const AlertSnackBar: React.FC<AlertSnackBarProps> = ({ alert, setAlert }) => {
    return (
        <Snackbar
            open={!!alert.alert}
            autoHideDuration={alert.autoHideDuration || 3000}
            onClose={() => setAlert({} as AlertSB)}
            sx={{
                opacity: 0.7,
            }}
        >
            <Alert
                severity={alert.severity}
                variant="filled"
                sx={{
                    // backgroundColor: "#ff000090",
                    fontWeight: "bold",
                    backdropFilter: "blur(1px)",
                    // border: "2px solid #f00",
                }}
            >
                {alert.alert}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackBar;
