# Caso de Estudio: TaskFlow Solutions API

Este repositorio contiene la solución completa para la API de gestión de tareas colaborativas en tiempo real de la empresa ficticia "TaskFlow Solutions".

---

## 1. Diseño de la Arquitectura (Pregunta 1)
Se implementó una **Arquitectura en Capas** estructurada en:
* **Controladores (`server.js`):** Encargados de las rutas HTTP y la comunicación bidireccional en tiempo real con **Socket.io**.
* **Modelos y Rutas (`tasks.js`):** Encargados de las reglas de negocio y la persistencia de datos mediante **Mongoose** hacia **MongoDB**.

---

## 2. Funcionalidades de la API RESTful (Pregunta 2)
El archivo `tasks.js` contiene el ciclo de vida completo de las tareas (CRUD) con soporte para los siguientes campos requeridos:
* Título, descripción, prioridad, estado y usuario asignado.
* **Sistema de Filtros:** Permite realizar consultas específicas filtrando directamente en la URL por `usuarioAsignado`, `estado` o `prioridad`.

---

## 3. Control de Versiones y Progreso (Pregunta 3)
Para la gestión del proyecto se utilizó **Git** como sistema de control de versiones local, manteniendo el histórico de cambios sincronizado con este repositorio remoto en **GitHub**.

### Comandos de Git utilizados en el ciclo de desarrollo:
1. **Inicialización:** `git init` (para crear el repositorio local).
2. **Registro de cambios:** `git add .` seguido de `git commit -m "feat: implementar CRUD y WebSockets"`.
3. **Sincronización remota:** `git push -u origin main` (para enviar el código a GitHub).
