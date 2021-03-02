# players-ui

## Requisitos

1. Node v13.6.0 - recomiendo usar [nvm](https://cybertooth.io/blog/2017/07/13/nvm-cheat-sheet.html)
2. Un navegador actualizado. Preferiblemente Chrome o Firefox
3. Un IDE adecuado para Javascript + React, como [VSCode](https://code.visualstudio.com/)

## Primeros pasos

**Clona el repositorio** a tu entorno de trabajo.

1. Abre una terminal en la carpeta raíz
2. Ejecuta `npm install` para descargar las dependencias del proyecto

Verifica que se ha creado la carpeta **node_modules**. Ahí es donde están almacenadas todas las dependencias de npm.

## Ejecutar en local

1. Abre una terminal en la carpeta raíz
2. Ejecuta `npm start` para inicializar el compilador en tiempo real
3. Abre tu navegador favorito y navega a [localhost:8080](http://localhost:8080/)
4. Profit!

**Todos los cambios que realices en el código fuente se verán reflejados automáticamente en el navegador sin la necesidad de recargar!**

## Compilar versión de producción

1. Abre una terminal en la carpeta raíz
2. Ejecuta `npm run build` para comenzar el proceso de compilado
3. Una vez terminado deberías ver la carpeta **dist** con los ficheros estáticos
4. Abre un servidor nginx, express, etc. para servir sus contenidos
