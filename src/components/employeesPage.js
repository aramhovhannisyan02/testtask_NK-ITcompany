import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    surname: '',
    email: '',
    position: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rocky-temple-83495.herokuapp.com/employees`, {
          params: {
            _page: currentPage,
            _limit: 10
          }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setNewEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://rocky-temple-83495.herokuapp.com/employees`, newEmployee);
      setEmployees(prevEmployees => [...prevEmployees, response.data]);
      setNewEmployee({
        name: '',
        surname: '',
        email: '',
        position: ''
      });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={newEmployee.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Surname:
          <input type="text" name="surname" value={newEmployee.surname} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={newEmployee.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Position:
          <input type="text" name="position" value={newEmployee.position} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Create Employee</button>
      </form>

      {employees.map(employee => (
        <div key={employee.id}>
          <div>{employee.name}: </div>
          <div>{employee.email}: </div>
          <div>{employee.position}: </div>
          <div>{employee.surname}: </div>
          <hr />
        </div>
      ))}

      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default EmployeesPage;
