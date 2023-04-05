import { useTheme } from '@emotion/react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const {palette} = useTheme();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
      }}
    >
      <Typography sx={{fontSize: '5rem', color: palette.primary.main, fontWeight: 'bold'}} variant="h1">Oops!</Typography>
      <Typography sx={{ fontWeight: 'bold'}} variant="h3">404 - Page Not Found</Typography>
      <Typography variant="body1" component="p" maxWidth="300px" >
        Sorry, we couldn't find the page you were looking for. It may have been
        removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
