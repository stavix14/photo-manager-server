import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    location: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true},
    tags: {type: Array, required: true},
    username: {type: String, required: true},
    imageName: {type: String, required: true},
    comments: {type: Array},
    rating: {type: Array}
}, { timestamps: true });

export default mongoose.model("ImagePost", schema);