import './App.css';
import Employee from './components/Employee';

function App() {
  console.log('this is a log');
  const showEmployee = false;
  return (
    <div className="App">
      { showEmployee ?
        <>
        <Employee />
        <Employee />
        <Employee />
        <Employee />
        <Employee />
        </>
        : <p>You cannot see the employees</p>    
      } 
    </div>
  );
}

export default App;
