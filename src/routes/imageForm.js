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
        // rejects storing a file
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

router.post("/", upload.single('selectedImage'), (req, res) => {
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
    
    newImage.save()
        .then(result => {
            return res.json({
                success: true,
                document: result
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(400).json({ errors: { global: "The form data couldn't be saved in the database!" } });
        });
});

export default router;