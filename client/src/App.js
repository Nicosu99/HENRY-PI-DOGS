import {Route, Routes} from 'react-router-dom'
import Welcome from './views/welcome';
import Home from './views/home';
import Detail from './views/detail';
import Form from './views/form';

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
