import { useTheme } from '@emotion/react';
import { Search } from '@mui/icons-material';
import { IconButton, InputBase } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const changeHanlder = (e) => {
    const value = e.target.value;
    if (!value.trim()) {
      queryString.delete('search');
    } else {
      queryString.set('search', value);
    }
    navigate({ search: queryString.toString() });
    setSearch(value);
  };

  return (
    <FlexBetween
      backgroundColor={theme.palette.neutral.light}
      borderRadius="9px"
      gap="3rem"
      padding="0.1rem 1.5rem"
    >
      <InputBase
        value={search}
        onChange={changeHanlder}
        placeholder="Search post..."
      />
      <IconButton>
        <Search />
      </IconButton>
    </FlexBetween>
  );
};

export default SearchBar;
