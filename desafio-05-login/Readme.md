# Implementación de login

## Consigna
Ajustar nuestro servidor principal para trabajar con un sistema de login.

### Aspectos a incluir
- Deberá contar con todas las vistas realizadas en el hands on lab, así también como las rutas de router para procesar el registro y el login. 
- Una vez completado el login, realizar la redirección directamente a la vista de productos.
- Agregar a la vista de productos un mensaje de bienvenida con los datos (no sensibles) del usuario.
- Agregar un sistema de roles, de manera que si colocamos en el login como correo adminCoder@coder.com, y la contraseña adminCod3r123, el usuario de la sesión además tenga un campo rol "admin".
- Todos los usuarios que no sean admin deberán contar con un rol “usuario”.
- Implementar botón de “logout” para destruir la sesión y redirigir a la vista de login

## Formato
Link al repositorio de Github sin node_modules

## Sugerencias
Recuerda que las vistas son importantes, más no el diseño, concéntrate en la funcionalidad de las sesiones antes que en la presentación.  
Cuida las redirecciones a las múltiples vistas.

### Testing
Tu código se testeará a partir de [este documento](https://docs.google.com/document/d/1TpAf4izcY-ZVoucrpMxyaAh9ap0anQb6Dw7va1fDgrk/edit).

### Login por formulario

- Al cargar el proyecto, éste deberá comenzar en la pantalla de login.
- Al no tener un usuario, primero se creará un usuario, para esto, la pantalla de login deberá tener un link de redirección “Regístrate”.
- El proceso de registro deberá guardar en la base de datos al usuario.
- Se regresará al proceso de login y se colocarán las credenciales de manera incorrecta, esto para probar que no se pueda avanzar a la siguiente pantalla.
- Posteriormente, se colocarán las credenciales de manera correcta, esto para corroborar que se cree una sesión correctamente y que se haga una redirección a la vista de productos.
- La vista de productos tendrá en una parte de arriba de la página el mensaje “Bienvenido” seguido de los datos del usuario que se haya logueado (NO mostrar password). Es importante que se visualice el “rol” para ver que aparezca “usuario” o “user”.
- Se presionará el botón de logout y se destruirá la sesión, notando cómo nos redirige a login.
- Se ingresarán las credenciales específicas de admin indicadas en las diapositivas, el login debe redirigir correctamente y mostrar en los datos del rol: “admin” haciendo referencia a la correcta gestión de roles. 
- Se revisará que el admin NO viva en base de datos, sino que sea una validación que se haga de manera interna en el código.

