import './index.css';
import { createContext, useState, useEffect } from 'react';
import Employees from './pages/Employees';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';
import Customers from './pages/Customers';
import Customer from './components/Customer';
import Login from './pages/Login';
import { baseUrl } from './shared';
import Register from './pages/Register';

export const LoginContext = createContext();  

function App() {
  useEffect(() => {
      function refreshTokens(){
        if(localStorage.refresh){
          const url = baseUrl + 'api/token/refresh/';       
          fetch(url, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ 
                refresh: localStorage.refresh
              }),
          })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
              localStorage.access = data.access;
              localStorage.refresh = data.refresh;
              setLoggedIn(true);
          });
        }
      }

      const minute = 1000 * 60; // 1 minute in milliseconds
      setInterval(refreshTokens,minute);
    },[]);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.access ? true : false
  );

  function changeLoggedIn(value) {
      setLoggedIn(value);
      if (!value) {
          localStorage.clear();
      }
  }

  return (    
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/login" element={<Login/>} /> 
            <Route path="/employees" element={<Employees />} />
            <Route path="/dictionary" element={<Dictionary/>} />
            <Route path="/dictionary/:search" element={<Definition/>} />
            <Route path="/customers/" element={<Customers/>} />
            <Route path="/customers/:id" element={<Customer/>} />
            <Route path="/register" element={<Register/>} />       
            <Route path="/404" element={<NotFound/>} />       
            <Route path="*" element={<NotFound/>} />   
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );

}

export default App;