import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box sx={{ display: 'flex', m: '1rem 0' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
