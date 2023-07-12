# CRUD EN MONGODB

## Repasamos comandos de la clase anterior

### Mostrar Bases de Datos
Solo va a mostar las DB que contengan colecciones
```shell
show dbs
```

### Usar una base de datos
Si la base de datos existe, ingresa en ella para poder utilizarla. En caso contrario, crea la base de datos y luego ingresa.
```shell
use nombreBaseDatos
```

### Sabe que base de datos estoy
```shell
db
```

### Crear Base de Datos
```shell
use nuevaBaseDatos
```

### Mostrar colecciones
```shell
show collections
```

### Crear colección dentro de DB
```shell
db createCollection('coll')
```

### Cambiar nombre de colección
```shell
db.coll.renameCollection('nuevoNombre')
```

### Eliminar colección
```shell
db.coll.drop()
```

### Mostrar registros dentro de colección  
```shell
### Mostrar info
db.coll.find()

### Mostrar info identada
db.coll.find().pretty()
```

### Nuevo doc dentro de colección
```shell
### Agregar un registro
db.coll.insertOne({name: 'prod1', price: 200}) 
### Agregar varios registros
db.coll.insertMany({name: 'prod2', price: 300}, {name: 'otroprod, price: 340})
### Nos devuelven un ObjectId
```

### Crear Arrays e Insertar Varios
```shell
const array = [{name: 'Juan'}, {name: 'Carlos'}, {name: 'Pedro'}]

db.coll.insertMany(array)
```

### Buscar un campo en particular
Esto nos devuelve los registros que cumpla con el campo buscado.
```shell
db.coll.find({name: 'prod1'})
```  
Esto nos devuelve el primer registro que cumpla con el campo buscado
```shell
db.coll.findOne({name: 'prod'})
```

### Trear registros por límite
```shell
db.coll.find().limit(4)
```

### Mostrar estadísticas
```shell
db.stats()
```

## Nuevos Comandos

### Buscar filtrando por campo
```shell
db.coll.find({name: 'nombre'})
```

### Buscar filtrando por varios campos
```shell
db.coll.find({name: 'prod1', price: 300})
```

### Buscar filtrando por varios campos
```shell
db.coll.find({name: 'prod1', price: 300})
```

### Contar todos los documentos
```shell
db.coll.countDocuments()
```

### Contar docs que coinciden con un campo
```shell
db.coll.countDocuments({price: 300})
```

### ($eq :equal) Buscar docs cuyo campo sea igual a un valor
```shell
db.coll.find({ price: {$eq: 1500}})
```

### ($ne: not equal) Buscar docs cuyo campo sea diferente a un valor
```shell
db.coll.find({ price: {$ne: 1500}})
```

### ($gt: greater than) Buscar docs cuyo campo sea mayor a un valor
```shell
db.coll.find({ price: {$gt: 1500}})
```

### ($gte: greater than equal) Buscar docs cuyo campo sea mayor igual a un valor
```shell
db.coll.find({ price: {$gte: 1500}})
```

### ($lt: less than) Buscar docs cuyo campo sea menor a un valor
```shell
db.coll.find({ price: {$lt: 1500}})
```

### ($lte: less than equal) Buscar doc cuyo campo sea menor igual a un valor
```shell
db.coll.find({ price: {$lte: 1500}})
```

### ($in) Buscar docs donde uno de los campos coincide con alguno de varios valores
```shell
db.coll.find({ price: {$in: ['bebidas', 'comestibles']}})
```

### ($nin: not in) Buscar docs donde uno de los campos no coincida con alguno de varios valores
```shell
db.coll.find({ price: {$in: ['bebidas', 'comestibles']}})
```

### ($exist) Devuelve los docs que cuentan con un campo en particular
```shell
db.coll.find({promo: {$exists: true} })
```
 
### ($or) Devuelve los docs que cumplen alguna de las condiciones
```shell
db.coll.find({$or: [stock: 100], [stock: 200]})
```
 
### ($and) Devuelve los docs que cumplen todas las condiciones
```shell
db.coll.find({$and: [active: true], [stock: 200]})
```

### ($and) Devuelve los docs cuyo campo empice con los caracteres entre /__^/
```shell
db.coll.find({name: /^Té/})
```

### ($and) Devuelve los docs cuyo campo termine con los caracteres entre /___$/
```shell
db.coll.find({name: /boldo$/})
```

### ($and) Devuelve los docs cuyo campo contenga con los caracteres entre /___$/
```shell
db.coll.find({name: /boldo/})
```

















