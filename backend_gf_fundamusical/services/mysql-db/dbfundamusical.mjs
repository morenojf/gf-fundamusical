// Este archivo importa, inicializa y exporta el model de la base de datos mysql
import mysql from 'mysql2/promise'

// CONEXION A LA BASE DE DATOS MYSQL
const config = {
  host: 'localhost',
  user: 'root',
  password: 'Musica2013*',
  database: 'fundamusicaldb',
  port: 3306
}

// IMPORTANTE, TODAS LAS PETICIONES A LA BASE DE DATOS DEBEN LLEVAR AWAIT INCLUIDA LA CONEXION PRINCIPAL Y LAS LLAMADAS DE FUNCIONES ASYNCRONAS

export const connection = await mysql.createConnection(config) // esto crea la conexion a la base de datos mysql y ya podemos usarla para diversas cosas como por ejemplo connection.query para hacer consultas a la base de datos.

// exporto la conexion a la base de datos para poder usarla en otros archivos

// connectionDB será la funcion que permite hacer queries a la base de datos

// export async function testQuery () {
//   try {
//     const [rows] = await connection.query('SELECT * FROM nucleo')
//     console.log('Resultado de la consulta:', rows)
//     return rows
//   } catch (err) {
//     console.error('Error al ejecutar la consulta:', err)
//     return null
//   }
// }

// await testQuery() 