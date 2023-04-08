import { useTheme } from '@emotion/react';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Edit,
  Delete,
  AddComment,
} from '@mui/icons-material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useSelector } from 'react-redux';
import {
  Typography,
  IconButton,
  Box,
  Grid,
  Tooltip,
  InputBase,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as postService from 'services/postService';
import PostComments from 'components/PostComments';
import DeletePostDialog from './DeletePostDialog';
import { useNotificationContext } from 'contexts/NotificationContext';
import { useIsAuth } from 'hooks/useIsAuth';
import Loading from 'components/Loading';

const DetailsPage = () => {
  const navigate = useNavigate();
  const isAuth = useIsAuth();
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState({});
  const likeCount = Object.keys(post.likes || {}).length;
  const { postId } = useParams();
  const isOwner = isAuth && user._id === post.userId;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const { notificationHandler } = useNotificationContext();
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const main = theme.palette.neutral.main;
  const primary = theme.palette.primary.main;

  useEffect(() => {
    setIsLoading(true);

    postService
      .getById(postId)
      .then((post) => setPost(post))
      .catch((error) => {
        console.error(error);
        notificationHandler({
          open: true,
          message: 'This post does not exist',
          severity: 'error',
          vertical: 'bottom',
          horizontal: 'center',
        });
        navigate('/');
      });

    setIsLoading(false);
  }, [postId]); // eslint-disable-line react-hooks/exhaustive-deps

  const patchLike = async () => {
    if (!isAuth) {
      return navigate('/login');
    }

    try {
      const updatedPost = await postService.like(postId, { userId: user._id });
      setPost(updatedPost);
    } catch (error) {
      console.error(error);
    }
  };

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const deletePostHandler = async () => {
    try {
      await postService.deleteById(postId);
    } catch (error) {
      console.error(error);
    }

    closeDeleteDialog();
    navigate('/');
  };

  const addCommentHandler = async () => {
    if (!isAuth) {
      return navigate('/login');
    }

    try {
      const updatedPost = await postService.addComment(postId, {
        fullName: `${user.firstName} ${user.lastName}`,
        comment,
      });
      setPost(updatedPost);
    } catch (error) {
      console.error(error);
    }

    setComment('');
  };

  const shareHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    notificationHandler({
      open: true,
      message: 'Copied',
      severity: 'success',
      vertical: 'bottom',
      horizontal: 'center',
    });
  };

  if (!post._id) {
    return null;
  }

  return (
    <WidgetWrapper maxWidth="500px" margin="2rem auto">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <DeletePostDialog
            isDeleteDialogOpen={isDeleteDialogOpen}
            closeDeleteDialog={closeDeleteDialog}
            deletePostHandler={deletePostHandler}
          />
          {isOwner && (
            <Grid
              container
              sx={{
                border: `2px dashed ${main}`,
                borderRadius: '5px',
                padding: '4px 8px',
                marginBottom: '1rem',
              }}
            >
              <Grid item xs={10}>
                <Typography mt="0.5rem">Author menu</Typography>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Edit">
                  <IconButton onClick={() => navigate(`/posts/${postId}/edit`)}>
                    <Edit sx={{ color: primary }} />
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item xs={1}>
                <Tooltip title="Delete">
                  <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
                    <Delete color="error" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}
          <Friend
            friendId={post.userId}
            name={`${post.firstName} ${post.lastName}`}
            subtitle={post.occupation}
            userPicturePath={post.userPicturePath}
          />
          <Typography color={main} sx={{ mt: '1rem' }}>
            {post.description}
          </Typography>
          {post.picturePath && (
            <img
              src={`${process.env.REACT_APP_ASSETS_ADDRESS}${post.picturePath}`}
              alt="post"
              width="100%"
              height="auto"
              style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
            />
          )}
          <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
              <FlexBetween gap="0.3rem">
                <IconButton onClick={patchLike}>
                  {isAuth && Boolean(post.likes[user._id]) ? (
                    <FavoriteOutlined sx={{ color: primary }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
                <Typography>{likeCount}</Typography>
              </FlexBetween>

              <FlexBetween gap="0.3rem">
                <IconButton>
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{post.comments?.length}</Typography>
              </FlexBetween>
            </FlexBetween>

            <IconButton onClick={shareHandler}>
              <ShareOutlined />
            </IconButton>
          </FlexBetween>
          <Box mt="0.5rem">
            <FlexBetween
              backgroundColor={theme.palette.neutral.light}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase
                placeholder="Add comment..."
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ width: '100%' }}
              />
              <IconButton onClick={addCommentHandler} disabled={!comment}>
                <AddComment />
              </IconButton>
            </FlexBetween>

            <PostComments
              comments={post.comments}
              postId={postId}
              main={main}
              isFromDetails
            />
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default DetailsPage;
