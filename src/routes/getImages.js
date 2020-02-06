import express from 'express';
import ImagePost from "../models/ImagePost";

const router = express.Router();

router.get("/", (req, res) => {
    ImagePost.find()
    .then(imagePosts => {
        return res.json({ imagePosts });
    });
});

export default router;