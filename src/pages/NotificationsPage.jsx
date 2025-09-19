import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NotificationsPage() {
  const [data, setData] = useState([]);
  const [newNotification, setNewNotification] = useState({ message: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/notifications')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewNotification({ message: value });
  };

  const handleAddNotification = () => {
    axios.post('http://localhost:3000/notifications', newNotification)
      .then(response => setData([...data, response.data]))
      .catch(error => console.error(error));
  };

  const handleDeleteNotification = (id) => {
    axios.delete(`http://localhost:3000/notifications/${id}`)
      .then(() => setData(data.filter(notification => notification.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h2>Notifications</h2>
      <div>
        <h3>Add Notification</h3>
        <input
          type="text"
          placeholder="Notification Message"
          value={newNotification.message}
          onChange={handleInputChange}
        />
        <button onClick={handleAddNotification}>Add Notification</button>
      </div>
      <ul>
        {data.map(notification => (
          <li key={notification.id}>
            {notification.message}
            <button onClick={() => handleDeleteNotification(notification.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPage;
