import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from "./routes/users";
import images from "./routes/images";
import comments from "./routes/comments";

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/uploads', express.static('public'));

app.use('/api/users', users);
app.use('/api/images', images);
app.use('/api/images/comments', comments); // transform this endpoint to /api/images/:imageId/comments and get the id from the url params not from the req body

app.listen(8080, () => console.log("Running on localhost:8080"));