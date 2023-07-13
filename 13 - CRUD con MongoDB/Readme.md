# CRUD EN MONGODB

## Repasamos comandos de la clase anterior

### Mostrar Bases de Datos
Solo va a mostar las DB que contengan colecciones
```javascript
show dbs
```

### Usar una base de datos
Si la base de datos existe, ingresa en ella para poder utilizarla. En caso contrario, crea la base de datos y luego ingresa.
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
db createCollection('coll')
```

### Cambiar nombre de colección
```javascript
db.coll.renameCollection('nuevoNombre')
```

### Eliminar colección
```javascript
db.coll.drop()
```

### Mostrar registros dentro de colección  
```javascript
### Mostrar info
db.coll.find()

### Mostrar info identada
db.coll.find().pretty()
```

### Nuevo doc dentro de colección
```javascript
### Agregar un registro
db.coll.insertOne({name: 'prod1', price: 200}) 
### Agregar varios registros
db.coll.insertMany({name: 'prod2', price: 300}, {name: 'otroprod, price: 340})
### Nos devuelven un ObjectId
```

### Crear Arrays e Insertar Varios
```javascript
const array = [{name: 'Juan'}, {name: 'Carlos'}, {name: 'Pedro'}]

db.coll.insertMany(array)
```

### Buscar un campo en particular
Esto nos devuelve los registros que cumpla con el campo buscado.
```javascript
db.coll.find({name: 'prod1'})
```  
Esto nos devuelve el primer registro que cumpla con el campo buscado
```javascript
db.coll.findOne({name: 'prod'})
```

### Trear registros por límite
```javascript
db.coll.find().limit(4)
```

### Mostrar estadísticas
```javascript
db.stats()
```

## Nuevos Comandos

### Buscar filtrando por campo
```javascript
db.coll.find({name: 'nombre'})
```

### Buscar filtrando por varios campos
```javascript
db.coll.find({name: 'prod1', price: 300})
```

### Buscar filtrando por varios campos
```javascript
db.coll.find({name: 'prod1', price: 300})
```

### Contar todos los documentos
```javascript
db.coll.countDocuments()
```

### Contar docs que coinciden con un campo
```javascript
db.coll.countDocuments({price: 300})
```

### ($eq :equal) Buscar docs cuyo campo sea igual a un valor
```javascript
db.coll.find({ price: {$eq: 1500}})
```

### ($ne: not equal) Buscar docs cuyo campo sea diferente a un valor
```javascript
db.coll.find({ price: {$ne: 1500}})
```

### ($gt: greater than) Buscar docs cuyo campo sea mayor a un valor
```javascript
db.coll.find({ price: {$gt: 1500}})
```

### ($gte: greater than equal) Buscar docs cuyo campo sea mayor igual a un valor
```javascript
db.coll.find({ price: {$gte: 1500}})
```

### ($lt: less than) Buscar docs cuyo campo sea menor a un valor
```javascript
db.coll.find({ price: {$lt: 1500}})
```

### ($lte: less than equal) Buscar doc cuyo campo sea menor igual a un valor
```javascript
db.coll.find({ price: {$lte: 1500}})
```

### ($in) Buscar docs donde uno de los campos coincide con alguno de varios valores
```javascript
db.coll.find({ price: {$in: ['bebidas', 'comestibles']}})
```

### ($nin: not in) Buscar docs donde uno de los campos no coincida con alguno de varios valores
```javascript
db.coll.find({ price: {$in: ['bebidas', 'comestibles']}})
```

### ($exist) Devuelve los docs que cuentan con un campo en particular
```javascript
db.coll.find({promo: {$exists: true} })
```
 
### ($or) Devuelve los docs que cumplen alguna de las condiciones
```javascript
db.coll.find({$or: [stock: 100], [stock: 200]})
```
 
### ($and) Devuelve los docs que cumplen todas las condiciones
```javascript
db.coll.find({$and: [active: true], [stock: 200]})
```

### (/__^/) Devuelve los docs cuyo campo empice con los caracteres entre /__^/
```javascript
db.coll.find({name: /^Té/})
```

### (/___$/) Devuelve los docs cuyo campo termine con los caracteres entre /___$/
```javascript
db.coll.find({name: /boldo$/})
```

### (/___/) Devuelve los docs cuyo campo contenga los caracteres entre /___/
```javascript
db.coll.find({name: /boldo/})
```

### (/___/i) Devuelve los docs cuyo campo contenga los caracteres entre /___/i (i: ignorar mayúsculas y minúsculas)
```javascript
db.coll.find({name: /BoLdO/i})
```

### ({}) Devolver solo los campos solicitados en conjunto con el id correspondiente
```javascript
db.coll.find({}, {active: true})
```

### ({}) Devolver todos los campos solicitados excepto uno
```javascript
db.coll.find({}, {active: false})
```

### (.sort) Ordenar los campos buscados
```javascript
db.coll.find().sort({name: 1}) // ASC
db.coll.find().sort({name: -1}) // DESC
```

### (.skip) Devolver docs saletando los primeros n
```javascript
db.coll.find().skip(n)
db.coll.find().skip(10)
```

### (.update.({$set})) Modificar docs
```javascript
db.coll.updateMany({name: 'Manteca'}, {$set: {active:true}})
db.coll.updateOne({name: 'Manteca'}, {$set: {active:true}})
```

### (.update({$unset})) Eliminar un campo de docs
```javascript
db.coll.updateMany({name: 'Manteca'}, {$unset: {active: ''}})
db.coll.updateOne({name: 'Manteca'}, {$unset: {active:''}})
```

### (.update({$rename})) Modificar el campo de docs
```javascript
db.coll.updateMany({name: 'Manteca'}, {$rename: {active: 'activo'}})
db.coll.updateOne({name: 'Manteca'}, {$rename: {active: 'activo'}})
```

### (.update({$inc}))(inc: increase) Incrementar unidades
```javascript
db.coll.updateMany({name: 'Fernet'}, {$inc: {stock: 100}})
db.coll.updateOne({name: 'Fernet'}, {$inc: {stock: 100}})
```

 ### (.update({$mul}))(mul: multiply) Multiplicar unidades
```javascript
db.coll.updateMany({name: 'Fernet'}, {$inc: {stock: 100}})
db.coll.updateOne({name: 'Fernet'}, {$inc: {stock: 100}})
```

 ### (.delete) Eliminar docs
```javascript
db.coll.deleteMany({section: 'Limpieza'})
db.coll.deleteOne({section: 'Limpieza'})
```