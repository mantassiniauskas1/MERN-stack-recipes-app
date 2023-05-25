const express = require('express');
const router = express.Router();
const connection = require('./dbConfig');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

const authenticateToken = (req, res, next) => {
  const token = (req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

router.get('/recipes', authenticateToken, function (req, res) {
  connection.query('SELECT * FROM recipes', function (error, results, fields) {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    res.send(results);
  });
});

router.post('/recipes', authenticateToken, (req, res) => {

  const { name, author, content, ingredients, cooking_time, serving_size, difficulty_level } = req.body;

  if (!req.files || !req.files.image) {
    return res.status(400).send('No image file uploaded');
  }

  const image = req.files.image;
  const imageData = image.data;

  const query = `INSERT INTO recipes (name, author, content, image, ingredients, cooking_time, serving_size, difficulty_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, [name, author, content, imageData, ingredients, cooking_time, serving_size, difficulty_level], function (error, results, fields) {
    if (error) throw error;
    res.send({ message: 'Recipe created successfully' });
  });
});

router.delete('/recipes/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM recipes WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe' });
    } else {
      res.json({ message: 'Recipe deleted successfully' });
    }
  });
});

module.exports = router;