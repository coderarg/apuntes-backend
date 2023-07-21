# Cómo limpiar un mate like a pro!
> Consejo del profesor de como limpiar el mate de calabaza, comúnmente llamado "porongo", cuando le crecen hongos.

## Paso 1:
Limpiar los hongos (hongo por hongo) vertiendo agua hirviendo y raspando con una cuchara el interior hasta que quede limpio.

## Paso 2:
Verter lavandina diluida en agua (1 parte de lavandina, 2 partes de agua) e intentar que esa mezcla haga contacto con todo el interior del mate. Luego enjuagar con agua.

## Paso 3:
Verter agua oxigenada dentro del mate, esto va a retirar el gusto a lavandina del mate y otros gustos no deseados. Luego enjuagar con agua.

## Paso 4:
Curar el mate. Esto se puede hacer sirviendo un mate como se hace normalmente y dejar estacionar de un día para otro. Al otro día se retira y descarta la yerba (no seas rata, tirala) y se seca el mate con una servilleta.  
Este paso se puede repetir 2 o 3 veces para mejorar el sabor del mate. Es recomendable secar bien el mate y luego dejar al sol por 1 o 2 horas entre cambio de yerba.
___


Ahora si, a lo que vinimos
# Mongoose
Cliente CLI: Consola
Cliente GLI: Interfaz Gráfica
Cliente web: interfaz gráfica en la web
Cliente app: interfaz gráfica para app

## Data Base as a Service DBaaS

![](image.png)

La diferencia está en las tareas que delego al proveedor de Cloud.

- Infraestructura.
- Infraestructura y Plataforma.
- Infraestructura, Plataforma y Softwares.

A medida que nos acercamos a Software como servicio, perdemos control de modificaciones del proyecto.

## MongoDB Atlas

### Configuración de MongoDB Atlas

1. Crear una cuenta rellenando el formulario o ingresando con google.

2. Seleccionar el plan gratuito.

3. Crear un cluster para conectar a la base de datos.

### Configuración de Política de Seguridad

1. En el panel de la izquiera, clickeamos en "Network Access".

2. Clickeamos en " +ADD IP ADRESS".

3. Agregamos una IP genérica para que tome todas las IP. (0.0.0.0);

### Configuración de Acceso a la DB

1. Ingresamos en "Database Access" en el panel de la izquiera.

2. Editamos la configuración del usuario. Utilizamos el método "Password".

3. Configuramos la contraseña y asignamos el role de Atlas Admin para tener acceso total.

### Conectamos la base de datos.

1. Clickeamos en "Connect" al lado del nombre del Cluster.

2. Seleccionamos Drivers.

3. Copiamos el string de conección y lo reservamos para utilizarlo luego.

## Mongoose

En una terminal de Visual Studio Code iniciamos node e instalamos la dependencia de mongoose

```shell
npm init -y
npm i mongoose
```


### 01-conexión.js
Creamos un archivo donde generamos la conexión de mongoose con mongodb.

1. Importamos Mongoose.
2. Generamos la conexión con la base de datos. Aquí tenemos 2 alternativas:
    1. Conectarnos a una base de datos local, por ejemplo a través de Mongo Compass. Para esto vamos a ingresar el puerto que nos indica Compass al configurarlo.
    2. Conectarnos a una base de datos en la nube como Mongo Atlas. Aquí copiaremos el String de Conexión que no indica al configurar el Cluster.
3. Exportamos la constante que inicia la conexión de mongoose y le pasamos el string de conexión.

```javascript
import mongoose from "mongoose";

// Este string de conexión puede fallar en la base de datos local.
const connectionString = 'mongodb://localhost:27017/coderhouse';

// Se reemplaza por este y funciona.
const connectionStringLocal2 = 'mongodb://127.0.0.1:27017/coderhouse';

//const connectionStringAtlas = 'copiar dentro del strign de conexión de MongoDB Atlas aquí';

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log(error);
    }
}
```
s
### 02-schema.js
Dentro de este archivo vamos a crear los schemas de la base de datos. Este Schema es como los llamados schemas de MySQL, solo que en este caso tendremos una "tabla" por schema.

1. Importamos mongoose.
2. Creamos un modelo de Schema para cada entidad.
3. Exportamos el modelo de Schema.

```javascript
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 },
    admin: { type: Boolean, default: false },
    age: { type: Number, required: true }
});

export const UserModel = mongoose.model('users', UserSchema);
```

### métodos.js

```javascript
// Importamos la conexión con la base de datos
import { initMongoDB } from "./01-conexion.js";

// Importamos el Schema
import { UserModel } from "./02-schema.js";

const user = {
    first_name: 'Matias',
    last_name: 'Merlo',
    age: 37
}

// Método Create
const createUser = async (obj) =>{
    await UserModel.create(obj);
}

const test = async() => {
    await initMongoDB();

    // Método create
    await UserModel.create(user);
    
    // Método findById
    const findByIdMethod = await UserModel.findById('6466b1de59553c6548dedb54')
    console.log(findByIdMethod);

    // Método find
    const findMethod = await UserModel.find({});
    console.log(findMethod);

    // Método findByIdAndUpdate
    await initMongoDB();
    const update1 = await UserModel.findByIdAndUpdate(
        '64af47ed5523b83fdeb51f25',
        { admin: true },
        { new: true }
        )
    console.log(update1);

    // Método findByIdAndDelete
    const delete1 = await UserModel.findByIdAndDelete('64af47ed5523b83fdeb51f25');
    console.log(delete1);
}

test()
```