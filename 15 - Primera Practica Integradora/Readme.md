### Primer Práctica Integradora

En esta práctica vamos a continuar sobre el proyecto que venimos desarrollando de e-commerce integrando el modelo de persistencia de MongoDB y Mongoose.  
Vamos a separar los managers de FileSystem y Mongo en una sola carpeta "DAO" (Data Access Object). Esto permite separar la lógica de acceso a los datos de la lógica de negocios de la aplicación. Es decir, tener una capa de abstracción entre la app y la fuente de datos.  

Iniciamos el proyecto con Node e instalamos las dependencias.

```shell
npm init -y
npm i express morgan mongoose
```