import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const AuthPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      width={isNonMobileScreens ? "50%" : "93%"}
      p="2rem"
      m="7rem auto"
      borderRadius="1.5rem"
      backgroundColor={theme.palette.background.alt}
    >
      <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
        Welcome to Friendly!
      </Typography>
      <Form />
    </Box>
  );
};

export default AuthPage;
