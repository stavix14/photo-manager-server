import express from 'express';
import ImagePost from "../models/ImagePost";

const router = express.Router();

router.post('/', async (req, res) => {
    const { id, username, comment, rating } = req.body.postComment;

    const post = await ImagePost.findById(id);

    post.comments = nonMutatingPush(post.comments, [[username, comment]]);
    post.rating = nonMutatingPush(post.rating, [rating]);

    const doc = await post.save();
    if (doc) {
        return res.json({ success: true });
    }
    else {
        return res.status(400).json({ errors: { global: "The comment couldn't be saved in the database!" } });
    }
});

export default router;

const nonMutatingPush = (first, second) => first.concat(second);