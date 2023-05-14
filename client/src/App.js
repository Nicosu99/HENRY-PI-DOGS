import './App.css';
import {Route, Routes} from 'react-router-dom'

//Import de componentes de vista

function App() {
  return (

    <Routes>
      <Route path="/" element={<Welcome/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/home/:id" element={<Detail/>} />
      <Route path="/create" element={<Form/>} />
    </Routes>

  );
}

export default App;
