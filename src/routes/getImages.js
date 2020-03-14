import express from 'express';
import Image from "../models/Image";

const router = express.Router();

router.get("/", async (req, res) => {
    const images = await Image.find();
    console.log(images);
    // put the negative outcome (no images in db) in first if so you can remove the else
    if (images) {
        return res.json({
            images
        });
    } else {
        return res.status(400).json({
            errors: {
                global: "Couldn't retrieve posts! Please try again later!"
            }
        })
    }
});

export default router;