import { Navbar, Nav, Button } from 'react-bootstrap';
import Authentication from './Authentication';


function NavBar() {

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.replace('/');
  }

  return (
    <Navbar bg="light" expand="lg" style={{ marginLeft: '20%', marginRight: '20%' }}>
      <Navbar.Brand href="/home">Culinary Creations</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-left">
          <Button href="/createRecipe">Create Recipe</Button>
        </Nav>
        <Nav className="ms-auto">
          <Button variant="outline-primary" onClick={handleLogout}>
            Log Out
          </Button>
        </Nav>
      </Navbar.Collapse>
      <style>
        {`
          .navbar {
            justify-content: space-between;
          }
  
          .navbar-toggler {
            border-color: transparent;
            padding: 0.25rem 0.5rem;
            font-size: 1rem;
          }
  
          .navbar-brand {
            font-weight: bold;
          }
  
          .nav .btn {
            margin-left: 10px;
          }
  
          @media (max-width: 767.98px) {
            .navbar-toggler {
              margin-right: 10px;
            }
  
            .nav .btn {
              margin-left: 0;
              margin-top: 10px;
            }
          }
        `}
      </style>
    </Navbar>
  );

}

export default NavBar;
