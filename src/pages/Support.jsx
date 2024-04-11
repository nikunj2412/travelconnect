import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Support = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3333/v1/admin/getAllContactUs');
      console.log(response.data.data)
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Support Request</h1>
      <table className="min-w-full border border-collapse border-gray-300">
        <thead>
          <tr>
            <th className="text-left border border-gray-300 px-4 py-2">ID</th>
            <th className="text-left border border-gray-300 px-4 py-2">First Name</th>
            <th className="text-left border border-gray-300 px-4 py-2">Last Name</th>
            <th className="text-left border border-gray-300 px-4 py-2">Email</th>
            <th className="text-left border border-gray-300 px-4 py-2">Request/Concern</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Support;
