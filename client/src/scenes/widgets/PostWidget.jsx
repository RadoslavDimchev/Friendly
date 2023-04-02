import { useTheme } from '@emotion/react';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';
import { Typography, IconButton, Box, Divider } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import { Link, useNavigate } from 'react-router-dom';
import * as postService from 'services/postService';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
  occupation,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);
  const user = useSelector((state) => state.user);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    if (!isAuth) {
      return navigate('/login');
    }

    try {
      const updatedPost = await postService.like(postId, { userId: user._id });
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WidgetWrapper mb="2rem">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={occupation}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description.split(' ').slice(0, 10).join(' ')}
        <Link
          to={`/posts/${postId}`}
          style={{ color: main, marginLeft: '0.3rem' }}
        >
          view details...
        </Link>
      </Typography>
      {picturePath && (
        <img
          src={`${process.env.REACT_APP_ASSETS_ADDRESS}${picturePath}`}
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
              {isAuth && Boolean(likes[user._id]) ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.length === 0 && (
            <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
              No comments,{' '}
              <Link to={`/posts/${postId}`} style={{ color: main, ml: '1rem' }}>
                be the first one{' '}
              </Link>
            </Typography>
          )}
          {comments.slice(0, 3).map((comment, i) => (
            <Box key={i}>
              {i > 0 ? <Divider /> : null}
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment.fullName}: {comment.comment}
              </Typography>
            </Box>
          ))}
          {comments.length > 3 && (
            <Typography sx={{ m: '0.5rem 0', pl: '1rem' }}>
              <Link to={`/posts/${postId}`} style={{ color: main }}>
                view all comments...
              </Link>
            </Typography>
          )}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
