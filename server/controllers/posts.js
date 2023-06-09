import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      occupation: user.occupation,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getPostsSortedByLikes = async (userId) =>
  Post.aggregate([
    { $match: userId ? { userId } : {} },
    {
      $addFields: {
        likeCount: { $size: { $objectToArray: "$likes" } },
      },
    },
    {
      $sort: { likeCount: -1 },
    },
  ]);

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('asjlkddsa;dlfjas');
    const { sort, search } = req.query;

    const props = {};
    if (userId) {
      props.userId = userId;
    }

    let posts;
    if (sort) {
      posts = await getPostsSortedByLikes(userId);
    } else {
      posts = await Post.find(props).sort({ createdAt: -1 });
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      posts = posts.filter(
        (post) => post.description && post.description.match(searchRegex)
      );
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { description, picturePath } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      description,
      picturePath,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCommentonPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { fullName, comment } = req.body;
    const post = await Post.findById(postId);

    post.comments.unshift({ fullName, comment });
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// DELETE
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
