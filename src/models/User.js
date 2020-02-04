import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true }
}, { timestamps: true });

//using es5 functions because arrow function's "this" binding will return undefined in this particular case??
schema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash);
};
  
schema.methods.setPassword = function (password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.generateJWT = function () {
    return jwt.sign(
        {
        email: this.email
        }, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function () {
    return {
        email: this.email,
        token: this.generateJWT()
    };
};

export default mongoose.model("User", schema);