import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { setAuthToken } from './apiUtils';

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('author', author);
      formData.append('content', content);
      formData.append('image', imageFile);
      formData.append('ingredients', ingredients);
      formData.append('cooking_time', cookingTime);
      formData.append('serving_size', servingSize);
      formData.append('difficulty_level', difficultyLevel);

      const token = localStorage.getItem('token');
      setAuthToken(token);

      await axios.post('http://localhost:9000/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.replace('/home');
    } catch (error) {
      console.error(error);
      localStorage.clear('token');
      window.location.reload();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div style={{ marginLeft: '20%', marginRight: '20%' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author:</Form.Label>
          <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content:</Form.Label>
          <Form.Control as="textarea" value={content} onChange={(e) => setContent(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} required />
        </Form.Group>

        <Form.Group controlId="ingredients">
          <Form.Label>Ingredients:</Form.Label>
          <Form.Control as="textarea" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="cookingTime">
          <Form.Label>Cooking Time:</Form.Label>
          <Form.Control type="text" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="servingSize">
          <Form.Label>Serving Size:</Form.Label>
          <Form.Control type="text" value={servingSize} onChange={(e) => setServingSize(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="difficultyLevel">
          <Form.Label>Difficulty Level:</Form.Label>
          <Form.Control type="text" value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit">Create Recipe</Button>
      </Form>
    </div>
  );

};

export default CreateRecipe;
