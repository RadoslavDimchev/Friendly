import { useTheme } from "@emotion/react";
import { KeyboardArrowUp } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const ScrollToTopButton = () => {
  const { palette } = useTheme();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Tooltip title="Scroll to top" placement="top">
      <IconButton
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
          },
        }}
      >
        <KeyboardArrowUp sx={{ fontSize: "2rem" }} />
      </IconButton>
    </Tooltip>
  );
};

export default ScrollToTopButton;
