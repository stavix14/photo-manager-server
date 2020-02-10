import express from 'express';
import ImagePost from "../models/ImagePost";

const router = express.Router();

router.put('/', async (req, res) => {
    const { id, username, comment, rating } = req.body.postComment;

    const post = await ImagePost.findById(id);

    post.comments = [...post.comments, [username, comment]];
    post.rating = [...post.rating, rating];

    const doc = await post.save();

    if (doc) {
        return res.json({ id: doc._id, newComment: doc.comments.slice(-1)[0], newRating: doc.rating.slice(-1)[0] ,success: true });
    }
    else {
        return res.status(400).json({ errors: { global: "The comment couldn't be saved in the database!" } });
    }
});

export default router;