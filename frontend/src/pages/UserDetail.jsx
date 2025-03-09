import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmation from '../components/DeleteConfirmation';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      navigate('/users');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const openConfirmationDialog = () => setShowConfirmation(true);
  const closeConfirmationDialog = () => setShowConfirmation(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Detalles del Usuario</h1>
        {user ? (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">{user.nombre}</h2>
              <p className="text-gray-600 mb-1"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600 mb-1"><strong>Fecha de Nacimiento:</strong> {new Date(user.fecha_de_nacimiento).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-1"><strong>Categoría:</strong> {user.categoria}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => navigate(`/users/${id}/edit`)}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={openConfirmationDialog}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center">Cargando usuario...</p>
        )}
        {showConfirmation && (
          <DeleteConfirmation
            message="¿Estás seguro de que deseas eliminar este usuario?"
            onConfirm={handleDelete}
            onCancel={closeConfirmationDialog}
          />
        )}
      </div>
    </div>
  );
};

export default UserDetail;
