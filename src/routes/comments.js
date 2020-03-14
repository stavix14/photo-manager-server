import express from 'express';
import Image from "../models/Image";

const router = express.Router();

router.put('/', async (req, res) => {
    const {
        id,
        username,
        comment,
        rating
    } = req.body.postComment;

    const image = await Image.findById(id);

    if (!image) {
        return res.status(400).json({
            errors: {
                global: "This post may no longer be available. Please refresh the page!"
            }
        });
    }

    image.comments = [...image.comments, [username, comment]];
    image.rating = [...image.rating, rating];

    const doc = await image.save();

    if (doc) {
        return res.json({
            id: doc._id,
            newComment: doc.comments.slice(-1)[0],
            newRating: doc.rating.slice(-1)[0],
            success: true
        });
    } else {
        return res.status(503).json({
            errors: {
                global: "The comment couldn't be posted. Please try again later!"
            }
        });
    }
});

export default router;