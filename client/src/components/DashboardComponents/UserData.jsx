import { useState, useEffect } from 'react';
import '../../styles/UserData.css';
import axios from 'axios';

const UserData = () => {
  const [users, setUsers] = useState([]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/v1/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/user/all");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])

  return (
    <>
      <h2 style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>User Data</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button className="dashboardBtn" onClick={() => deleteUser(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default UserData;