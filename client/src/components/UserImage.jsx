import { Box } from '@mui/material';

const UserImage = ({ image, size = '60px' }) => {
  return (
    <Box>
      {image && (
        <img
          style={{ objectFit: 'cover', borderRadius: '50%' }}
          width={size}
          height={size}
          src={`${process.env.REACT_APP_ASSETS_ADDRESS}${image}`}
          alt="user"
        />
      )}
    </Box>
  );
};

export default UserImage;
