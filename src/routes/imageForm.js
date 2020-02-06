import express from 'express';
import multer from 'multer';
import ImagePost from "../models/ImagePost";

const router = express.Router();

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
    const { location, date, description, tags, username } = req.body;
    const { filename } = req.file;
    
    const newImage = new ImagePost({
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
        return res.json({ success: true });
    }
    else {
        return res.status(400).json({ errors: { global: "Registration has failed! Please try again later!" }})
    }
});

export default router;