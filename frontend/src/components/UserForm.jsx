import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    born_day: '',
    born_month: '',
    born_year: '',
    category: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setUser({
        name: initialData.nombre,
        email: initialData.email,
        born_day: new Date(initialData.fecha_de_nacimiento).getDate(),
        born_month: new Date(initialData.fecha_de_nacimiento).getMonth() + 1,
        born_year: new Date(initialData.fecha_de_nacimiento).getFullYear(),
        category: initialData.categoria
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const isEmailValid = (email) => {
    const validDomains = ['hotmail.com', 'gmail.com'];
    const domain = email.split('@')[1];
    return validDomains.includes(domain);
  };

  const isDateValid = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === parseInt(year, 10) &&
           date.getMonth() === month - 1 &&
           date.getDate() === parseInt(day, 10);
  };

  const isNameValid = (name) => {
    return name.length > 3 && name.length < 200;
  };

  const isYearValid = (year) => {
    const currentYear = new Date().getFullYear();
    return parseInt(year, 10) <= currentYear;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!user.name || !user.email || !user.born_day || !user.born_month || !user.born_year || !user.category) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validar nombre
    if (!isNameValid(user.name)) {
      setError('El nombre debe tener más de 3 y menos de 200 caracteres.');
      return;
    }

    // Validar correo electrónico
    if (!isEmailValid(user.email)) {
      setError('El correo debe ser de dominio hotmail.com o gmail.com.');
      return;
    }

    // Validar año
    if (!isYearValid(user.born_year)) {
      setError('El año de nacimiento no puede ser mayor que el año actual.');
      return;
    }

    // Validar fecha
    if (!isDateValid(user.born_day, user.born_month, user.born_year)) {
      setError('La fecha de nacimiento no es válida.');
      return;
    }

    setError('');
    onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={user.name}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={user.email}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        name="born_day"
        placeholder="Día de Nacimiento"
        value={user.born_day}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        name="born_month"
        placeholder="Mes de Nacimiento"
        value={user.born_month}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        name="born_year"
        placeholder="Año de Nacimiento"
        value={user.born_year}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <select name="category" value={user.category} onChange={handleChange} className="border p-2 mb-2 w-full">
        <option value="">Selecciona una Categoría</option>
        <option value="amigo">Amigo</option>
        <option value="compañero">Compañero</option>
        <option value="superAmigos">SuperAmigos</option>
        <option value="bloqueados">Bloqueados</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  );
};

export default UserForm;
