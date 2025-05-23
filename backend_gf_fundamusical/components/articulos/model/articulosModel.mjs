// IMPORTA LA BASE DE DATOS LOCAL QUE ES UN JSON
// import { connection } from '../services/localdb/localdb.mjs'

// IMPORTA LA BASE DE DATOS MYSQL QUE ES UNA FUNCIÓN
import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection // esto es para poder usar la conexion a la base de datos mysql en el resto de los archivos

connectionDB.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('connected to the database from articulosModel')
})
