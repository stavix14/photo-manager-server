import express from 'express';
import User from "../models/User";
import { isValidEmail } from "../utils";

const router = express.Router();

router.post("/auth", (req, res) => {
    const { credentials } = req.body;

    if (!isValidEmail(credentials.email) || !credentials.password) {
        return res.status(400).json({ errors: { global: "Email or password are invalid!" } });
    }

    User.findOne({ email: credentials.email })
        .then(user => {
            if (user && user.isValidPassword(credentials.password)) {
                return res.json({ user: user.toAuthJSON() });
            }
            else {
                return res.status(400).json({ errors: { global: "Invalid credentials" } });
            }
        });
});

router.post("/register", (req, res) => {
    const { credentials } = req.body;

    if (!isValidEmail(credentials.email) || !credentials.password) {
        return res.status(400).json({ errors: { global: "Email or password are invalid!" } });
    }
    const user = new User({ email: credentials.email });

    user.setPassword(credentials.password);
    user.save()
        .then(userRecord => {
            res.json({ user: userRecord.toAuthJSON() });
        })
        .catch(() => res.status(400).json({ errors: "Registration has failed! "}));
});

export default router;