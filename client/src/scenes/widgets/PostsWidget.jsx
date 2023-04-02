import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setPosts } from 'state';
import PostWidget from './PostWidget';
import * as postService from 'services/postService';

const PostsWidget = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const queryString = new URLSearchParams(location.search);
  const [sortedBy, setSortedBy] = useState(queryString.get('sort') || 'recent');

  const sortData = (data) => {
    queryString.set('sort', 'likes');
    navigate({ search: queryString.toString() });
    return data.sort(
      (a, b) => Object.keys(b.likes).length - Object.keys(a.likes).length
    );
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await postService.getAll(params.userId);
        dispatch(
          setPosts({ posts: sortedBy === 'likes' ? sortData(data) : data })
        );
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, [params.userId, sortedBy]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: '0.5rem' }}
      >
        <Divider sx={{ width: '80%' }} />
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            Sort by:
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sortedBy}
            onChange={(e) => setSortedBy(e.target.value)}
          >
            <MenuItem value="recent">Recent</MenuItem>
            <MenuItem value="likes">Likes</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
          occupation,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            occupation={occupation}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
