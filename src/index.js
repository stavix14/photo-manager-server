import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from "./routes/user";

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/api/user', user);
app.listen(8080, () => console.log("Running on localhost:8080"));