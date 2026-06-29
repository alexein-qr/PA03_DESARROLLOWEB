# Proyecto: TaskFlow Solutions API

## 1. Diseño de la Arquitectura (Pregunta 1)
Para cumplir con los requisitos de escalabilidad y buenas prácticas, se ha diseñado una **Arquitectura en Capas (Layered Architecture)** siguiendo el patrón **Controlador-Servicio-Repositorio**:

* **Capa de Controladores (Rutas):** Recibe las peticiones HTTP de los usuarios y gestiona los eventos en tiempo real.
* **Capa de Servicios (Lógica de Negocio):** Contiene las reglas para asignar y actualizar tareas.
* **Capa de Repositorios (Acceso a Datos):** Maneja la comunicación directa con la base de datos de forma aislada.

### Justificación de Tecnologías
* **Servidor Web:** Se configuró utilizando **Node.js** con el framework **Express** por su ligereza y alto rendimiento.
* **Tiempo Real:** Se integra **Socket.io** para permitir que las actualizaciones de los estados de las tareas se transmitan en tiempo real de forma bidireccional a todo el equipo de trabajo.
