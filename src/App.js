import './App.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {  
  const [role, setRole] = useState('dev');
  const showEmployee = true;
  return (
    <div className="App">
      { showEmployee ?
        <>
        <input 
          type="text" 
          onChange={(e) => {
            console.log(e.target.value)
            setRole(e.target.value);
          }}        
        />
        <Employee name="Caleb" role="Intern"/>
        <Employee name="Carlos" role="Intern" />
        <Employee name="Luis" role="Employee" />
        <Employee name="Nestor" role={role} />
        <Employee />
        </>
        : <p>You cannot see the employees</p>    
      } 
    </div>
  );
}

export default App;
