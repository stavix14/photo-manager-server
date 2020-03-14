import express from 'express';
import User from "../models/User";
import {
    isValidEmail
} from "../utils";

const router = express.Router();

router.post("/auth", async (req, res) => {
    const {
        credentials
    } = req.body;
    console.log("Validare");
    if (!isValidEmail(credentials.email) || !credentials.password) {
        return res.status(400).json({
            errors: {
                global: "Email or password are invalid!"
            }
        });
    }

    const user = await User.findOne({
        email: credentials.email
    });

    if (user && user.isValidPassword(credentials.password)) {
        return res.json({
            user: user.toAuthJSON(),
            success: true
        });
    } else {
        return res.status(404).json({
            errors: {
                global: "There is no account linked to this email address or the password is wrong!"
            }
        });
    }
});

router.post("/register", async (req, res) => {
    const {
        credentials
    } = req.body;

    if (!isValidEmail(credentials.email) || !credentials.password) {
        return res.status(400).json({
            errors: {
                global: "Email or password are invalid!"
            }
        });
    }

    const user = new User({
        email: credentials.email
    });
    user.setPassword(credentials.password);

    const doc = await user.save();

    if (doc) {
        return res.json({
            registrationSucceded: true
        });
    } else {
        return res.status(400).json({
            errors: "Registration has failed! Please try again later"
        })
    }
});

export default router;