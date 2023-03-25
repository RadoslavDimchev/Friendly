import { useState } from "react";
import { IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";
import NavSubComponents from "./navSubcomponents";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const onToggleMobileMenu = () => setIsMobileMenuToggled((state) => !state);

  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={alt}
      position="fixed"
      width="100%"
      zIndex="999"
      top={0}
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Friendly
        </Typography>

        {/* SEARCH */}
        {isNonMobileScreens && <SearchBar />}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <NavSubComponents />
        </FlexBetween>
      ) : (
        <IconButton onClick={onToggleMobileMenu}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <MobileNav onToggleMobileMenu={onToggleMobileMenu} />
      )}
    </FlexBetween>
  );
};

export default Navbar;
