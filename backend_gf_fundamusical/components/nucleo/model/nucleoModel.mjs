import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

// TESTING FUNCIONALITY
// connectionDB.connect(err => {
//   if (err) {
//     console.error('Error connecting to the database:', err)
//     return
//   }
//   console.log('connected to the database from articulosModel')
// })

export class nucleoModel {
  static getAll () {
    const articulos = connectionDB.query('SELECT * FROM articulos')
    if (!articulos) {
      console.log('No se encontraron articulos')
      return []
    } else {
      return articulos
    }
  }

  static createArticulo = (articulosACrear) => {
    for (const articulo of articulosACrear) {
      const query = 'INSERT INTO articulos (nombre, cantidad) VALUES (?, ?)'
      const values = [articulo.nombre, articulo.cantidad]
      connectionDB.query(query, values, (err, result) => {
        if (err) {
          console.error('Error inserting article:', err)
          return null
        }
        console.log('Article inserted successfully:', result)
        return result
      }
      )
    }
  }
}
