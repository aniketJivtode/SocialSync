import Post from '../models/Post.js'
import User from '../models/User.js';

export const createPost  = async (req,res) => {
    try {

        const {  userId, description, picturePath  } = req.body;

        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath:  user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(201).json(posts);
        
    } catch (error) {
        res.status(409).json({msg: error.message})
    }
}

export const getFeedPosts  = async (req,res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        console.log(posts)
        res.status(200).json(posts);
    } catch (error) {
        res.status(409).json({msg: error.message})
    }
}

export const getUserPosts  = async (req,res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).sort({ createdAt: -1 });;
        res.status(200).json(posts);
    } catch (error) {
        res.status(409).json({msg: error.message})
    }
}

export const likePost  = async (req,res) => {
    
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = await post.likes.get(userId);
        console.log(userId);
        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}