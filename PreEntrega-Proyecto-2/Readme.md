# 1° PReEntrega de Proyecto
Proyecto de desarrollo BackEnd de E-commerce.

## Consigna
Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:

### Productos
Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:

- La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior.

- La ruta GET /:pid deberá traer sólo el producto con el id proporcionado.

- La ruta raíz POST / deberá agregar un nuevo producto con los campos:
    - id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.)
    - title:String,
    - description:String
    - code:String
    - price:Number
    - status:Boolean (true por defecto)
    - stock:Number
    - category:String
    - thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto

> Todos los campos son obligatorios, a excepción de thumbnails

- La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.

- La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

### Carrito
Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:
- La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
    - Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
    - products: Array que contendrá objetos que representen cada producto

- La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

- La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
    - product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que __no__ agregues el producto completo).
    - quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.

# 2° PreEntrega Proyecto
## Profesionalizando la BD
### Objetivos generales
- Contarás con Mongo como sistema de persistencia principal
- Tendrás definidos todos los endpoints para poder trabajar con productos y carrito.

### Objetivos específicos
- Profesionalizar las consultas de productos con filtros, paginación y ordenamiento.
- Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.

### Formato
- Link al repositorio de Github, sin la carpeta de node_modules.

### Sugerencias
- Permitir comentarios en el archivo.
- La lógica del negocio que ya tienes hecha no debería cambiar, sólo su persistencia.
- Los nuevos endpoints deben seguir la misma estructura y lógica que hemos seguido.

## Se debe entregar
## Products
Con base en nuestra implementación actual de productos, modificar el método GET/ para que cumpla con los siguientes puntos:
- Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y query (opcional)
    - limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
    - page permitirá devolver la página que queremos buscar. En caso de no recibir page ésta será de 1.
    - query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general.
    - sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento.

El método GET deberá devolver un objeto con el siguiente formato:
{
    status: success/error,
    payload: Resultado de los productos solicitados,
    totalPages: Total de páginas,
    prevPage: Página anterior,
    nextPage; Página siguiente,
    page: Página actual,
    hasPrevPage: Indicador para saber si la página previa existe,
    hasNextPage: Indicador para saber si la página siguiente existe,
    prevLink: Link directo a la página previa (null si hasPrevPage=false)
    nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}

Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendete o descendente por precio.

## Carts
Agregar al router de carts los siguientes endpoints:
- DELETE api/carts/:cid/products/:pid : Deberá eliminar del carrito el producto seleccionado.
- PUT api/carts/:cid : deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
- PUT api/carts/:cid/products/:pid : deberá poder actualizar SOLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body.
- DELETE api/carts/:cid deberá eliminar todos los productos del carrito.
- Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products.  Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un "populate". De esta manera almacenamos sólo el id, pero al solicitarlo podemos desglozar los productos asociados.

### Objetivo no obligatorio / opcional.
Crear una vista en el router de views '/products' para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas.
- Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
- Contar con botón de "agregar al carrito" directamente, sin necesidad de abrir una página adicional con los detalles del producto.

Además agregar una vista '/carts/:cid' para visualizar un carrito específico, donde se deberá listar solo los productos que pertenezcan a dicho carrito.