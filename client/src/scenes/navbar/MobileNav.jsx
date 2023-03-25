import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import NavSubComponents from "./navSubcomponents";

const MobileNav = ({ onToggleMobileMenu }) => {
  const theme = useTheme();

  return (
    <Box
      position="fixed"
      right="0"
      bottom="0"
      height="100%"
      zIndex="10"
      maxWidth="500px"
      minWidth="300px"
      backgroundColor={theme.palette.background.default}
    >
      <Box display="flex" justifyContent="flex-end" p="1rem">
        <IconButton onClick={onToggleMobileMenu}>
          <Close />
        </IconButton>
      </Box>

      <FlexBetween
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="3rem"
      >
        <NavSubComponents />
      </FlexBetween>
    </Box>
  );
};

export default MobileNav;
