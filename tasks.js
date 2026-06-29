const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// ==========================================
// 1. CONEXIÓN A LA BASE DE DATOS (MongoDB)
// ==========================================
mongoose.connect('mongodb://localhost:27017/taskflow_db')
    .then(() => console.log('Conexión exitosa a la base de datos de TaskFlow'))
    .catch((err) => console.error('Error de conexión a la base de datos:', err));

// ==========================================
// 2. MODELO DE DATOS DE LA TAREA
// ==========================================
const taskSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    prioridad: { type: String, enum: ['Baja', 'Media', 'Alta'], default: 'Media' },
    estado: { type: String, enum: ['Pendiente', 'En Progreso', 'Completada'], default: 'Pendiente' },
    usuarioAsignado: { type: String, required: true }
}, { timestamps: true }); // Guarda automáticamente fechas de creación

const Task = mongoose.model('Task', taskSchema);

// ==========================================
// 3. OPERACIONES DE LA API (CRUD Y FILTROS)
// ==========================================

// [CREATE] - Registro de una nueva tarea
router.post('/api/tasks', async (req, res) => {
    try {
        const nuevaTarea = new Task(req.body);
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(400).json({ error: 'No se pudo registrar la tarea', detalle: error.message });
    }
});

// [READ & FILTER] - Consulta de tareas con filtros opcionales
router.get('/api/tasks', async (req, res) => {
    try {
        const { usuarioAsignado, estado, prioridad } = req.query;
        let filtros = {};

        // Construcción de filtros dinámicos solicitados en la evaluación
        if (usuarioAsignado) filtros.usuarioAsignado = usuarioAsignado;
        if (estado) filtros.estado = estado;
        if (prioridad) filtros.prioridad = prioridad;

        const tareas = await Task.find(filtros);
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar las tareas' });
    }
});

// [UPDATE] - Actualizar el estado o datos de una tarea
router.put('/api/tasks/:id', async (req, res) => {
    try {
        const tareaActualizada = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!tareaActualizada) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar' });
    }
});

// [DELETE] - Eliminar tareas del sistema
router.delete('/api/tasks/:id', async (req, res) => {
    try {
        const tareaEliminada = await Task.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.status(200).json({ mensaje: 'Tarea eliminada correctamente de la base de datos' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

module.exports = router;
