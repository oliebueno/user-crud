// utils/validation.js
const validateUser = ({ name, email, born_day, born_month, born_year, category }) => {
    const errors = [];

    // Validación del nombre
    if (!name || name.length < 3 || name.length > 200) {
        errors.push('El nombre introducido es inválido');
    }

    // Validación del email
    const emailRegex = /^[a-zA-Z0-9._+\-]+@(gmail\.com|hotmail\.com)$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('El email introducido es inválido');
    }

    // Validación de la fecha de nacimiento
    const day = parseInt(born_day);
    const month = parseInt(born_month);
    const year = parseInt(born_year);
    const currentYear = new Date().getFullYear();
    const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year > currentYear || day > daysInMonth[month - 1]) {
        errors.push('La fecha de nacimiento introducida es inválida');
    }

    // Validación de la categoría
    const validCategories = ['amigo', 'compañero', 'superAmigos', 'bloqueados'];
    if (!category || !validCategories.includes(category)) {
        errors.push('La categoría introducida es inválida');
    }

    return errors;
};

module.exports = { validateUser };
