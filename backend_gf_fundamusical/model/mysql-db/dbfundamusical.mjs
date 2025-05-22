// Este archivo importa, inicializa y exporta el model de la base de datos mysql

import mysql from 'mysql2'

const config = {
  host: 'localhost',
  user: 'root',
  password: 'Musica2013*',
  database: 'fundamusicaldb',
  port: 3306
}

const connection = mysql.createConnection(config) // esto crea la conexion a la base de datos mysql y ya podemos usarla para diversas cosas como por ejemplo connection.query para hacer consultas a la base de datos.

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('connected to the database')
})

export class modelDB {
  static getAll () {
    connection.query('SELECT * FROM articulo', (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err)
        return
      }
      console.log(results) // Aquí sí verás los artículos
      // Puedes retornar results aquí si usas promesas o callbacks
    })
  }
//   static createArticle () {
//     const createdArticle = connection.query('INSERT INTO articulo (articuloName) VALUES (?)', ['mayonesa'])
//     console.log(createdArticle)
//     return createdArticle
//   }
}
// const result = modelDB.getAll()
// console.log(result)
// Idealmente trabajar esto junto con la base de datos local para poder testear
