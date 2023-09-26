// create mongoose user controller with just login and register

const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check if user exists
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // create token
        const token = jwt.sign({ id: user._id }, "test");
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check if user exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // create new user
        const newUser = new User({
            username,
            password
        });

        // hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // save user
        await newUser.save();

        // create token
        const token = jwt.sign({ id: newUser._id }, "test");
        res.json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}