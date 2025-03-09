import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserForm from '../components/UserForm';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, updatedUser);
      navigate('/users');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Editar Usuario</h1>
        {user && <UserForm initialData={user} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default EditUser;
