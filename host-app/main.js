// main.js
import("angularAppAlquiler/Component")
  .then((module) => {
    // Aquí es donde se va a insertar el componente en el DOM.
    // Esto dependerá de cómo expongas el componente en Angular.
  })
  .catch((err) => {
    console.log("Error al cargar el componente angularAppAlquiler:", err);
  });

import("angularAppVentas/Component")
  .then((module) => {
    // Aquí es donde se va a insertar el otro componente en el DOM.
    // Esto también dependerá de cómo expongas el componente en Angular.
  })
  .catch((err) => {
    console.log("Error al cargar el componente angularAppVentas:", err);
  });
