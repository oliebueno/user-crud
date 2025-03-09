import React from 'react';

const DeleteConfirmation= ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
