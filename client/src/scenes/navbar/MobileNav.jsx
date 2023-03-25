import { useTheme } from "@emotion/react";
import { Close, Help, Message, Notifications } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import LightDarkMode from "./LightDarkMode";
import SelectMenu from "./SelectMenu";

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
      {/* CLOSE ICON */}
      <Box display="flex" justifyContent="flex-end" p="1rem">
        <IconButton onClick={onToggleMobileMenu}>
          <Close />
        </IconButton>
      </Box>

      {/* MENU ITEMS */}
      <FlexBetween
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="3rem"
      >
        <LightDarkMode />
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <SelectMenu />
      </FlexBetween>
    </Box>
  );
};

export default MobileNav;
