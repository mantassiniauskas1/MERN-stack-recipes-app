import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Authentication from './Authentication';
import NavBar from "./NavBar";
import Home from "./Home";
import CreateRecipe from "./CreateRecipe";

function App() {

  const NavBarWrapper = () => {
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Authentication />} />
        <Route path='/' element={<NavBarWrapper />}>
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/createRecipe' element={<CreateRecipe />} />
        </Route>
      </Routes>
    </Router>
  );

}

export default App;
