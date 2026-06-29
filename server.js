// Importación de herramientas
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Inicialización del servidor web (Requerimiento de Pregunta 1)
const app = express();
const server = http.createServer(app);

// Configuración de WebSockets para las funciones en tiempo real
const io = new Server(server, {
    cors: { origin: '*' }
});

// Middleware para procesar datos en formato JSON
app.use(express.json());

// Ruta de prueba para verificar que el servidor web funciona
app.get('/', (req, res) => {
    res.send('Servidor web de TaskFlow Solutions configurado y corriendo con éxito.');
});

// Escuchar conexiones en tiempo real
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado al equipo en tiempo real.');
});

// Encender el servidor en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor de la Pregunta 1 ejecutándose en http://localhost:${PORT}`);
});
