import express from 'express';
import multer from 'multer';
import Image from "../models/Image";

const router = express.Router();

router.get("/", async (req, res) => {
    const images = await Image.find();
    console.log(images);
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/');
    },
    filename: function (req, file, cb) {
        cb(null, "multer-image" + Date.now() + "." + file.originalname.split('.')[1]);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3145728
    },
    fileFilter: fileFilter
});

router.post("/", upload.single('selectedImage'), async (req, res) => {
    const {
        location,
        date,
        description,
        tags,
        username
    } = req.body;
    const {
        filename
    } = req.file;

    const newImage = new Image({
        location,
        date,
        description,
        tags: tags.split(','),
        username,
        imageName: filename,
        comments: [],
        rating: []
    });

    const doc = await newImage.save();

    if (doc) {
        return res.json({
            success: true
        });
    } else {
        return res.status(400).json({
            errors: {
                global: "There was an error when submitting the form. Please try again!"
            }
        });
    }
});

export default router;