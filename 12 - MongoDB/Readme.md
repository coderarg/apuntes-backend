# MongoDB
## ¿Por qué utilizar bases de datos?
Una vez configurado, nos permite tener una gestión más sensilla de nuestros datos que utilizando gestión de archivos.

Ahora vamos a utilizar bases de datos No SQL, separando la información en diferentes archivos.

## ¿Cuándo utilizar cada model?

| Relacional                       | No Relacional                 |
|----------------------------------|-------------------------------|
|Cuando el volumen de los datos no crece, o bien lo hace poco a poco | Cuando el volumen de datos crece rápidamente |
| Cuando las necesidades del proceso pueden atenderse en un solo servidor | Cuando las necesidades del proceso son tan altas y constantes que se requieren multi servidores |
| Cuando no existen picos de uso por parte de los usuarios | Cuando los usuarios saturan el sistema y generan "picos de uso" |


## Instalando MongoDB 6.0 Windows 10  
Vamos a explicar como realizar la instalación de Mongo DB __6.0__ y Mongo Shell en Windows 10 / 11.

>Tener en cuenta que dependiendo de la versión que usted instale, el procedimiento puede variar.

### Paso 1: Descargamos mongodb.msi y mongoshell.zip  
En los siguientes links se encuentran los descargables de MongoDB y MongoShell

[MongoDB Download](https://www.mongodb.com/try/download/community)  
[MongoShell Download](https://www.mongodb.com/products/shell)

### Paso 2: Instalamos MongoDB y Mongo Compass  
Luego de haber instalado MongoDB en conjunto con Mongo Compass, abrimos y generamos conexión en el puerto que nos trae por defecto en la configuración.

### Paso 3: Extraer archivo mongosh.exe  
Extraemos la carpeta zip de mongoshell y copiamos el archivo mongosh.exe en la carpeta bin donde hallamos instaldo MongoDB.  
En mi caso "C:\Program Files\MongoDB\Server\6.0\bin".

### Paso 4: Agregar comandos mongod y mongosh a las variables de entorno  
Luego vamos a abrir el editor de variables de entorno.
En "Path" clickeamos "Editar" y dentro del listado clickeamos en "Nuevo".
Pegamos la ruta de la carpeta bin "C:\Program Files\MongoDB\Server\6.0\bin" y damos en "Aceptar", "Aceptar".

### Paso 5: Crear carpeta data/db
En el puerto C vamos agregar una carpeta "data" y, a su vez, dentro de ella agregamos una carpeta "db"
"C:\data\db"

### Paso 6: Alta de server  
Con nuestro Mongo Compass nos conectamos al puerto por defecto.  
Luego, vamos a abrir nuestra terminal cmd tocando Windows + R y "cmd".

Ejecutamos el comando "mongod", esto da de alta el servidor.

Luego abrimos una nueva terminal "cmd" en esta ejecutamos el comando "mongosh". Esto nos permite abrir la terminal de Mongo Shell y podremos empezar a gestionar nuestras bases de datos.

[Video Tutorial Youtube](https://www.youtube.com/watch?v=2cWZ0lFbJoY&ab_channel=CarlosAlbertoFuelTulc%C3%A1n)

## Comandos

### Mostrar Bases de Datos
Solo va a mostar las DB que contengan colecciones
```javascript
show dbs
```

### Usar una base de datos
```javascript
use nombreBaseDatos
```

### Sabe que base de datos estoy
```javascript
db
```

### Crear Base de Datos
```javascript
use nuevaBaseDatos
```

### Mostrar colecciones
```javascript
show collections
```

### Crear colección dentro de DB
```javascript
db createCollection('nombreColeccion')
```

### Cambiar nombre de colección
```javascript
db.nombreColeccion.renameCollection('nuevoNombre')
```

### Eliminar colección
```javascript
db.nombreColeccion.drop()
```

### Mostrar registros dentro de colección  
```javascript
### Mostrar info
db.nombreColeccion.find()

### Mostrar info identada
db.nombreColeccion.find().pretty()
```

### Nuevo doc dentro de colección
```javascript
### Agregar un registro
db.nombreColeccion.insertOne({name: 'Nombre', age: 30}) 
### Agregar varios registros
db.nombreColeccion.insertMany({name: 'Nombre', age:30}, {name: "OtroNombre, age: 34})

### Nos devuelve un ObjectId
```

### Crear Arrays e Insertar Varios
```javascript
const array = [{name: 'Juan'}, {name: 'Carlos'}, {name: 'Pedro'}]

db.nombreColeccion.insertMany(array)
```

### Buscar un campo en particular
Esto nos devuelve los registros que cumpla con el campo buscado.
```javascript
db.nombreColeccion.find({name: 'Carlos'})
```  
Esto nos devuelve el primer registro que cumpla con el campo buscado
```javascript
db.nombreColeccion.findOne({name: 'Carlos'})
```

### Trear registros por límite
```javascript
db.nombreColeccion.find().limit(4)
```

### Mostrar estadísticas
```javascript
db.stats()
```