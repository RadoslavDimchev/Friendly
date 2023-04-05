import { AccountCircleOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useIsAuth } from "hooks/useIsAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavIconsLinks = () => {
  const isAuth = useIsAuth();
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;

  if (!isAuth) {
    return null;
  }

  return (
    <Link to={`/profile/${user._id}`}>
      <IconButton>
        <AccountCircleOutlined sx={{ color: dark, fontSize: "25px" }} />
      </IconButton>
    </Link>
  );
};

export default NavIconsLinks;
