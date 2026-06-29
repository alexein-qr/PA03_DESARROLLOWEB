const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Esquema de la Tarea según requerimientos
const taskSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    prioridad: { type: String, enum: ['Baja', 'Media', 'Alta'], default: 'Media' },
    estado: { type: String, enum: ['Pendiente', 'En Progreso', 'Completada'], default: 'Pendiente' },
    usuarioAsignado: { type: String, required: true }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// Operación: Registrar Tarea (CREATE)
router.post('/api/tasks', async (req, res) => {
    try {
        const nuevaTarea = new Task(req.body);
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Operación: Consultar con Filtros (READ)
router.get('/api/tasks', async (req, res) => {
    try {
        const { usuarioAsignado, estado, prioridad } = req.query;
        let filtros = {};
        if (usuarioAsignado) filtros.usuarioAsignado = usuarioAsignado;
        if (estado) filtros.estado = estado;
        if (prioridad) filtros.prioridad = prioridad;

        const tareas = await Task.find(filtros);
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
