const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('./dbConfig');


router.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (error, hash) => {

        if (error) {
            console.error('Error hashing password:', error);
            return res.status(500).json({ message: 'Server error' });
        }

        connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (error, results) => {
            if (error) {
                console.error('Error executing MySQL query:', error);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ message: 'User registered successfully' });
        });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
