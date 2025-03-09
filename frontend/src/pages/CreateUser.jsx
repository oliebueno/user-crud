import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserForm from '../components/UserForm';

const CreateUser = () => {
  const navigate = useNavigate();

  const handleSubmit = async (user) => {
    try {
      await axios.post('http://localhost:3000/users', user);
      navigate('/users');
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Crear Usuario</h1>
        <UserForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateUser;
