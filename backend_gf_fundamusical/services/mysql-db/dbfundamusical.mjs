// Este archivo importa, inicializa y exporta el model de la base de datos mysql
import mysql from 'mysql2'

// CONEXION A LA BASE DE DATOS MYSQL
const config = {
  host: 'localhost',
  user: 'root',
  password: 'Musica2013*',
  database: 'fundamusicaldb',
  port: 3306
}

export const connection = mysql.createConnection(config) // esto crea la conexion a la base de datos mysql y ya podemos usarla para diversas cosas como por ejemplo connection.query para hacer consultas a la base de datos.

// exporto la conexion a la base de datos para poder usarla en otros archivos

// connectionDB será la funcion que permite hacer queries a la base de datos
