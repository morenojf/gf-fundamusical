// IMPORTA LA BASE DE DATOS LOCAL QUE ES UN JSON
// import { connection } from '../../../services/localdb/localdb.mjs'

// IMPORTA LA BASE DE DATOS MYSQL QUE ES UNA FUNCIÓN
import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection // esto es para poder usar la conexion a la base de datos mysql en el resto de los archivos

// TESTING FUNCIONALITY
// connectionDB.connect(err => {
//   if (err) {
//     console.error('Error connecting to the database:', err)
//     return
//   }
//   console.log('connected to the database from articulosModel')
// })

export class articlesModel {
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

// Eliminar un articulo solo se hará desde el front end eliminando el campo del articulo, una vez creado el articulo no se puede eliminar.
