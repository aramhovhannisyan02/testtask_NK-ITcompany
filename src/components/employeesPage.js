import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
function EmployeesPage() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
      axios.get('https://rocky-temple-83495.herokuapp.com/employees')
        .then(response => {
            console.log(response.data);
          setEmployees(response.data);
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
        });
    }, []);
    return  (
        <div>
          <h2>Employee List</h2>
          {employees.map(employee => (
            <div key={employee.id}>
              <span>{employee.id}: </span>
              <span>{employee.name}</span>
            </div>
          ))}
        </div>
      );
    };
 export default EmployeesPage