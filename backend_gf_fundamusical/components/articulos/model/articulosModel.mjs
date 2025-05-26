// IMPORTA LA BASE DE DATOS LOCAL QUE ES UN JSON
// import { connection } from '../../../services/localdb/localdb.mjs'

// IMPORTA LA BASE DE DATOS MYSQL QUE ES UNA FUNCIÓN
import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection // esto es para poder usar la conexion a la base de datos mysql en el resto de los archivos

export class articlesModel {
  static async getAll () {
    const query = 'SELECT * FROM articulo'
    const [rows] = await (await connectionDB).query(query)
    if (rows.length === 0) {
      console.error('No articles found')
      return null
    }
    // console.log('Articles found:', rows)
    return rows
  }

//   static async createArticulo = (articulosACrear) => {
//     for (const articulo of articulosACrear) {
//       const query = 'INSERT INTO articulos (nombre, cantidad) VALUES (?, ?)'
//       const values = [articulo.nombre, articulo.cantidad]
//       connectionDB.query(query, values, (err, result) => {
//         if (err) {
//           console.error('Error inserting article:', err)
//           return null
//         }
//         console.log('Article inserted successfully:', result)
//         return result
//       }
//       )
//     }
//   }
}

articlesModel.getAll()
// esto es para testear la funcion getAll, si no se encuentra nada retorna null y si se encuentra algo retorna el array de articulos

// Eliminar un articulo solo se hará desde el front end eliminando el campo del articulo, una vez creado el articulo no se puede eliminar.
