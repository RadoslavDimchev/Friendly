import { useTheme } from "@emotion/react";
import { FormControl, InputBase, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLogout } from "state";
import menuItems from "./menuItems";

const SelectMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const { pathname } = useLocation();

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  const selectMenuValue = isAuth
    ? fullName
    : pathname === "/login"
    ? "Login"
    : "Register";

  return (
    <FormControl variant="standard" value={selectMenuValue}>
      <Select
        value={selectMenuValue}
        sx={{
          backgroundColor: neutralLight,
          width: "150px",
          borderRadius: "0.25rem",
          p: "0.25rem 1rem",
          "& .MuiSvgIcon-root": {
            pr: "0.25rem",
            width: "3rem",
          },
          "& .MuiSelect-select:focus": {
            backgroundColor: neutralLight,
          },
        }}
        input={<InputBase />}
      >
        {menuItems(isAuth, fullName, navigate, () => dispatch(setLogout())).map(
          (item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              onClick={item.onClick}
            >
              {item.label}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default SelectMenu;
