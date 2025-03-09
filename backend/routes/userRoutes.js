const express = require('express');
const router = express.Router();
const pool = require('../database');
const { validateUser } = require('../utils/validation');

// Crear un usuario
router.post('/', async (req, res) => {
    const errors = validateUser(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ message: errors });
    }

    try {
        const { name, email, born_day, born_month, born_year, category } = req.body;

        // Verifica si el email ya existe en la base de datos
        const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ message: 'El email introducido ya está en uso' });
        }

        // Inserta el usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO users (nombre, email, fecha_de_nacimiento, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, new Date(born_year, born_month - 1, born_day), category]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los usuarioss
router.get('/', async (req, res) => {
    const { page = 1, category, order = 'ASC' } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM users';
    let countQuery = 'SELECT COUNT(*) FROM users';
    let params = [];
    const validCategories = ['amigo', 'compañero', 'superAmigos', 'bloqueados'];

    // Filtrar por categoría
    if (category && validCategories.includes(category)) {
        query += ' WHERE categoria = $1';
        countQuery += ' WHERE categoria = $1';
        params.push(category);
    }

    if (order !== 'ASC' && order !== 'DESC') {
        return res.status(400).json({ message: 'Orden inválido. Debe ser ASC o DESC.' });
    }

    const limitParamIndex = params.length + 1;
    const offsetParamIndex = params.length + 2;

    query += ` ORDER BY fecha_de_nacimiento ${order}, nombre ${order} LIMIT $${limitParamIndex} OFFSET $${offsetParamIndex}`;
    params.push(limit, offset);

    try {
        const result = await pool.query(query, params);
        const countResult = await pool.query(countQuery, params.slice(0, params.length - 2));
        const totalCount = parseInt(countResult.rows[0].count, 10);
        res.status(200).json({ users: result.rows, totalPages: Math.ceil(totalCount / limit) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Obtener un usuario
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró el usuario' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    const errors = validateUser(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ message: errors });
    }

    try {
        const { id } = req.params;
        const { name, email, born_day, born_month, born_year, category } = req.body;

        // Actualización en la base de datos
        const result = await pool.query(
            'UPDATE users SET nombre = $1, email = $2, fecha_de_nacimiento = $3, categoria = $4 WHERE id = $5 RETURNING *',
            [name, email, new Date(born_year, born_month - 1, born_day), category, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró el usuario' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró el usuario' });
        }
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;