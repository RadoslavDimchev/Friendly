import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Box,
  useMediaQuery,
  useTheme,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { Formik } from 'formik';
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLogin } from 'state';
import { registerSchema, loginSchema } from './validationSchemas';
import { initialValuesRegister, initialValuesLogin } from './formValues';
import PlacesAutocomplete from './PlacesAutocomplete';
import { useJsApiLoader } from '@react-google-maps/api';
import * as authService from 'services/authService';
import { useNotificationContext } from 'contexts/NotificationContext';

const Form = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';
  const { notificationHandler } = useNotificationContext();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  if (loadError) {
    return <Box>Map cannot be loaded right now, sorry.</Box>;
  }

  const register = async (values, onSubmitProps) => {
    if (!values.picture) {
      return notificationHandler({
        open: true,
        message: 'Picture is required',
        severity: 'error',
        vertical: 'top',
        horizontal: 'center',
      });
    }

    // this allows to send form info with image
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }
    formData.append('picturePath', values.picture.name);

    try {
      const authData = await authService.register(formData);
      if (authData) {
        dispatch(
          setLogin({
            user: authData.user,
            token: authData.token,
          })
        );
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      notificationHandler({
        open: true,
        message: error.message,
        severity: 'error',
        vertical: 'top',
        horizontal: 'center',
      });
    } finally {
      onSubmitProps.resetForm();
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const authData = await authService.login({
        email: values.email,
        password: values.password,
      });

      if (authData) {
        dispatch(
          setLogin({
            user: authData.user,
            token: authData.token,
          })
        );
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      notificationHandler({
        open: true,
        message: error.message,
        severity: 'error',
        vertical: 'top',
        horizontal: 'center',
      });
    } finally {
      onSubmitProps.resetForm();
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      if (isLogin) {
        await login(values, onSubmitProps);
      } else if (isRegister) {
        await register(values, onSubmitProps);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                {isLoaded && (
                  <PlacesAutocomplete
                    handlePlaceSelect={(lat, lng) => {
                      setFieldValue(
                        'coordinates',
                        JSON.stringify({ lat, lng })
                      );
                    }}
                  />
                )}
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="LinkedIn (not required)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.linkedin}
                  name="linkedin"
                  sx={{ gridColumn: 'span 4' }}
                  error={Boolean(touched.linkedin) && Boolean(errors.linkedin)}
                  helperText={touched.linkedin && errors.linkedin}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    accept={{ 'image/*': ['.jpeg', '.jpg', '.png'] }}
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue('picture', acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
              onClick={() => {
                navigate(isLogin ? '/register' : '/login');
                resetForm();
              }}
              sx={{
                textDecoration: 'underlined',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : 'Already have an account? Login here.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
