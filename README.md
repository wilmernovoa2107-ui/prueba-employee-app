# Respuestas - Preguntas teoricas

## 1. ¿Qué es una API REST?
Es una interfaz que permite que diferentes sistemas se comuniquen a traves de internet usando el protocolo HTTP, esta sigue los principios como usar métodos estandar (GET, POST, PUT, DELETE).

## 2. ¿Qué es un DTO y por qué se usa?
Un DTO (Data Transfer Object) es un objeto que se utiliza para transferir datos entre diferentes partes de una aplicación, normalmente se usa para: no exponer el modelo completo de la base de datos y controlar que información se envia al cliente

## 3. ¿Qué es una promesa en JavaScript?
Una promesa es un objeto que representa el resultado eventual de una operación asincrona. Puede tener tres estados: pendiente, cumplida o rechazada. Se usa con `.then()` para manejar el éxito y `.catch()` para manejar errores.

## 4. ¿Cuál es la diferencia entre GET, POST, PUT y DELETE?
- GET: Se usa para obtener información (solo lectura)
- POST: Se usa para crear nuevos recursos o elementos
- PUT: Se usa para actualizar recursos o elementos existentes
- DELETE: Se usa para eliminar recursos o elementos existentes

## 5. ¿Qué significa que React sea una SPA?
Esto significa que React carga una sola página HTML y actualiza el contenido dinámicamente sin recargar toda la página, gracias a esto se puede proporcionar una experiencia de usuario mas fluida similar.

# Como correr el proyecto

## Prerrequisitos

- .NET 8.0 SDK
- Node.js 16+ 
- Navegador web moderno
- Visual Studio 2022 o 2026 para el backend
- Visual Studio Code para el frontend


## 1. Backend (.NET Core API)

## Navegar a la carpeta del backend (RUTA EXACTA)

cd C:\Users\USER\Desktop\Prueba\EmployeeAPI\EmployeeAPI

## Aca se ejecuta el backend con el siguiente comando

dotnet run

## La API estará disponible en: http://localhost:5096
## Swagger UI: http://localhost:5096/swagger
## Lista de empleados: http://localhost:5096/api/employees

## Para el frotend se debe navegar a la siguiente ruta (en otra terminal)
cd C:\Users\USER\Desktop\Prueba\employee-frontend

## Instalar dependencias (primera vez)
npm install

## Ejecutar la aplicación
npm start

## La aplicación estará disponible en:
## http://localhost:3000

# Ejercicios lógica

## Ejecutar desde la carpeta donde esté el archivo

node Logica.js