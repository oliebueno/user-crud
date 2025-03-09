import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserPlus } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Bienvenido a la Gestión de Usuarios de N</h1>
        <p className="mb-6 text-gray-600">Esta aplicación te permite gestionar usuarios: crear, editar, eliminar y ver detalles.</p>

        <div className="grid grid-cols-1 gap-4">
          <Link to="/users" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 flex items-center justify-center gap-2">
            <FaUsers /> Lista de Usuarios
          </Link>
          <Link to="/users/create" className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 flex items-center justify-center gap-2">
            <FaUserPlus /> Crear Usuario
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
