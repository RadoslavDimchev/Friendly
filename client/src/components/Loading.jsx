const { CircularProgress } = require('@mui/material');
const { Box } = require('@mui/system');

const Loading = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;