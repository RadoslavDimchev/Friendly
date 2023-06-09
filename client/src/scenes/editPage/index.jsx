import { useTheme } from '@emotion/react';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';
import {
  Typography,
  IconButton,
  Box,
  Divider,
  Button,
  useMediaQuery,
  InputBase,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserImage from 'components/UserImage';
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import * as postService from 'services/postService';
import Loading from 'components/Loading';

const EditPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { picturePath } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const post = await postService.getById(postId);
        setPost(post);
        setIsImage(!!post.picturePath);
        setImage({ name: post.picturePath || '' });
      } catch (error) {
        console.error(error);
        navigate(`/posts/${postId}`);
      } finally {
        setIsLoading(false);
      }
    };

    getPost();
  }, [postId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('description', post.description);
    formData.append('picture', image);
    formData.append('picturePath', image?.name || '');

    try {
      await postService.edit(postId, formData);
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WidgetWrapper maxWidth="500px" margin="2rem auto">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {' '}
          <FlexBetween gap="1.5rem">
            <UserImage image={picturePath} />
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) =>
                setPost((state) => ({ ...state, description: e.target.value }))
              }
              value={post.description}
              sx={{
                width: '100%',
                backgroundColor: palette.neutral.light,
                borderRadius: '2rem',
                padding: '1rem 2rem',
                fontSize: '18px',
              }}
              multiline
            />
          </FlexBetween>
          {isImage && (
            <Box
              border={`1px solid ${medium}`}
              borderRadius="5px"
              mt="1rem"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                      width="100%"
                    >
                      <input {...getInputProps()} />
                      {!image.name ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {image.name && (
                      <IconButton
                        onClick={() => setImage({})}
                        sx={{ width: '15%' }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          )}
          <Divider sx={{ margin: '1.25rem 0' }} />
          <FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
              >
                Image
              </Typography>
            </FlexBetween>

            {isNonMobileScreens ? (
              <>
                <FlexBetween gap="0.25rem">
                  <GifBoxOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Clip</Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                  <AttachFileOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Attachment</Typography>
                </FlexBetween>

                <FlexBetween gap="0.25rem">
                  <MicOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Audio</Typography>
                </FlexBetween>
              </>
            ) : (
              <FlexBetween gap="0.25rem">
                <MoreHorizOutlined sx={{ color: mediumMain }} />
              </FlexBetween>
            )}

            <Button
              disabled={!post}
              onClick={handleEdit}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: '3rem',
              }}
            >
              EDIT
            </Button>
          </FlexBetween>
        </>
      )}
    </WidgetWrapper>
  );
};

export default EditPage;
