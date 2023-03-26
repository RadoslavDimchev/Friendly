import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  getPost,
} from '../controllers/posts.js';

const router = express.Router();

// READ
router.get('/', getFeedPosts);
router.get('/:userId/posts', getUserPosts);
router.get('/:postId', getPost);

// UPDATE
router.patch('/:id/like', verifyToken, likePost);

export default router;