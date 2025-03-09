import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('ASC');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users', {
          params: { category, order, page },
        });
        const data = response.data;
        if (Array.isArray(data.users)) {
          setUsers(data.users);
          setTotalPages(data.totalPages || 1);
          setError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setUsers([]);
        setTotalPages(1);
        setError('No se encontraron usuarios en esta categoría.');
      }
    };

    fetchUsers();
  }, [category, order, page]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Usuarios</h1>
        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
      </div>

      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setCategory(e.target.value)} className="border p-2">
          <option value="">Todas las Categorías</option>
          <option value="amigo">Amigo</option>
          <option value="compañero">Compañero</option>
          <option value="superAmigo">SuperAmigo</option>
          <option value="bloqueado">Bloqueado</option>
        </select>

        <select onChange={(e) => setOrder(e.target.value)} className="border p-2">
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
        </select>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{user.nombre}</h2>
              <p className="text-gray-600 mb-1"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600 mb-1"><strong>Fecha de Nacimiento:</strong> {new Date(user.fecha_de_nacimiento).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-1"><strong>Categoría:</strong> {user.categoria}</p>
              <div className="flex justify-end mt-4">
                <Link to={`/users/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Ver</Link>
                <Link to={`/users/${user.id}/edit`} className="bg-green-500 text-white px-4 py-2 rounded">Editar</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Users;
