# Mongo Avanzado Parte 2

## Aggregations
Nos permite realizar varias operaciones en una búsqueda.  
Las agregaciones trabajan con un concepto llamado "pipeline", las cuales consisten en un conjunto de pasos (stages), donde cada paso corresponderá a una operación a realizar. 

[+info Aggregations](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)

[+info Aggregations Ref](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/)


### users.dao.js
Creamos un método en nuestra clase UsersDaoMongoDB para generar el "agregation".  
En este metodo declaramos una constante donde vamos a guardar los resultados de filtrado del model.aggregate().  
Dentro del agregate() declaramos los stages en un corchete (como si fuera un array de stages), y finalmente retornamos el resultado.
Stages:
- $match: Se utiliza para filtrar los documentos antes de continuar con otras operaciones.
- $group: 

```javascript
async aggregation(){
    try {
        //Guardamos en una constante lo solicitado.
      const response = await UserModel.aggregate([
        //Stage 1
        {
          $match: { 
            // gender: `${gender}`,
            age: { $gte: 18 } 
          }
        },
        //Stage 2
        {
          $group: {
            _id: '$gender', //propiedad _id de group para seleccionar con que campo vamos a agrupar
            average_age: { $avg: '$age' },
            count: { $sum: 1 }, //Cuenta 1 por cada documento, separando por género.
            youngest: { $min: '$age' },
            oldest: { $max: '$age' }
          }
        },
        //Stage 3
        {
          $sort: {
            average_age: 1
          }
        }
      ])
      //Retornamos la respuesta
      return response
    } catch (error) {
      console.log(error);
    }
  }
```

### users.services.js
Agregamos un servicio que utiliza este nuevo método que hemos creado.

```javascript
export const aggregation = async() => {
  try {
    const aggregation = await userDao.aggregation();
    return aggregation;
  } catch (error) {
    console.log(error);
  }
}
```

### users.controllers.js
Vamos a crear el controlador que utilizará el servicio anteriormente creado.

```javascript
export const aggregation = async(req, res, next) => {
  try {
    // const { gender } = req.query;
    const response = await service.aggregation();
    res.json(response)
  } catch (error) {
    next(error.message)
  }
}
```

### users.router.js
Creamos la ruta para llamar al controlador.

```javascript
router.get('/aggregation', controller.aggregation)
```

## Modificando todos los documentos.
Vamos a agregar los campos "age" y "date" a todos los documentos descargados en el archivo users.json de la clase anterior.

### users.model.js
Agregamos los campos al modelo Schema.

```javascript
const UserSchema = new mongoose.Schema({
  first_name: { 
    type: String, 
    required: true,
    index: true
  },
  last_name: { type: String, required: true },
  email:  { type: String, required: true, unique: true },  
  gender:  { type: String, required: true },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pets',
      default: []
    }
  ],
  age: { type: Number },
  date: { type: String }
});

```

### users.dao.js
Creamos el método en la clase UsersDaoMongoDB.  
Utilizamos el método de mongoose user.save() para guardar por cada usuario los campos agregados.

```javascript
async updateManyAge(){
    try {
      const users = await UserModel.find({});
      users.forEach((user)=> {
        user.age = getRandomNumber();
        user.date = getRandomDate();
        user.save()
      });
      return { message: 'updated OK' }
    } catch (error) {
      console.log(error);
    }
  }
```

### users.services.js
Creamos el servicio que utilizará este método.

```javascript
export const updateManyAge = async() => {
  try {
    const response = await userDao.updateManyAge();
    return response;
  } catch (error) {
    console.log(error);
  }
}
```

### users.controllers.js
Creamos el controlador.

```javascript
export const updateManyAge = async (req, res, next) => {
  try {
    const response = await service.updateManyAge();
    res.send(response)
  } catch (error) {
    next(error.message)
  }
}
```

### users.router.js
Creamos la ruta por la que se va a ejecutar el método finalmente.   
```javascript
router.put('/updatedocs', controller.updateManyAge);
```

## Paginación con Mongoose
Para realizar la paginación vamos a utilizar un plugin de mongoose llamado mongoose paginate.  
Para ello deberemos instalarlo a través de node

``` shell
npm i mongoose-paginate-v2
```

### users.model.js
Importamos mongoose paginate y agregamos el plugin en nuesto model.

```javascript
import mongoosePaginate from 'mongoose-paginate-v2';
UserSchema.plugin(mongoosePaginate);
```

### users.dao.js
En nuestro dao aplicamos el método paginate.  
Este método recibe 2 parámetros: el primero es un filtro {} (aquí traemos todos) y el segundo es la página en la que inicia y el límite de elementos por página.

```javascript
async getAllUsers(page = 1, limit = 10) {
    try {
      const response = await UserModel.paginate({}, { page, limit });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
```

### users.services.js
Llamamos al método desde un servicio, donde  pasaremos los parámetros "page" y "limit";

```javascript
export const getAllUsers = async (page, limit) => {
  try {
    const item = await userDao.getAllUsers(page, limit);
    if (!item) return false;
    else return item;
  } catch (error) {
    console.log(error);
  }
};
```

### users.controllers.js
En controllers vamos a tomar los parámetros "page" y "limit" desde el req.query;

```javascript

```