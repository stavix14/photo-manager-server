import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import auth from "./routes/auth";

dotenv.config();

const app = express();
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

// app.use('/api/auth', auth);

app.listen(8080, () => console.log("Running on localhost:8080"));