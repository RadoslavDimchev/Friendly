import { Box, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PostComments = ({ comments, postId, main }) => {
  return (
    <>
      {comments.length === 0 && (
        <Typography sx={{ color: main, m: '0.5rem 0'}}>
          No comments
          <Link to={`/posts/${postId}`} style={{ color: main}}>
            , be the first one
          </Link>
        </Typography>
      )}
      {comments.slice(0, 3).map((comment, i) => (
        <Box key={i}>
          {i > 0 ? <Divider /> : null}
          <Typography sx={{ color: main, m: '0.5rem 0' }}>
            {comment.fullName}: {comment.comment}
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default PostComments;
