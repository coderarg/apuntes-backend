# Autorización y Autenticación

La autorización está relacionada con el permiso que tiene el usuario para realizar cierta actividad, según el rol que tiene asignado.  
En cambio, la autenticación es corroborar cual usuario está ingresando.  

## Métodos de Autenticación
Datos biométricos: Autentica usuarios mediante huellas dactilares.  
JWT (JSON Web Tokens): Este método open source permite la transmisión segura de datos entre las distintas partes. Comúnmente se utiliza para la autorización a partir de un par de claves que contiene una clave privada y una pública.  
OAuth 2.0: Permite que, mediante una api, el usuario se autentique y acceda a los recursos del sistema que necesita.

## bcrypt
Dependencia utilizada para encryptar las contraseñas.  
Tomando el ejemplo de la case pasada vamos a aplicar bcrypt para encryptar la contraseña.

[+info bcrypt](https://www.npmjs.com/package/bcrypt)

## Instalar bcrypt

```shell
npm i bcrypt
```

