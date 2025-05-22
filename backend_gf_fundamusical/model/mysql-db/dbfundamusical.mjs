// Este archivo importa, inicializa y exporta el model de la base de datos mysql

import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fundamusicaldb',
  port: 3306
}

const connection = mysql.createConnection(config) // esto crea la conexion a la base de datos mysql y ya podemos usarla para diversas cosas como por ejemplo connection.query para hacer consultas a la base de datos.

export class modelDB {
  static async getAll () {
    const result = await connection.query('SELECT * FROM movies')
    return result
  }
}

// Idealmente trabajar esto junto con la base de datos local para poder testear
