import express from 'express';
import ImagePost from "../models/ImagePost";

const router = express.Router();

router.post('/', async (req, res) => {
    const { id, username, comment, rating } = req.body.postComment;

    const doc = await ImagePost.findById(id);

    doc.comments = nonMutatingPush(doc.comments, [[username, comment]]);
    doc.rating = nonMutatingPush(doc.rating, [rating]);

    doc.save()
        .then(() => {
            return res.json({ success: true });
        })
        .catch(err => {
            console.error(err);
            return res.status(400).json({ errors: { global: "The comment couldn't be saved in the database!" } });
        });
});

export default router;

const nonMutatingPush = (first, second) => first.concat(second);