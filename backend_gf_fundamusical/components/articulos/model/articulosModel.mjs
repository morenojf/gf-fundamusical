import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'
const connectionDB = connection

export class articulosModel {
  static async createArticle(articleData) {
    const createdArticles = []
    for (let i = 0; i < articleData.length; i++) {
      const element = articleData[i].nombre
      const [result] = await connectionDB.query(
        'INSERT INTO articulo (articuloName) VALUES (?)',
        [element]
      )
      const createdArticleId = result.insertId
      if (!createdArticleId) {
        throw new Error('No se pudo obtener el ID del artículo insertado')
      }
      const [articuloInfo] = await connectionDB.query(
        'SELECT articuloName FROM articulo WHERE articuloId = ?',
        [createdArticleId]
      )
      const articuloName = articuloInfo[0].articuloName
      createdArticles.push({ ID: createdArticleId, nombre: articuloName })
    }

    return createdArticles
  }

  static async insertArticles(solicitudId, createdArticles, articleData) {
    const articulosSolicitud = []
    const idSolicitud = solicitudId
    for (let i = 0; i < createdArticles.length; i++) {
      const articleQuantity = articleData[i].cantidad
      const articleName = createdArticles[i].nombre
      const articuloId = createdArticles[i].ID
      const insertedArticles = await connectionDB.query(
        'INSERT INTO solicitud_Articulo (articuloId, solicitudId, cantidadSolicitada) VALUES (?, ?, ?)',
        [articuloId, idSolicitud, articleQuantity]
      )

      const [solicitudArticuloId] = await connectionDB.query('SELECT solicitudArticuloId from solicitud_Articulo WHERE articuloId = ? AND solicitudId = ?', [articuloId, idSolicitud])
	  const [solicitudId] = await connectionDB.query('SELECT solicitudId from solicitud_Articulo WHERE solicitudArticuloId = ?', [solicitudArticuloId[0].solicitudArticuloId])
      
	  articulosSolicitud.push({
		solicitudId: solicitudId[0].solicitudId,
        solcitudArticuloID: solicitudArticuloId[0].solicitudArticuloId,
		articuloName: articleName,
		articuloQuantity: articleQuantity
        
      })
    }
    return articulosSolicitud
  }
}

// const result = await articulosModel.insertArticles(
//   1,
//   [
//     {
//       articuloName: 'ARTICULO 1',
//       articuloQuantity: 10
//     },
//     {
//       articuloName: 'ARTICULO 2',
//       articuloQuantity: 20
//     },
//     {
//       articuloName: 'ARTICULO 3',
//       articuloQuantity: 30
//     },
//     {
//       articuloName: 'ARTICULO 4',
//       articuloQuantity: 40
//     }
//   ],
//   datosArticulos
// )

// console.log(result)

// for (let i = 0; i < articleData.length; i++) {
//   const element = articleData[i].nombre
//   const [createdArticle] = await connectionDB.query(
//     'INSERT INTO articulo (articuloName) VALUES (?)',
//     [element]
//   )
// //   console.log(createdArticle.insertId)
// //   const createdArticleId = createdArticle.insertId

//   const [articuloInfo] = await connectionDB.query(
//     'SELECT articuloName FROM articulo WHERE articuloId = ?',
//     [createdArticle[0].insertId]
//   )
//   const articuloName = articuloInfo[0].articuloName
//   createdArticles.push({ ID: createdArticle[0].insertId, nombre: articuloName })
// }
