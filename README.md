# Documentación del Proyecto de Microfrontends

## Introducción
Este proyecto implementa una arquitectura de microfrontends utilizando tecnologías como Angular, React, Webpack y Docker. El objetivo es crear una aplicación modular compuesta por diferentes microfrontends que se pueden ejecutar de manera independiente.

## Estructura del Proyecto
El proyecto se compone de las siguientes carpetas:

- `host-app`: Contiene la aplicación principal (host) que integra los microfrontends.
- `angular-app-alquiler`: Contiene la aplicación Angular para la funcionalidad de alquiler.
- `angular-app-ventas`: Contiene la aplicación Angular para la funcionalidad de ventas.
- `shared-css`: Contiene módulos CSS compartidos entre las aplicaciones.

## Configuración
- El archivo `webpack.config.js` en `host-app` define la federación de módulos y cómo se integran los microfrontends.
- Cada microfrontend tiene su propio archivo `custom-webpack.config.js` para configurar la exposición de componentes y las dependencias compartidas.

## Ejecución Local
1. Desde la carpeta `angular-app-alquiler`, ejecuta `npm install` y luego `npm run start` para iniciar la aplicación en el puerto 3001.
2. Desde la carpeta `angular-app-ventas`, ejecuta los mismos comandos para iniciar la aplicación en el puerto 3002.
3. Desde la carpeta `host-app`, ejecuta `npm install` y luego `npm run start` para iniciar la aplicación principal en el puerto 3000.

## Dockerización
- Cada microfrontend tiene su propio Dockerfile para construir la imagen y servir la aplicación en Nginx.
- Utiliza el archivo `docker-compose.yml` para orquestar los contenedores y ejecutar todo el proyecto con un solo comando.

## Integración Continua
- Puedes utilizar una herramienta como Jenkins para automatizar el proceso de construcción, prueba y despliegue de las aplicaciones.

## Documentación Adicional
Para obtener más detalles sobre la configuración y funcionamiento del proyecto, consulta los archivos de configuración y los comentarios en el código.

## Enlaces Relevantes
- [Documentación de Angular](https://angular.io/docs)
- [Documentación de React](https://reactjs.org/docs)
- [Documentación de Webpack](https://webpack.js.org/concepts)
- [Documentación de Docker](https://docs.docker.com)
