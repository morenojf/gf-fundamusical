// Este archivo importa, inicializa y exporta el model de la base de datos mysql
import mysql from 'mysql2/promise'

// CONEXION A LA BASE DE DATOS MYSQL
// Pass home Musica2013*
// Pass off admin
const config = {
  host: 'localhost',
  user: 'root',
  password: 'Musica2013*',
  database: 'fundamusicaldb',
  port: 3306
}

// IMPORTANTE, TODAS LAS PETICIONES A LA BASE DE DATOS DEBEN LLEVAR AWAIT INCLUIDA LA CONEXION PRINCIPAL Y LAS LLAMADAS DE FUNCIONES ASYNCRONAS

export const connection = await mysql.createConnection(config) // esto crea la conexion a la base de datos mysql y ya podemos usarla para diversas cosas como por ejemplo connection.query para hacer consultas a la base de datos.