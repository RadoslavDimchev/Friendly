import { useTheme } from "@emotion/react";
import { Search } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const SearchBar = () => {
  const theme = useTheme();

  return (
    <FlexBetween
      backgroundColor={theme.palette.neutral.light}
      borderRadius="9px"
      gap="3rem"
      padding="0.1rem 1.5rem"
    >
      <InputBase placeholder="Search..." />
      <IconButton>
        <Search />
      </IconButton>
    </FlexBetween>
  );
};

export default SearchBar;
