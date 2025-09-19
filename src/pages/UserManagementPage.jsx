import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagementPage.css'; // Importing CSS for styling

function UserManagementPage() {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '', email: '', password: '' });
  const [loginUser, setLoginUser] = useState({ email: '', password: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role || !newUser.email || !newUser.password) {
      alert('All fields are required to register a user.');
      return;
    }

    axios.post('http://localhost:3000/users', newUser)
      .then(response => {
        setData([...data, response.data]);
        alert('User registered successfully!');
        setNewUser({ name: '', role: '', email: '', password: '' });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleLogin = () => {
    if (!loginUser.email || !loginUser.password) {
      alert('Please enter both email and password to login.');
      return;
    }

    const user = data.find(
      user => user.email === loginUser.email && user.password === loginUser.password
    );
    if (user) {
      alert(`Welcome, ${user.name}!`);
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      <div className="rectangle-container">
        <div className="rectangle">
          <h3>Register</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Role (Student/Instructor)"
            value={newUser.role}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <button onClick={handleAddUser}>Register</button>
        </div>
        <div className="rectangle">
          <h3>Login</h3>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginUser.email}
            onChange={handleLoginInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginUser.password}
            onChange={handleLoginInputChange}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name} ({user.role})</li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagementPage;
