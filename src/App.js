import './index.css';
import Employees from './pages/Employees';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customers from './pages/Customers';
import Customer from './components/Customer';
import Login from './pages/Login';

function App() {

  return (

    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/login" element={<Login/>} /> 
          <Route path="/employees" element={<Employees />} />
          <Route path="/dictionary" element={<Dictionary/>} />
          <Route path="/dictionary/:search" element={<Definition/>} />
          <Route path="/customers/" element={<Customers/>} />
          <Route path="/customers/:id" element={<Customer/>} />
          <Route path="/404" element={<NotFound/>} />       
          <Route path="*" element={<NotFound/>} />   
        </Routes>
      </Header>
    </BrowserRouter>
  );

}

export default App;