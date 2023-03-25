import { useTheme } from "@emotion/react";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setMode } from "state";

const LightDarkMode = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <IconButton onClick={() => dispatch(setMode())}>
      {theme.palette.mode === "dark" ? (
        <DarkMode sx={{ fontSize: "25px" }} />
      ) : (
        <LightMode
          sx={{ color: theme.palette.neutral.dark, fontSize: "25px" }}
        />
      )}
    </IconButton>
  );
};

export default LightDarkMode;
