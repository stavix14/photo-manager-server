import express from 'express';
import ImagePost from "../models/ImagePost";

const router = express.Router();

router.get("/", async (req, res) => {
    const imagePosts = await ImagePost.find();
    if (imagePosts) {
        return res.json({ imagePosts });
    }
    else {
        return res.status(400).json({ errors: { global: "Couldn't retrieve posts! Please try again later!" } })
    }
});

export default router;