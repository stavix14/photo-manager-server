import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from "./routes/user";
import imageForm from "./routes/imageForm";
import getImages from "./routes/getImages";
import postComment from "./routes/postComment";

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/uploads', express.static('public'));
app.use('/api/user', user);
app.use('/api/imageForm', imageForm);
app.use('/api/images', getImages);
app.use('/api/images/comment', postComment);

app.listen(8080, () => console.log("Running on localhost:8080"));