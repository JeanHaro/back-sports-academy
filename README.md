# Backend Sports Academy

Proyecto generado con NodeJS utilizando el Framework Express.js 

## Instalación de archivos necesarios

Para instalar los archivos necesarios para este proyecto, utiliza el comando:

```
npm install
````

## Proyecto

Esto es un API creado para la gestión de horarios, matriculas y registros, como también para la gestión del admin, el inicio de sesión y el envío del email desde contáctanos.

## Que utiliza:

- Middlewares para validar campos,el JWT y obtener errores
- Helpers para generar el JSON Web Token (JWT)
- CRUD de los horarios, matrículas, registros y admin
- La conexión de la base de datos a MongoDB
- Controllador de los horarios, matrículas, registros y admin
- El modelo de los horarios, matrículas, registros y admin con Schema
- Las rutas para el GET, PUT, POST, DELETE
- Librerías como CORS y dotenv (para variables de entorno)
- Librerías como nodemailer para el envío de correos, bcrypts para encriptar las contraseñas al momento del registro de cada admin y date-fns para las fechas 

## Proyectos Vinculados

Proyecto realizado con la parte frontend llamada <a href="https://github.com/JeanHaro/front-sports-academy">**front_sports_academy**</a>