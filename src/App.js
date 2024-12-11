import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('dev');
  const showEmployee = true;
  return (
    <div className="App">
      {showEmployee ?
        <>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value)
              setRole(e.target.value);
            }}
          />
          <div className='flex flex-wrap justify-center'>
            <Employee name="Caleb" role="Intern"  img="https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <Employee name="Carlos" role="Intern" img="https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"   />
            <Employee name="Luis" role="Employee" img="https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <Employee name="Caleb" role="Intern"  img="https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <Employee name="Carlos" role="Intern" img="https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <Employee name="Luis" role="Employee" img="https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <Employee name="Caleb" role="Intern"  img="https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <Employee name="Carlos" role="Intern" img="https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <Employee name="Luis" role="Employee" img="https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </div>
        </>
        : <p>You cannot see the employees</p>
      }
    </div>
  );
}

export default App;
