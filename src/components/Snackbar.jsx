import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { useEffect } from "react";

export default function PositionedSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    setState({ ...state, open: true });
    setTimeout(() => {
      setState({ ...state, open: false });
    }, 3000);
  }, []);

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        ContentProps={{
          sx: {
            background: "#2979ff",
          },
        }}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Press esc to exit Fullscreen mode"
        key={vertical + horizontal}
      />
    </Box>
  );
}
