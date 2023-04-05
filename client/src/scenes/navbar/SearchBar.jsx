import { useTheme } from '@emotion/react';
import { Search } from '@mui/icons-material';
import { IconButton, InputBase } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const theme = useTheme();
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [search, setSearch] = useState(queryString.get('search') || '');

  const changeHanlder = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    if (!search.trim()) {
      queryString.delete('search');
    } else {
      queryString.set('search', search);
    }
    navigate({ search: queryString.toString() });
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
      <IconButton onClick={onSearch}>
        <Search />
      </IconButton>
    </FlexBetween>
  );
};

export default SearchBar;
