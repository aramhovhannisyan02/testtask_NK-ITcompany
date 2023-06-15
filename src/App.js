import { Route, Routes } from 'react-router-dom';
import TasksPage from './components/tasksPage';
import EmployeesPage from './components/employeesPage';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './components/nav';

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/employees" Component={EmployeesPage} />
          <Route path="/tasks" Component={TasksPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
