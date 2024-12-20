import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Header from './components/Header';

function App() {
  const [role, setRole] = useState('dev');
  const [employees, setEmployees] = useState([
    {
      id: uuidv4(),
      name: 'Caleb',
      role: 'Intern',
      img: 'https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: uuidv4(),
      name: 'Carlos',
      role: 'Intern',
      img: 'https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: uuidv4(),
      name: 'Luis',
      role: 'Employee',
      img: 'https://images.pexels.com/photos/29096929/pexels-photo-29096929/free-photo-of-majestic-neptune-statue-at-trevi-fountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
  ]);

  function updateEmployee(id, newName, newRole){
      const updateEmployee = employees.map((employee) => {
          if(id === employee.id){
              return {...employee, name: newName, role: newRole};
          }
          return employee;
      } );
      setEmployees(updateEmployee);
  }

  function newEmployee(name, role, img){
    const newEmployee = {
          id: uuidv4(),
          name: name,
          role: role,
          img: img
      };
      setEmployees([...employees, newEmployee]);
  }

  const showEmployee = true;
  return (
    <div className="App bg-gray-300 min-h-screen">
      <Header />
      {showEmployee ?
        <>          
          <div className='flex flex-wrap justify-center'>
              { employees.map((employee) => {
                 const editEmployee = <EditEmployee 
                                          id={employee.id} 
                                          name={employee.name} 
                                          role={employee.role} 
                                          updateEmployee={updateEmployee} />;
                 return(
                    <Employee                
                      key={employee.id}      
                      id={employee.id}
                      name={employee.name}
                      role={employee.role}
                      img={employee.img}
                      roleToFilter={role}
                      editEmployee={editEmployee}
                    />
                 );
              })}
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
        : <p>You cannot see the employees</p>
      }
    </div>
  );
}

export default App;
