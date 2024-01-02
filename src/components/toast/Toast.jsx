import { Alert, Snackbar } from "@mui/material";

const Toast = ({ open, message, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default Toast;
