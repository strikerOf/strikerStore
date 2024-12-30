import './App.css';
import Home from './Views/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InfoArticle from './Views/InfoArticleComponent';
import Car from './Views/Car';
import Bar from './Components/BarComponent';

function App() {


  return (
    
    <Router>
      <Bar></Bar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail-article/:id" element={<InfoArticle />}></Route>
        <Route path="/yourCar" element={<Car/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
