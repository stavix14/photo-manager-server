import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    location: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true},
    tags: {type: Array, required: true},
    imageName: {type: String, required: true}
}, { timestamps: true });

export default mongoose.model("ImagePost", schema);