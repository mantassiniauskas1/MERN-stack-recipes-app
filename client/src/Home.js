import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Card, Container, Row, Col, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { setAuthToken } from './apiUtils';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {

    const token = localStorage.getItem('token');
    setAuthToken(token);

    axios.get('http://localhost:9000/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.log(error));

  }, []);

  const convertBufferToBase64 = (buffer) => {
    return Buffer.from(buffer).toString('base64');
  };

  const handleDelete = (recipeId) => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    axios.delete(`http://localhost:9000/recipes/${recipeId}`)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
      });
  };

  return (
    <div className="recipe-list-container" style={{ backgroundColor: '#f0f8ff' }}>
      <Container>
        <Row>
          {recipes.map((recipe, index) => (
            <Col key={recipe.id} xs={12} md={6} lg={4}>
              <div className="recipe-card-wrapper">
                <Card className="recipe-card">
                  <Card.Img variant="top" src={`data:image/jpeg;base64,${convertBufferToBase64(recipe.image.data)}`} />
                  <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text>{recipe.content}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <h5>Ingredients:</h5>
                      <ul>
                        {(Array.isArray(recipe.ingredients) ? recipe.ingredients : recipe.ingredients.split(',')).map(ingredient => (
                          <li key={ingredient}>{ingredient.trim()}</li>
                        ))}
                      </ul>
                    </ListGroupItem>
                    <ListGroupItem>
                      <p>Cooking time: {recipe.cooking_time} minutes</p>
                      <p>Serving size: {recipe.serving_size}</p>
                      <p>Difficulty level: {recipe.difficulty_level}</p>
                    </ListGroupItem>
                  </ListGroup>
                  <Card.Footer className="text-center d-flex justify-content-end">
                    <Button variant="danger" onClick={() => handleDelete(recipe.id)}>Delete</Button>
                  </Card.Footer>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <style>
        {`
          .recipe-card-wrapper {
            height: 100%;
            display: flex;
            align-items: stretch;
          }
  
          .recipe-card {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
  
          .recipe-card .card-body {
            flex-grow: 1;
          }
  
          .recipe-card .list-group-item {
            padding-top: 10px;
            padding-bottom: 10px;
          }
  
          .recipe-card .list-group-item:first-child {
            padding-top: 0;
          }
  
          .recipe-card .list-group-item:last-child {
            padding-bottom: 0;
          }
        `}
      </style>
    </div>
  );

}

export default RecipeList;
